import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FC } from "react";
import { db } from "../database/client";
import { eq } from "drizzle-orm";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { MapPin } from "lucide-react";
import { Company } from "../database/schema";
import { notFound } from "next/navigation";

interface Props {
  selectedCompanyId: number;
  selectedLocationId: number;
}

export const LocationSelector: FC<Props> = async ({ selectedCompanyId, selectedLocationId }) => {
  const company = await db.query.Company.findFirst({ where: eq(Company.id, selectedCompanyId), with: { locations: true } });

  if (!company) return notFound();

  const currentLocation = company.locations.find((location) => location.id === selectedLocationId);
  const selectableLocations = company.locations.filter((location) => location.id !== selectedLocationId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="gap-4">
          <MapPin size={20} />
          {currentLocation?.name}
          <CaretSortIcon className="ml-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem className="gap-4 bg-muted pr-6">
          <CheckIcon className="text-emerald-500 w-5 h-5" />
          <div className="grid">
            <span className="font-medium">{currentLocation?.name}</span>
            <span className="text-muted-foreground">20 activities this year</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        {selectableLocations?.map((location) => (
          <Link key={location.id} href={`/${company.slug}/${location.slug}`}>
            <DropdownMenuItem className="gap-4">
              <div className="grid">
                <span className="font-medium">{location.name}</span>
                <span className="text-muted-foreground">13 activities this year</span>
              </div>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
