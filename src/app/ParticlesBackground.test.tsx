import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ParticlesBackground from "./ParticlesBackground";

describe("ParticlesBackground", () => {
  it("renders a canvas element", () => {
    const { container, unmount } = render(<ParticlesBackground />);

    expect(container.querySelector("canvas")).not.toBeNull();

    unmount();
  });
});

