import { describe, it, expect } from "vitest";
import {screen, render} from '@testing-library/react';
import App from "../src/App";

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
    render(<App />);

    expect(screen.getByRole("heading", { name: /Where Are They\?/i })).toBeInTheDocument();
  });

  it("renders the start game button", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: /Start/i})).toBeInTheDocument();
  });

  it("renders the leaderboard button", () => {
    render(<App />);

    expect(screen.getByRole("button", {name: /leaderboard/i})).toBeInTheDocument();
  })
});