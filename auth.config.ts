import type { NextAuthConfig } from "next-auth";
import { UserRole, UserStatus } from "@prisma/client";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.status = token.status as UserStatus;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      
      if (isOnAdmin) {
        if (isLoggedIn) {
          // Block non-active accounts (SUSPENDED / INACTIVE) and candidates (USER role)
          if (auth.user.status !== "ACTIVE" || auth.user.role === "USER") {
            return false;
          }
          
          // Protect pages for PEGAWAI role (can only see dashboard and applications list)
          if (auth.user.role === "PEGAWAI") {
            const isAllowed = nextUrl.pathname === "/admin" || nextUrl.pathname === "/admin/aplikasi" || nextUrl.pathname === "/admin/aplikasi/";
            if (!isAllowed) {
              return Response.redirect(new URL("/admin", nextUrl));
            }
          }
          
          // Protect system management pages (pengguna & role) - only SUPER_ADMIN can access
          const isOnSystemManagement = 
            nextUrl.pathname.startsWith("/admin/pengguna") || 
            nextUrl.pathname.startsWith("/admin/role");
            
          if (isOnSystemManagement && auth.user.role !== "SUPER_ADMIN") {
            return Response.redirect(new URL("/admin", nextUrl));
          }
          
          return true;
        }
        return false; // Redirect to login
      }
      
      const isOnLogin = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");
      if (isOnLogin && isLoggedIn) {
        if (auth.user.role === "USER") {
          return Response.redirect(new URL("/layanan/magang", nextUrl));
        }
        return Response.redirect(new URL("/admin", nextUrl));
      }
      
      return true;
    },
  },
  providers: [], // Empty array, defined in auth.ts
} satisfies NextAuthConfig;
