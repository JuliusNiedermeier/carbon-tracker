import { customType } from "drizzle-orm/pg-core";

// Vector type supported by pg vector
export const vector = customType<{ data: number[]; driverData: string }>({
  dataType: () => "vector",
  toDriver: (vector) => `[${vector.join(",")}]`,
});
