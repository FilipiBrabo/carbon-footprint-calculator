import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { FootprintCalculatorStoreProvider } from "@/providers/footprint-calculator-store-provider";
import { TRPCReactProvider } from "@/trpc/client";
import Page from "./page";

// TODO: use msw instead of vi.mock
vi.mock("@/trpc/client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/trpc/client")>();

  return {
    ...actual,
    useTRPC: () => ({
      footprintCalculator: {
        calculate: {
          mutationOptions: ({ onSuccess }: { onSuccess?: () => void }) => ({
            mutationFn: async () => {
              onSuccess?.();
            },
          }),
        },
      },
    }),
  };
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <FootprintCalculatorStoreProvider>
        {children}
      </FootprintCalculatorStoreProvider>
    </TRPCReactProvider>
  );
}

test("Submit button disabled/enabled states", async () => {
  render(<Page />, { wrapper: Wrapper });

  const button = screen.getByRole("button", { name: /Calculate Footprint/ });
  expect((button as HTMLButtonElement).disabled).toBe(true);

  await userEvent.type(screen.getByLabelText(/Electricity/), "100");

  // Button is enabled after 200ms, since we debounce the store update
  await waitFor(
    () => {
      const btn = screen.getByRole("button", { name: /Calculate Footprint/ });
      expect((btn as HTMLButtonElement).disabled).toBe(false);
    },
    { timeout: 300 },
  );
});

test("Shows result dialog after submitting", async () => {
  render(<Page />, { wrapper: Wrapper });

  await userEvent.type(screen.getByLabelText(/Electricity/), "100");

  await waitFor(
    () => {
      const btn = screen.getByRole("button", { name: /Calculate Footprint/ });
      expect((btn as HTMLButtonElement).disabled).toBe(false);
    },
    { timeout: 300 },
  );

  await userEvent.click(
    screen.getByRole("button", { name: /Calculate Footprint/ }),
  );
  const dialog = await screen.findByRole("dialog", { name: /Results/ });
  expect(dialog).toBeTruthy();
  expect(screen.getByText(/Overall Emissions by Category/)).toBeTruthy();
});

test("Form values persist when switching tabs", async () => {
  render(<Page />, { wrapper: Wrapper });

  const electricity = screen.getByLabelText(/Electricity/) as HTMLInputElement;
  await userEvent.clear(electricity);
  await userEvent.type(electricity, "42");
  expect(electricity.value).toBe("42");

  // Switch tabs and back
  await userEvent.click(screen.getByRole("tab", { name: /Transportation/ }));
  await userEvent.click(screen.getByRole("tab", { name: /Home Energy/ }));

  expect((screen.getByLabelText(/Electricity/) as HTMLInputElement).value).toBe(
    "42",
  );
});
