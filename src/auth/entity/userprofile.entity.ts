import { timestamp } from "drizzle-orm/pg-core";
import { uuid, varchar, unique, boolean } from "drizzle-orm/pg-core";
import { InferSelectModel, Placeholder, relations, SQL } from "drizzle-orm";
import { BaseTable } from "src/common/BaseTable";
import { AuthSchema } from "./authSchema";
import { UserApp } from "./userApp.entity";

export const UserProfile = AuthSchema.table(
  "userprofile",
  {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    firstname: varchar({ length: 100 }).notNull(),
    middlename: varchar({ length: 100 }),
    lastname: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    bio: varchar({ length: 500 }),
    userprofile_image: varchar({ length: 500 }),
    mobile_number: varchar({ length: 20 }),
    address: varchar({ length: 255 }),
    last_login_date: timestamp("last_login_date"),
    is_email_confirmed: boolean("is_email_confirmed").default(false).notNull(),
    is_deleted: boolean("is_deleted").default(false).notNull(),
    is_active: boolean("is_active").default(true).notNull(),
    is_social_login: boolean("is_social_login").default(false).notNull(),
    sociallogin_provider: varchar({ length: 100 }).default("").notNull(),
    ...BaseTable.CommonFields,
  },
  (fields) => [
    unique("idx_userprofile_email").on(fields.email),
    unique("idx_userprofile_mobile_number").on(fields.mobile_number),
  ],
);

export const userProfileRelations = relations(UserProfile, ({ one }) => ({
  userApp: one(UserApp),
}));

export type UserProfileModel = Omit<
  InferSelectModel<typeof UserProfile>,
  | "id"
  | "expiresAt"
  | "guid"
  | "role"
  | "createdAt"
  | "updated_at"
  | "lastLoginDate"
  | "deleted_as"
> & {
  id?: number;
  createdAt?: string | SQL<unknown> | Placeholder<string, any> | undefined;
  updated_at?: string | null;
  expiresAt?: string | null;
  lastLoginDate?: string;
  guid?: string | undefined;
  delete_as?: null;
  roles?: string[];
};
