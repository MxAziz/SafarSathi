export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly TRAVELER: "TRAVELER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly BLOCKED: "BLOCKED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const Gender: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
    readonly OTHER: "OTHER";
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export declare const TravelType: {
    readonly SOLO: "SOLO";
    readonly FAMILY: "FAMILY";
    readonly FRIENDS: "FRIENDS";
    readonly COUPLE: "COUPLE";
    readonly GROUP: "GROUP";
};
export type TravelType = (typeof TravelType)[keyof typeof TravelType];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const RequestStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];
//# sourceMappingURL=enums.d.ts.map