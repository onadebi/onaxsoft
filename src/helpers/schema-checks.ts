import db from "src/configs/dbConfig";

const schemaChecks = async () => {
  try {
    // Check if 'auth' schema exists
    const result = await db.execute(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'auth'
    `);

    // If schema doesn't exist, create it
    if (result.rows.length === 0) {
      await db.execute(`CREATE SCHEMA auth`);
      console.log("Schema 'auth' created successfully.");
    }

    console.log("Database connection is valid.");
  } catch (error) {
    console.error("Database connection/schema check error:", error);
    process.exit(1); // Exit with error code on any database error
  }
};

export default schemaChecks;
