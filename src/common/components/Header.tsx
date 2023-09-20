import { FC } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { PresenceIndicator } from "./PresenceIndicator";

export const Header: FC = () => {
  return (
    <div className="border-b bg-background/95 backdrop-blur-md">
      <Container className="py-2 flex items-center justify-between gap-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="font-medium text-muted-foreground">RapidFootprint</span>
          </div>
        </Link>
        <div className="ml-auto">
          <PresenceIndicator />
        </div>
        <UserButton afterSignOutUrl="/" />
      </Container>
    </div>
  );
};
