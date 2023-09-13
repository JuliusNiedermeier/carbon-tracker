import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { CaretDownIcon, CaretRightIcon, CaretSortIcon, SlashIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { db } from "../../database/client";
import { CorporateGroupView } from "../../database/schema";
import { sql } from "drizzle-orm";
import { CompanySelectorContent } from "./CompanySelectorContent-new";
import { createPathRecursive } from "./utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Building, Network, Workflow } from "lucide-react";
import Link from "next/link";

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
    <div className="flex gap-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="p-4 gap-4">
            <Network size={20} />
            Company structure
            <CaretSortIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0" align="start">
          <CompanySelectorContent selectedCompanyId={currentCompany?.id!} corporateGroupMembers={corporateGroup.members!} />
        </DropdownMenuContent>
      </DropdownMenu>
      {path?.map((member, index, array) => (
        <div key={member.id} className="flex items-center gap-2">
          <Link href={`/${member.slug}`} className="hover:underline font-medium">
            {member.name}
          </Link>
          {index < array.length - 1 && <SlashIcon />}
        </div>
      ))}
    </div>
  );
};
