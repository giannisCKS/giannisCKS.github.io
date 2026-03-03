import { afterEach, beforeEach, vi } from "vitest";

function createMockCanvasRenderingContext2D(): CanvasRenderingContext2D {
  const context = {
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    clearRect: vi.fn(),
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
    ((_callback: FrameRequestCallback) => 1) as typeof requestAnimationFrame,
  );
  vi.stubGlobal(
    "cancelAnimationFrame",
    ((_id: number) => {}) as typeof cancelAnimationFrame,
  );

  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    (_contextId: string) => createMockCanvasRenderingContext2D(),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

