import { FC } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RootCompanySelector } from "./RootCompanySelector";

export const Header: FC = () => {
  return (
    <div className="border-b bg-background/95 backdrop-blur-md">
      <Container className="py-2 flex items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="font-medium text-muted-foreground">Rapid Footprints</span>
        </div>
        <RootCompanySelector selectedCompanyId={2} />
        <Select>
          <SelectTrigger className="w-max gap-4">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
        <Avatar className="ml-auto">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Container>
    </div>
  );
};
