import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

test("shows the main navigation", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  const nav = screen.getByRole("navigation", { name: "Main" });
  expect(nav).toHaveTextContent("Posts");
  expect(nav).toHaveTextContent("Bookmarks");
});

test("marks Posts active on a post detail route", () => {
  render(
    <MemoryRouter initialEntries={["/posts/42"]}>
      <Header />
    </MemoryRouter>,
  );

  expect(screen.getByRole("link", { name: "Posts" })).toHaveAttribute("aria-current", "page");
});
