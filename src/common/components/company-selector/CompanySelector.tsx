import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { CaretRightIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { db } from "../../database/client";
import { CorporateGroupView } from "../../database/schema";
import { sql } from "drizzle-orm";
import { CompanySelectorContent } from "./CompanySelectorContent-new";
import { createPathRecursive } from "./utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Building } from "lucide-react";

interface Props {
  selectedCompanyId: number;
}

export const CompanySelector: FC<Props> = async ({ selectedCompanyId }) => {
  const [corporateGroup] = await db
    .select()
    .from(CorporateGroupView)
    .where(sql`EXISTS ( SELECT 1 FROM json_array_elements(${CorporateGroupView.members}) member WHERE member->>'id' = ${selectedCompanyId} )`)
    .limit(1);

  const currentCompany = corporateGroup?.members?.find(({ id }) => id === selectedCompanyId);

  const path = createPathRecursive(corporateGroup.members || [], currentCompany!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-min pl-2 gap-4 w-min whitespace-nowrap">
          <Avatar className="rounded">
            <AvatarImage src="/tesla.png" />
            <AvatarFallback>
              <Building />
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {path.slice(0, -1).map((company, index, array) => (
                <div key={company.id} className="flex items-center">
                  <span className="text-muted-foreground font-normal">{company.name}</span>
                  {index < array.length - 1 && <CaretRightIcon />}
                </div>
              ))}
            </div>
            <span className="font-bold">{path.at(-1)?.name}</span>
          </div>
          <CaretSortIcon className="ml-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0" align="start">
        <CompanySelectorContent corporateGroupMembers={corporateGroup.members || []} selectedCompanyId={currentCompany!.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
