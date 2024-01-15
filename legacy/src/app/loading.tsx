import { Container } from "@/common/components/Container";
import { Skeleton } from "@/common/components/ui/skeleton";
import { FC } from "react";

const CompanyLoadingPage: FC = () => {
  return (
    <Container className="mt-4">
      <div className="flex items-center justify-between mt-16">
        <Skeleton className="h-12 w-[25rem]" />
        <Skeleton className="h-10 w-[5rem]" />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-8">
        <Skeleton className="h-[10rem] w-full" />
        <Skeleton className="h-[10rem] w-full" />
      </div>
    </Container>
  );
};

export default CompanyLoadingPage;
