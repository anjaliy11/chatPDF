import { defineConfig } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default defineConfig({
dialect: "postgresql",
// driver: "aws-data-api",
schema: "./src/lib/db/schema.ts",
dbCredentials: {
    url: process.env.DATABASE_URL!,
},
// migration: {
//     table: "migrations",
//     schema: "public"
// }
});


    // npx drizzle-kit push