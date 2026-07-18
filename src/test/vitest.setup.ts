import { afterEach, beforeEach, vi } from "vitest";

function createMockCanvasRenderingContext2D(): CanvasRenderingContext2D {
  const context = {
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    clearRect: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    fillStyle: "",
    strokeStyle: "",
    shadowBlur: 0,
    shadowColor: "",
    lineWidth: 0,
  };

  return context as unknown as CanvasRenderingContext2D;
}

beforeEach(() => {
  vi.stubGlobal(
    "requestAnimationFrame",
    ((callback: FrameRequestCallback) => {
      void callback;
      return 1;
    }) as typeof requestAnimationFrame,
  );
  vi.stubGlobal(
    "cancelAnimationFrame",
    ((id: number) => {
      void id;
    }) as typeof cancelAnimationFrame,
  );

  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    (contextId: string) => {
      void contextId;
      return createMockCanvasRenderingContext2D();
    },
  );

  const mockIntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(() => []),
  }));
  vi.stubGlobal(
    "IntersectionObserver",
    mockIntersectionObserver as unknown as typeof IntersectionObserver,
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
