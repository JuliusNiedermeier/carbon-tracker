// Inspired by https://github.com/useverk/drizzle-pgvector

import { AnyColumn, SQLWrapper, sql } from "drizzle-orm";
import { customType } from "drizzle-orm/pg-core";

const fromSQL = (value: string) => {
  return value
    .substring(1, value.length - 1)
    .split(",")
    .map((v) => parseFloat(v));
};

const toSQL = (value: number[]) => JSON.stringify(value);

export const pgVector = customType<{ data: number[]; driverData: string; config: { dimensions: number } }>({
  // text-embedding-3-small: 1536, text-embedding-3-large: 3072
  dataType: (config) => (config ? `vector(${config.dimensions})` : `vector(1536)`),
  toDriver: toSQL,
  fromDriver: fromSQL,
});

export const l2Distance = (column: SQLWrapper | AnyColumn, value: number[]) => sql`${column} <-> ${toSQL(value)}`;

export const maxInnerProduct = (column: SQLWrapper | AnyColumn, value: number[]) => sql`${column} <#> ${toSQL(value)}`;

export const cosineDistance = (column: SQLWrapper | AnyColumn, value: number[]) => sql`${column} <=> ${toSQL(value)}`;
