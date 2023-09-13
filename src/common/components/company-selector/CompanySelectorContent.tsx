"use client";

import { type CorporateGroupViewMember } from "@/common/database/schema";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { CaretLeftIcon, CaretRightIcon, CheckIcon, HomeIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { createCompany } from "./server-actions/create-company";
import { createPathRecursive } from "./utils";

interface Props {
  corporateGroupMembers: CorporateGroupViewMember[];
  selectedCompanyId: number;
}

export const CompanySelectorContent: FC<Props> = ({ corporateGroupMembers, selectedCompanyId }) => {
  const [displayedParentCompanyId, setDisplayedParentCompanyId] = useState<number | null>(
    corporateGroupMembers.find((company) => company.id === selectedCompanyId)?.parentCompanyId || selectedCompanyId
  );

  const displayedParentCompany = corporateGroupMembers.find((company) => company.id === displayedParentCompanyId);

  const path = displayedParentCompany ? createPathRecursive(corporateGroupMembers, displayedParentCompany) : [];

  const displayedCompanies = corporateGroupMembers.filter((company) => company.parentCompanyId === displayedParentCompanyId);

  const selectedCompany = corporateGroupMembers.find((company) => company.id === selectedCompanyId);

  const selectableCompanies = displayedCompanies.filter((company) => company.id !== selectedCompanyId);

  const goUp = () => {
    if (!displayedParentCompany?.parentCompanyId) return;
    setDisplayedParentCompanyId(displayedParentCompany.parentCompanyId);
  };

  return (
    <div className="min-w-[30rem]">
      <div className="flex gap-6 items-center bg-muted py-4 px-6 pr-6 border-b shadow">
        <CheckIcon className="text-emerald-500 w-5 h-5" />
        <div className="grid">
          <div className="flex items-center">
            {createPathRecursive(corporateGroupMembers, selectedCompany!)
              .slice(0, -1)
              .map((company, index, array) => (
                <div key={company.id} className="flex items-center">
                  <span className="text-sm text-muted-foreground">{company.name}</span>
                  {index < array.length - 1 && <CaretRightIcon />}
                </div>
              ))}
          </div>
          <span className="font-medium">{selectedCompany?.name}</span>
        </div>
        <Button
          variant="outline"
          className="w-8 h-8 grid place-content-center ml-auto"
          onClick={() => {
            setDisplayedParentCompanyId(selectedCompany!.id);
          }}
        >
          <CaretRightIcon />
        </Button>
      </div>

      <div className="flex items-center py-2 px-1 border-b">
        <Button variant="link" className="w-8 h-8 grid place-content-center" onClick={() => setDisplayedParentCompanyId(null)}>
          <HomeIcon />
        </Button>
        {path.map((company, index) => (
          <div key={company.id} className="flex -items-center">
            <Button variant="link" onClick={() => setDisplayedParentCompanyId(company.id)}>
              {company.name}
            </Button>
            {index < path.length - 1 && <CaretRightIcon />}
          </div>
        ))}
      </div>

      <div className="p-2">
        {selectableCompanies?.map((company) => (
          <Link key={company.id} href={`/${company.slug}`}>
            <DropdownMenuItem className="gap-4 justify-between p-3">
              <div className="grid">
                <span className="font-medium">{company.name}</span>
                <span className="text-muted-foreground">13 Employees</span>
              </div>
              <Button
                variant="outline"
                className="w-8 h-8 grid place-content-center"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setDisplayedParentCompanyId(company.id);
                }}
              >
                <CaretRightIcon />
              </Button>
            </DropdownMenuItem>
          </Link>
        ))}

        {!selectableCompanies.length && (
          <div className="py-8 px-8 flex gap-4 items-center border rounded">
            <Button variant="outline" className="p-2" onClick={goUp}>
              <CaretLeftIcon />
            </Button>
            <div>
              <span className="text-sm font-medium text-muted-foreground block">No company to select</span>
              <span className="text-sm text-muted-foreground">You can create a new company or search in other companies.</span>
            </div>
          </div>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button className="gap-4 w-full mt-4">
              <PlusIcon /> Add company
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-2">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">New company</h4>
                <p className="text-sm text-muted-foreground">Enter a descriptive name.</p>
              </div>
              <form action={createCompany}>
                <Input id="width" name="name" placeholder="New company" className="col-span-2 h-8" />
                <input hidden name="parentId" value={displayedParentCompanyId || ""} />
                <Button type="submit" className="mt-2 w-full">
                  Create
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
