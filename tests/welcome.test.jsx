import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { renderWithRouter } from "./test-utils";
import Welcome from "../src/pages/Welcome";

describe("Welcome page loads", () => {
  it("renders the title", () => {
    renderWithRouter(<Welcome />);

    expect(
      screen.getByRole("heading", { name: /Where Are They\?/i }),
    ).toBeInTheDocument();
  });

  it("renders the start game button", () => {
    renderWithRouter(<Welcome />);

    expect(screen.getByRole("button", { name: /Start/i })).toBeInTheDocument();
  });

  it("renders the leaderboard button", () => {
    renderWithRouter(<Welcome />);

    expect(
      screen.getByRole("button", { name: /leaderboard/i }),
    ).toBeInTheDocument();
  });
});
