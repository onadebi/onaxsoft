import { defineConfig } from 'drizzle-kit';
import appsettings from 'src/configs/appsettings';

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/schema/**/*.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: appsettings.DB.dbConString,
  },
  //#region customise where migrations are stored in the database
  migrations: {
    schema: 'drizzle',
    table: 'drizzle_migrations',
  }
  //#endregion
});