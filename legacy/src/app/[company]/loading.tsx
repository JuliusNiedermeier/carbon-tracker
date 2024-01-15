import { Container } from "@/common/components/Container";
import { Skeleton } from "@/common/components/ui/skeleton";
import { FC } from "react";

const CompanyLoadingPage: FC = () => {
  return (
    <Container className="mt-4">
      <Skeleton className="h-8 w-[30rem]" />
      <div className="flex items-center justify-between mt-16">
        <Skeleton className="h-12 w-[25rem]" />
        <Skeleton className="h-10 w-[5rem]" />
      </div>
      <Skeleton className="h-[7rem] w-[10rem] mt-8" />
    </Container>
  );
};

export default CompanyLoadingPage;
