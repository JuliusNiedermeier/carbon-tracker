"use client";

import { Container } from "@/common/components/Container";
import { PageSubtitle, PageTitle } from "@/common/components/PageTitle";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { importActivities } from "@/modules/activity-import/server-actions/import-activities";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";

const ActivityImportPage: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    await importActivities(data);
    setLoading(false);
  };

  return (
    <Container className="mt-12">
      <PageTitle>Import activities</PageTitle>
      <PageSubtitle>Activities from existing projects can be imported here.</PageSubtitle>
      <form action={handleSubmit} className="grid gap-4 my-8">
        <Input name="file" type="file" accept=".xlsx" />
        <Button type="submit">{loading ? <Loader2 className="animate-spin" /> : "Import"}</Button>
      </form>
    </Container>
  );
};

export default ActivityImportPage;
