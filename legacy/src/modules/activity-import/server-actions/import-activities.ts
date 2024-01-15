"use server";

import { importActivities as _importActivities } from "..";

export const importActivities = async (data: FormData) => {
  const file = data.get("file") as File;
  if (!file) return;
  return _importActivities(file);
};
