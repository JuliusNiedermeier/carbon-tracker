import { CompanySelector } from "@/common/components/company-selector/CompanySelector-new";
import { Container } from "@/common/components/Container";
import { PageTitle } from "@/common/components/PageTitle";
import { db } from "@/common/database/client";
import { eq } from "drizzle-orm";
import { Company, CompanyLocation } from "@/common/database/schema";
import { FC } from "react";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/common/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
import { Input } from "@/common/components/ui/input";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { BadgeDelta, Card, Grid, ProgressBar } from "@tremor/react";
import { createSlug } from "@/common/database/schema/utils";

const CompanyPage: FC<{ params: { company: string } }> = async ({ params }) => {
  const company = await db.query.Company.findFirst({ where: eq(Company.slug, params.company), with: { locations: true } });

  if (!company) return redirect("/");

  const createLocation = async (data: FormData) => {
    "use server";
    const name = data.get("name") as string;
    if (!name) return;
    await db.insert(CompanyLocation).values({ companyId: company.id, slug: createSlug(name), name });
    revalidatePath("/");
  };

  return (
    <Container className="mt-4 grid gap-16 items-start">
      <CompanySelector selectedCompanyId={company.id} />

      <div className="flex items-center justify-between">
        <PageTitle>Locations</PageTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="gap-4">
              <PlusIcon /> Add location
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-2">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">New location</h4>
                <p className="text-sm text-muted-foreground">Enter a descriptive name.</p>
              </div>
              <form action={createLocation}>
                <Input id="width" name="name" placeholder="New location" className="col-span-2 h-8" />
                <Button type="submit" className="mt-2 w-full">
                  Create
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Grid numItems={4} className="gap-4 mt-4">
        {company.locations.map((location) => (
          <Link key={location.id} href={`/${company.slug}/${location.slug}`}>
            <Card key={location.id} className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="text-medium text-lg">{location.name}</span>
                <BadgeDelta deltaType="increase">20</BadgeDelta>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Share of total emissions</span>
                  <span className="font-medium">{Math.round(Math.random() * 100)}%</span>
                </div>
                <ProgressBar value={Math.round(Math.random() * 100)} className="mt-2" />
              </div>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyPage;
