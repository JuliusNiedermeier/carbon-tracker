import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "@/app/_services/postgres";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

// Patch migration files

// This section addresses a compatibility issue between Drizzle ORM and the pgvector extension for PostgreSQL.
// Issue: Drizzle ORM does not have native support for the pgvector extension, which introduces the non-native 'vector(number)' type.
// Problem: When using this custom type from pgvector, Drizzle ORM's migration generator creates SQL files with invalid syntax.
// Solution: This script patches the migration files by correcting the syntax errors.
// Note: Direct schema pushing using 'drizzle-kit push' is not feasible due to this limitation, necessitating this manual patching approach.
// The following code automatically identifies and corrects the syntax in generated migration files, ensuring they are valid for database execution.

const drizzleDir = readdirSync("drizzle", { withFileTypes: true });
const migrationFilePaths = drizzleDir.filter((dirent) => dirent.isFile() && dirent.name.endsWith(".sql"));

migrationFilePaths.forEach((dirent) => {
  const filePath = join(dirent.path, dirent.name);
  const fileContents = readFileSync(filePath, "utf-8");
  const patchedFileContents = fileContents.replace(/"vector\((\d+)\)"/gm, "vector($1)");
  writeFileSync(filePath, patchedFileContents);
});

console.log("⚡ Migration files patched");

// Apply migrations

migrate(db, { migrationsFolder: "./drizzle" }).then(() => console.log("🚀 Migrations applied successfully"));
