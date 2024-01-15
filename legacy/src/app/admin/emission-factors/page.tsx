"use client";

import { Container } from "@/common/components/Container";
import { PageSubtitle, PageTitle } from "@/common/components/PageTitle";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { importEmissionFactors } from "@/modules/ef-import/server-actions/import-emission-factors";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";

const EmissionFactorsPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Awaited<ReturnType<typeof importEmissionFactors>> | null>(null);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    const stats = await importEmissionFactors(data);
    setStats(stats);
    setLoading(false);
  };

  return (
    <Container className="mt-12">
      <PageTitle>Import emission factors from CSV</PageTitle>
      <PageSubtitle>Existing emission factor data should be removed before starting the import.</PageSubtitle>
      <form action={handleSubmit} className="grid gap-4 my-8">
        <Input name="csv" type="file" />
        <Button type="submit">{loading ? <Loader2 className="animate-spin" /> : "Import"}</Button>
      </form>
      <pre className="w-full overflow-x-auto">{JSON.stringify(stats, null, 2)}</pre>
    </Container>
  );
};

export default EmissionFactorsPage;
