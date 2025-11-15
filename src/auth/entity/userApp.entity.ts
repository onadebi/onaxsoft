import { uuid, boolean, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { AuthSchema } from "./authSchema";
import { SocialLoginPlatform } from "../dot/SocialLogin";
import { UserProfile } from "./userprofile.entity";
import { BaseTable } from "src/common/BaseTable";
import { InferSelectModel } from "drizzle-orm";

export const UserApp = AuthSchema.table(
  "userapp",
  {
    user_id: uuid("user_id")
      .references(() => UserProfile.id)
      .notNull(),
    social_platform: varchar("social_platform", { length: 150 })
      .notNull()
      .default(SocialLoginPlatform.OnaxApp),
    oauth_identity: varchar("oauth_identity", { length: 150 }),
    app_id: varchar("app_id", { length: 150 }).notNull(),
    isActive: boolean("IsActive").default(true).notNull(),
    isDeleted: boolean("IsDeleted").default(false).notNull(),
    deleted_as: varchar("deleted_as", { length: 250 }),
    ...BaseTable.CommonFields,
  },
  (fields) => [
    uniqueIndex("ix_userapp_user_id_app_id").on(fields.user_id, fields.app_id),
  ],
);

export type UserAppModel = Omit<
  InferSelectModel<typeof UserApp>,
  "isActive" | "isDeleted" | "created_at" | "updated_at" | "deleted_as"
> & {
  isActive?: boolean;
  isDeleted?: boolean;
  created_at?: string;
  updated_at?: string;
};
