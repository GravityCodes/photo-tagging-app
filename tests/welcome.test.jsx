import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import Welcome from "../src/pages/Welcome";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });
  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("Welcome page loads", () => {
  it("renders the title", () => {
    render(<Welcome />);

    expect(
      screen.getByRole("heading", { name: /Where Are They\?/i }),
    ).toBeInTheDocument();
  });

  it("renders the start game button", () => {
    render(<Welcome />);

    expect(screen.getByRole("button", { name: /Start/i })).toBeInTheDocument();
  });

  it("renders the leaderboard button", () => {
    render(<Welcome />);

    expect(
      screen.getByRole("button", { name: /leaderboard/i }),
    ).toBeInTheDocument();
  });
});
