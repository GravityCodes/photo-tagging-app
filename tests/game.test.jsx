import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "./test-utils";
import Game from "../src/pages/Game";

/*


*/

describe("Game Page Functionality", () => {
  it("give up button opens dialog element", async () => {
    renderWithRouter(<Game />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).not.toHaveAttribute("open");

    const button = screen.getByRole("button", { name: /give up/i });
    await userEvent.click(button);

    expect(dialog).toHaveAttribute("open");
  });

  it("opens options after clicking images", async () => {
    renderWithRouter(<Game />);

    const image = screen.getByAltText(/game/i);
    const options = screen.getByTestId("characterSelect");

    expect(options).not.toBeVisible();

    await userEvent.click(image);

    expect(options).toBeVisible();
  });
});
