import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export function renderWithRouter(element, { route = "/" } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>{element}</MemoryRouter>,
  );
}
