import { db } from "@/common/database/client";
import { Activity } from "@/common/database/schema";

// Activity import algo can be implemented here.
// db is the drizzle client and should be used to insert records
// This function will be called by the importActivities server action at ./server-actions/import-activities.ts
// The server action is just used as an adapter that takes the request and transforms it into the format the function inside this file expects.

export const importActivities = async (file: File) => {
  // TODO: implement activity import algo previously used inside rpc function
  console.log("Importing activities from file", file.name);
  // db.insert(Activity).values([]);
};
