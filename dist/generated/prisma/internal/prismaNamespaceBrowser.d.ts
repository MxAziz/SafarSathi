import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Admin: "Admin";
    readonly Traveler: "Traveler";
    readonly TravelPlan: "TravelPlan";
    readonly Review: "Review";
    readonly TripRequest: "TripRequest";
    readonly Payment: "Payment";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly needPasswordChange: "needPasswordChange";
    readonly gender: "gender";
    readonly status: "status";
    readonly isDeleted: "isDeleted";
    readonly isVerified: "isVerified";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AdminScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly contactNumber: "contactNumber";
    readonly address: "address";
    readonly profileImage: "profileImage";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum];
export declare const TravelerScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly contactNumber: "contactNumber";
    readonly address: "address";
    readonly profileImage: "profileImage";
    readonly bio: "bio";
    readonly travelInterests: "travelInterests";
    readonly visitedCountries: "visitedCountries";
    readonly currentLocation: "currentLocation";
    readonly averageRating: "averageRating";
    readonly isVerifiedTraveler: "isVerifiedTraveler";
    readonly subscriptionEndDate: "subscriptionEndDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TravelerScalarFieldEnum = (typeof TravelerScalarFieldEnum)[keyof typeof TravelerScalarFieldEnum];
export declare const TravelPlanScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly destination: "destination";
    readonly imageUrl: "imageUrl";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly budgetRange: "budgetRange";
    readonly travelType: "travelType";
    readonly visibility: "visibility";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly travelerId: "travelerId";
};
export type TravelPlanScalarFieldEnum = (typeof TravelPlanScalarFieldEnum)[keyof typeof TravelPlanScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly travelerId: "travelerId";
    readonly travelPlanId: "travelPlanId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const TripRequestScalarFieldEnum: {
    readonly id: "id";
    readonly travelPlanId: "travelPlanId";
    readonly travelerId: "travelerId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TripRequestScalarFieldEnum = (typeof TripRequestScalarFieldEnum)[keyof typeof TripRequestScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly amount: "amount";
    readonly status: "status";
    readonly subscription: "subscription";
    readonly transactionId: "transactionId";
    readonly paymentGatewayData: "paymentGatewayData";
    readonly travelerId: "travelerId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
    readonly AnyNull: "AnyNull";
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map