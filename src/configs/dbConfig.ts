import { drizzle } from 'drizzle-orm/node-postgres';
import appsettings from './appsettings';

const db = drizzle(appsettings.DB.dbConString, {
  logger: {
    logQuery: (query) => {
      // Display generated SQL query in console in dev mode
      if (appsettings.env.includes('dev')) {
        console.log(query);
      }
    },
  },
});

export default db;
