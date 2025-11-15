import schemaChecks from "./schema-checks";

async function AuthSchemaCheck() {
  await schemaChecks();
}

export const StartUpHealthChecks = {
  AuthSchemaCheck,
};
