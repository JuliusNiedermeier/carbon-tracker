import { Container } from "@/common/components/Container";
import { PageSubtitle, PageTitle } from "@/common/components/PageTitle";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
import { db } from "@/common/database/client";
import { Company, CorporateGroupView } from "@/common/database/schema";
import { createSlug } from "@/common/database/schema/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { FC } from "react";

const DashboardPage: FC = async () => {
  const corporateGroups = await db.select().from(CorporateGroupView);
  const corporateGroupRootMembers = corporateGroups.map((group) => group.members?.find((member) => member.id === group.rootCompanyId));

  const createRootCompany = async (data: FormData) => {
    "use server";
    const name = data.get("name") as string;
    if (!name) return;
    await db.insert(Company).values({ slug: createSlug(name), name });
    revalidatePath("/");
  };

  return (
    <Container className="mt-12">
      <div className="flex items-center justify-between">
        <PageTitle>Footprints</PageTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="gap-4">
              <PlusIcon /> New footprint
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-2">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">New footprint</h4>
                <p className="text-sm text-muted-foreground">What company is this footprint for?</p>
              </div>
              <form action={createRootCompany}>
                <Input id="width" name="name" placeholder="Company name" className="col-span-2 h-8" />
                <Button type="submit" className="mt-2 w-full">
                  Create
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-5 mt-8 gap-4">
        {corporateGroups.map((group) => (
          <Link href={`/${group.members?.find((member) => member.id === group.rootCompanyId)?.slug}`}>
            <div className="rounded border">
              <div className="bg-muted h-36 grid place-content-center text-lg font-medium">
                {group.members?.find((member) => member.id === group.rootCompanyId)?.name}
              </div>
              <div className="p-4 grid gap-4">
                <span className="font-medium">{group.members?.find((member) => member.id === group.rootCompanyId)?.name}</span>
                <PageSubtitle>
                  Includes {group.members?.length} {group.members?.length === 1 ? "company" : "companies"}
                </PageSubtitle>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default DashboardPage;
