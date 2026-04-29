import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import commitsData from "../src/app/commits.json";
import Home from "../src/app/page";

vi.mock("../src/app/ParticlesBackground", () => ({
  default: () => <canvas data-testid="particles-background" />,
}));

describe("Home projects", () => {
  it("does not render the former hero role badge", () => {
    render(<Home />);

    expect(
      screen.queryByText("Software Developer & Full-Stack Engineer"),
    ).toBeNull();
  });

  it("renders the Gerakofolia Villa project with live and repository links", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Gerakofolia Villa" }),
    ).not.toBeNull();
    expect(screen.getByText("Hospitality Website")).not.toBeNull();
    expect(screen.getByText("Cloudflare Pages")).not.toBeNull();

    const card = screen
      .getByRole("heading", { name: "Gerakofolia Villa" })
      .closest("[data-glass='true']");

    expect(card).not.toBeNull();
    expect(
      card?.querySelector("a[href='https://github.com/giannisCKS/gerakofolia']"),
    ).not.toBeNull();
    expect(
      card?.querySelector("a[href='https://gerakofolia-villa.gr/']"),
    ).not.toBeNull();
  });

  it("renders the DocScrape project with repository link and aligned metadata", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "DocScrape" })).not.toBeNull();
    expect(screen.getByText("Document Reasoning")).not.toBeNull();
    expect(screen.getByText("Qdrant")).not.toBeNull();
    expect(screen.getByText("Ollama")).not.toBeNull();

    const card = screen
      .getByRole("heading", { name: "DocScrape" })
      .closest("[data-glass='true']");

    expect(card).not.toBeNull();
    expect(
      card?.querySelector("a[href='https://github.com/giannisCKS/DocScrape']"),
    ).not.toBeNull();
  });

  it("does not render project status or index tags", () => {
    render(<Home />);

    expect(screen.queryByText("Selected work")).toBeNull();
    expect(screen.queryByText("Featured / Local-first")).toBeNull();
    expect(screen.queryByText(/^PRJ-/)).toBeNull();
  });

  it("includes Gerakofolia Villa in the particle project dataset", () => {
    expect(
      commitsData.some((commit) => commit.project === "Gerakofolia Villa"),
    ).toBe(true);
  });

  it("includes ASAC in the particle project dataset", () => {
    expect(commitsData.some((commit) => commit.project === "ASAC")).toBe(true);
  });
});
