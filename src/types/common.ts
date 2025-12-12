import type { UserRole } from "../../generated/prisma/enums.js";

export type IJwtPayload = {
  email: string;
  role: UserRole;
  id: string;
};
