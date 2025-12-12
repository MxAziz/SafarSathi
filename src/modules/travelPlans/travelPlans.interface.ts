import type { TravelType } from "../../../generated/prisma/enums.js";

export interface ITravelPlan {
  id?: string;
  title: string;
  description?: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budgetRange: string;
  travelType: TravelType;
}