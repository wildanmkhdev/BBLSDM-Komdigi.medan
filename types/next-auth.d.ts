import { DefaultSession } from "next-auth";
import { UserRole, UserStatus } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role?: UserRole;
    status?: UserStatus;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      status: UserStatus;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    status?: UserStatus;
  }
}
