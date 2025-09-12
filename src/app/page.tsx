import { Suspense } from "react";
import { ClientGreeting } from "@/components/client-greeting";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default async function Home() {
  prefetch(
    trpc.hello.queryOptions({
      text: "world",
    }),
  );

  return (
    <HydrateClient>
      {/* TODO: add error boundary */}
      <Suspense fallback={<div>Loading...</div>}>
        <ClientGreeting />
      </Suspense>
    </HydrateClient>
  );
}
