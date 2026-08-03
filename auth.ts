import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        
        // Query database via Prisma Singletonss
        const user = await prisma.user.findUnique({ 
          where: { email } 
        });
        
        if (!user) return null;

        // Check lock status
        if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
          throw new Error("ACCOUNT_LOCKED");
        }

        const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

        if (passwordsMatch) {
          // Reset failed attempts count
          if (user.failedLoginCount > 0) {
            await prisma.user.update({
              where: { id: user.id },
              data: { failedLoginCount: 0, lockedUntil: null },
            });
          }
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
          };
        }

        // Increment failed attempts and trigger lockout if limit reached
        const newFailCount = user.failedLoginCount + 1;
        const shouldLock = newFailCount >= 5;
        
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginCount: newFailCount,
            lockedUntil: shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : null,
          },
        });

        return null;
      },
    }),
  ],
});
