import { CompanySelector } from "@/common/components/company-selector/CompanySelector-new";
import { Container } from "@/common/components/Container";
import { FC } from "react";
import { Button } from "@/common/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { LocationSelector } from "@/common/components/LocationSelector";
import { KPIs } from "@/common/components/FakeData";
import { ActivityTable } from "@/modules/activities/components/table/ActivityTable";
import { db } from "@/common/database/client";
import { eq } from "drizzle-orm";
import { Company, CompanyLocation } from "@/common/database/schema";
import { notFound } from "next/navigation";

const CompanyPage: FC<{
  params: { company: string; location: string };
}> = async ({ params }) => {
  const company = await db.query.Company.findFirst({
    where: eq(Company.slug, params.company),
    with: { locations: { where: eq(CompanyLocation.slug, params.location), limit: 1 } },
  });

  if (!company || !company.locations[0]) return notFound();

  return (
    <>
      <Container className="mt-4 grid gap-16">
        <div className="flex items-center gap-4">
          <CompanySelector selectedCompanyId={company.id} />
          <CaretRightIcon className="self-center" />
          <LocationSelector selectedCompanyId={company.id} selectedLocationId={company.locations[0].id} />
        </div>

        <div className="opacity-25">
          <KPIs />
        </div>

        <ActivityTable locationId={company.locations[0].id} />
      </Container>
    </>
  );
};

export default CompanyPage;
