import { importEmissionFactorsFromCSV } from "@/modules/ef-import";

export const POST = async (req: Request) => {
  const csv = await req.text();
  const stats = await importEmissionFactorsFromCSV(csv);
  return new Response(JSON.stringify(stats));
};
