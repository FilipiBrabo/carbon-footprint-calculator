import { useRouter } from "next-router-mock";
import { afterEach, beforeAll, beforeEach, vi } from "vitest";

beforeAll(() => {
  vi.mock("next/navigation", () => ({
    useRouter,
    useSearchParams: () => new URLSearchParams("tab=home-energy"),
  }));
});

// ResizeObserver mock for Radix UI/Recharts
//github.com/maslianok/react-resize-detector/issues/145
beforeEach(() => {
  (globalThis as any).ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});
