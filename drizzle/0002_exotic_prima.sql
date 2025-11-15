CREATE TABLE "auth"."userapp" (
	"user_id" uuid NOT NULL,
	"social_platform" varchar(150) DEFAULT 'onaxapp' NOT NULL,
	"oauth_identity" varchar(150),
	"app_id" varchar(150) NOT NULL,
	"IsActive" boolean DEFAULT true NOT NULL,
	"IsDeleted" boolean DEFAULT false NOT NULL,
	"deleted_as" varchar(250),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE "auth"."userprofile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstname" varchar(100) NOT NULL,
	"middlename" varchar(100),
	"lastname" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"bio" varchar(500),
	"userprofile_image" varchar(500),
	"mobile_number" varchar(20),
	"address" varchar(255),
	"last_login_date" timestamp,
	"is_email_confirmed" boolean DEFAULT false NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_social_login" boolean DEFAULT false NOT NULL,
	"sociallogin_provider" varchar(100) DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT null,
	CONSTRAINT "userprofile_id_unique" UNIQUE("id"),
	CONSTRAINT "userprofile_email_unique" UNIQUE("email"),
	CONSTRAINT "idx_userprofile_email" UNIQUE("email"),
	CONSTRAINT "idx_userprofile_mobile_number" UNIQUE("mobile_number")
);
--> statement-breakpoint
ALTER TABLE "auth"."userapp" ADD CONSTRAINT "userapp_user_id_userprofile_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."userprofile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "ix_userapp_user_id_app_id" ON "auth"."userapp" USING btree ("user_id","app_id");