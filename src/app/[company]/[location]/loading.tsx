import { Container } from "@/common/components/Container";
import { Skeleton } from "@/common/components/ui/skeleton";
import { FC } from "react";

const LocationLoadingPage: FC = () => {
  return (
    <Container className="mt-4">
      <Skeleton className="h-8 w-[40rem]" />
      <Skeleton className="h-12 w-[25rem] mt-16" />
      <Skeleton className="h-[25vh] w-full mt-8" />
    </Container>
  );
};

export default LocationLoadingPage;
