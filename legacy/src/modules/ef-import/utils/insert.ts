import { PgTable } from "drizzle-orm/pg-core";
import { db } from "@/common/database/client";

/**Utility to log information about a data chunk being inserted. */
const logChunk = (op: { start: number; size: number; length: number; table: string }) => {
  const chunkName = `${op.start / op.size} (${op.start}-${op.start + op.size - 1})`;
  console.log(`Inserting chunk ${chunkName} containing ${op.length} records into table ${op.table}`);
  return chunkName;
};

const defaultInsertOptions = { chunkSize: 1000, tableName: "unknown table" };

/**Utility to insert data records into a Supabase table in chunks. */
export const insert = async <T extends PgTable>(table: T, records: T["$inferInsert"][], options?: Partial<typeof defaultInsertOptions>) => {
  const opts = { ...defaultInsertOptions, ...options };

  let chunkStart = 0;
  const dataArray: T["$inferSelect"][] = [];
  console.log("Inserting", records.length, "records into", "unknown table");

  while (chunkStart < records.length) {
    const chunk = records.slice(chunkStart, chunkStart + opts.chunkSize);
    const chunkName = logChunk({ start: chunkStart, size: opts.chunkSize, length: chunk.length, table: "unknown" });

    try {
      const data = await db.insert(table).values(chunk).returning();

      chunkStart += opts.chunkSize;
      dataArray.push(...(data as any)); // TODO: Check if this is safe
    } catch (err) {
      console.error(`Error in chunk ${chunkName}`);
      throw err;
    }
  }

  return dataArray;
};
