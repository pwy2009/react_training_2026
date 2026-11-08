import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./pages/PostsPage", () => ({ PostsPage: () => "Posts page" }));
jest.mock("./pages/PostDetailPage", () => ({ PostDetailPage: () => "Post detail page" }));
jest.mock("./pages/AuthorPage", () => ({ AuthorPage: () => "Author page" }));
jest.mock("./pages/BookmarksPage", () => ({ BookmarksPage: () => "Bookmarks page" }));
jest.mock("./pages/NotFoundPage", () => ({ NotFoundPage: () => "Not found page" }));

beforeEach(() => {
  window.history.replaceState({}, "", "/");
});

test("redirects the root path to the posts page", async () => {
  render(<App />);

  expect(await screen.findByText("Posts page")).toBeInTheDocument();
  expect(window.location.pathname).toBe("/posts");
});

test.each([
  ["/posts", "Posts page"],
  ["/posts/42", "Post detail page"],
  ["/authors/7", "Author page"],
  ["/bookmarks", "Bookmarks page"],
  ["/unknown", "Not found page"],
])("renders the matching page for %s", (path, pageText) => {
  window.history.replaceState({}, "", path);
  render(<App />);

  expect(screen.getByText(pageText)).toBeInTheDocument();
});