// import { UserRole } from "@prisma/client";

export type IJwtPayload = {
  email: string;
  role: UserRole;
  id: string;
};

enum UserRole{
  ADMIN,
  TRAVELER
}