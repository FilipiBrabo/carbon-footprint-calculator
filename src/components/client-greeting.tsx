"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { Button } from "./ui/button";

export function ClientGreeting() {
  const trpc = useTRPC();
  const greeting = useSuspenseQuery(trpc.hello.queryOptions({ text: "world" }));

  const [count, setCount] = useState(0);

  return (
    <div>
      {greeting.data.greeting}

      <div>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <p>Count: {count}</p>
      </div>
    </div>
  );
}
