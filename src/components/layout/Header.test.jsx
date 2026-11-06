import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

// Sample component test: proves React Testing Library is set up.
test("shows the main navigation", () => {
  render(<Header />);
  const nav = screen.getByRole("navigation", { name: "Main" });
  expect(nav).toHaveTextContent("Posts");
  expect(nav).toHaveTextContent("Bookmarks");
});
