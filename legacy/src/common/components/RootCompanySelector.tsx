import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { FC } from "react";
import { db } from "../database/client";
import { Company, CorporateGroupView } from "../database/schema";
import { sql, isNull } from "drizzle-orm";

interface Props {
  selectedCompanyId: number;
}

export const RootCompanySelector: FC<Props> = async ({ selectedCompanyId }) => {
  const rootCompanies = await db.select().from(Company).where(isNull(Company.parentCompanyId));

  const [corporateGroup] = await db
    .select()
    .from(CorporateGroupView)
    .where(sql`EXISTS ( SELECT 1 FROM json_array_elements(${CorporateGroupView.members}) member WHERE (member->>'id')::int = ${selectedCompanyId} )`)
    .limit(1);

  const currentRootCompany = rootCompanies.find((company) => company.id === corporateGroup.rootCompanyId);

  const selectableCompanies = rootCompanies.filter((company) => company.id !== currentRootCompany?.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between gap-4">
          {currentRootCompany?.name} <CaretSortIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-4 bg-muted pr-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="grid">
            <span className="font-medium">{currentRootCompany?.name}</span>
            <span className="text-muted-foreground">20 Employees</span>
          </div>
          <CheckIcon className="text-emerald-500 w-5 h-5" />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        {selectableCompanies?.map((company) => (
          <Link key={company.id} href={`/${company.id}`}>
            <DropdownMenuItem className="gap-4">
              <div className="grid">
                <span className="font-medium">{company.name}</span>
                <span className="text-muted-foreground">13 Employees</span>
              </div>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
