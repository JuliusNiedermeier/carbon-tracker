"use client";

import { type CorporateGroupViewMember } from "@/common/database/schema";
import { ComponentProps, FC, PropsWithChildren, forwardRef, useState } from "react";
import { Button } from "../ui/button";
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { createCompany } from "./server-actions/create-company";
import { cn } from "@/common/utils";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { deleteCompanies } from "./server-actions/delete-companies";

interface Props {
  corporateGroupMembers: CorporateGroupViewMember[];
  selectedCompanyId: number;
}

interface SortedCorporateGroupMember extends CorporateGroupViewMember {
  parentIds: number[];
}

const sortCorporateGroupMembers = (
  members: CorporateGroupViewMember[],
  parentCompanyId: number | null = null,
  parentIds: number[] = []
): SortedCorporateGroupMember[] => {
  const children = members.filter((member) => member.parentCompanyId === parentCompanyId);
  return children
    .map((child) => {
      const childParentIds = parentCompanyId !== null ? [...parentIds, parentCompanyId] : parentIds;
      return [{ ...child, parentIds: childParentIds }, ...sortCorporateGroupMembers(members, child.id, childParentIds)];
    })
    .flat();
};

export const CompanySelectorContent: FC<Props> = ({ corporateGroupMembers, selectedCompanyId }) => {
  const [manuallyCheckedCompanyIds, setManuallyCheckedCompanyIds] = useState<number[]>([]);

  const { push } = useRouter();

  const sortedCorporateGroupMembes = sortCorporateGroupMembers(corporateGroupMembers);
  const selectedCompany = corporateGroupMembers.find((company) => company.id === selectedCompanyId);

  const getDerivedCheckedCompanyIds = (checkedIds: number[]) => [
    ...checkedIds,
    ...sortedCorporateGroupMembes.filter((member) => checkedIds.some((id) => member.parentIds.includes(id))).map((member) => member.id),
  ];

  const derivedCheckedCompanyIds = getDerivedCheckedCompanyIds(manuallyCheckedCompanyIds);

  const allowDeletion = !!derivedCheckedCompanyIds.length && !derivedCheckedCompanyIds.includes(selectedCompanyId);

  const isCheckable = (companyId: number) => {
    if (getDerivedCheckedCompanyIds([companyId]).includes(selectedCompanyId)) return false;
    if (manuallyCheckedCompanyIds.includes(companyId)) return true;
    if (!derivedCheckedCompanyIds.includes(companyId)) return true;
    return false;
  };

  const handleManualCompanyCheckedChange = (checked: boolean, companyId: number) => {
    if (checked) setManuallyCheckedCompanyIds([...manuallyCheckedCompanyIds, companyId]);
    else setManuallyCheckedCompanyIds(manuallyCheckedCompanyIds.filter((id) => id !== companyId));
  };

  const handleDeleteCompanies = async () => {
    if (derivedCheckedCompanyIds.includes(selectedCompanyId)) return;
    await deleteCompanies(derivedCheckedCompanyIds);
    setManuallyCheckedCompanyIds([]);
  };

  return (
    <div>
      {allowDeletion && (
        <>
          <div className="p-2">
            <Button variant="destructive" className="w-full" onClick={handleDeleteCompanies}>
              Delete {derivedCheckedCompanyIds.length} {derivedCheckedCompanyIds.length > 1 ? "companies" : "company"}
            </Button>
          </div>
          <DropdownMenuSeparator />
        </>
      )}
      {sortedCorporateGroupMembes.map((member) => (
        <Row
          key={member.id}
          depth={member.parentIds.length}
          selected={member.id === selectedCompany?.id}
          checkable={isCheckable(member.id)}
          onCheckedChange={(checked) => handleManualCompanyCheckedChange(checked, member.id)}
          checked={derivedCheckedCompanyIds.includes(member.id)}
        >
          <div className="py-3 flex-1 flex items-center gap-12 cursor-pointer" onClick={() => push(`/${member.slug}`)}>
            <div className="flex-1">
              <span className="font-medium block text-sm">{member.name}</span>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="w-6 h-6" onClick={(e) => e.stopPropagation()}>
                  <PlusIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid gap-2">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">New company</h4>
                    <p className="text-sm text-muted-foreground">Enter a descriptive name.</p>
                  </div>
                  <form action={createCompany}>
                    <Input id="width" name="name" placeholder="New company" className="col-span-2 h-8" />
                    <input hidden name="parentCompanyId" value={member.id || ""} />
                    <Button type="submit" className="mt-2 w-full">
                      Create
                    </Button>
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </Row>
      ))}
      {/* <CompanyItem {...nestedCorporateGroup} selectedCompanyId={selectedCompany?.id} depth={0} /> */}
    </div>
  );
};

interface Company {
  id: number;
  name: string;
  slug: string;
  subsidiaries: Company[];
  selectedCompanyId?: number;
  depth: number;
}

const Spacer: FC<{ isLeaf?: boolean }> = ({ isLeaf }) => (
  <div className="border-l w-6 grid justify-start items-center">{isLeaf && <hr className="w-3"></hr>}</div>
);

interface RowProps {
  selected: boolean;
  depth: number;
  checkable?: boolean;
  checked?: boolean;
  onSelect?: () => any;
  onCheckedChange: (checked: boolean) => any;
}

const Row: FC<PropsWithChildren<RowProps>> = ({ children, selected, depth, checkable, checked, onSelect, onCheckedChange }) => {
  return (
    <div className={cn("flex px-4 items-stretch hover:bg-muted", { "bg-muted": checked })} onClick={onSelect}>
      <div className="grid place-content-center w-4">{checkable && <Checkbox checked={checked} onCheckedChange={onCheckedChange} />}</div>
      <div className="grid place-content-center w-4 mx-4">{selected && <CheckIcon />}</div>
      {Array.from(new Array(depth)).map((_, index) => (
        <Spacer key={depth} isLeaf={index === depth - 1} />
      ))}
      {children}
    </div>
  );
};
