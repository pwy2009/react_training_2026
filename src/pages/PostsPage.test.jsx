import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { getPosts, getUsers } from "../api/posts";
import { PostsPage } from "./PostsPage";

jest.mock("../api/posts", () => ({
  getPosts: jest.fn(),
  getUsers: jest.fn(),
}));

const posts = [
  { id: 1, userId: 2, title: "Gamma", body: "Gamma body." },
  { id: 2, userId: 1, title: "Alpha", body: "Alpha body." },
  { id: 3, userId: 2, title: "Alpha Beta", body: "Alpha beta body." },
];
const users = [
  { id: 1, name: "Grace Hopper" },
  { id: 2, name: "Ada Lovelace" },
];

function CurrentPath() {
  const location = useLocation();
  return <span data-testid="current-path">{location.pathname}{location.search}</span>;
}

function renderPage(initialEntry = "/posts") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <PostsPage />
      <CurrentPath />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  getPosts.mockReset();
  getUsers.mockReset();
});

test("loads posts and users together and displays their data", async () => {
  let resolvePosts;
  let resolveUsers;
  getPosts.mockReturnValue(new Promise(resolve => { resolvePosts = resolve; }));
  getUsers.mockReturnValue(new Promise(resolve => { resolveUsers = resolve; }));

  renderPage();

  expect(screen.getByRole("status")).toHaveTextContent("Loading posts and users");
  expect(getPosts).toHaveBeenCalledTimes(1);
  expect(getUsers).toHaveBeenCalledTimes(1);

  await act(async () => {
    resolvePosts(posts);
    resolveUsers(users);
  });

  expect(await screen.findByRole("heading", { name: "Gamma" })).toBeInTheDocument();
  const gammaPost = screen.getByRole("heading", { name: "Gamma" }).closest("li");
  fireEvent.click(within(gammaPost).getByRole("button", { name: /Ada Lovelace/ }));
  expect(screen.getByTestId("current-path")).toHaveTextContent("/authors/2");
});

test("shows an error and retries both requests", async () => {
  getPosts.mockRejectedValueOnce(new Error("Network error")).mockResolvedValueOnce(posts);
  getUsers.mockResolvedValue(users);

  renderPage();

  expect(await screen.findByRole("alert")).toHaveTextContent("Couldn't load posts and users.");
  fireEvent.click(screen.getByRole("button", { name: "Retry" }));

  expect(await screen.findByRole("heading", { name: "Gamma" })).toBeInTheDocument();
  expect(getPosts).toHaveBeenCalledTimes(2);
  expect(getUsers).toHaveBeenCalledTimes(2);
});

test("shows an empty state when there are no posts", async () => {
  getPosts.mockResolvedValue([]);
  getUsers.mockResolvedValue(users);

  renderPage();

  expect(await screen.findByRole("heading", { name: "No posts available" })).toBeInTheDocument();
});

test("stores filter changes in the URL and filters by title and author", async () => {
  getPosts.mockResolvedValue(posts);
  getUsers.mockResolvedValue(users);

  renderPage();

  await screen.findByRole("heading", { name: "Gamma" });
  fireEvent.change(screen.getByRole("searchbox", { name: "Search titles" }), {
    target: { value: "alpha" },
  });

  expect(screen.getByTestId("current-path")).toHaveTextContent("q=alpha");
  expect(screen.getByText("Showing 2 of 3 posts")).toBeInTheDocument();

  fireEvent.change(screen.getByRole("combobox", { name: "Author" }), {
    target: { value: "2" },
  });

  expect(screen.getByTestId("current-path")).toHaveTextContent("author=2");
  expect(screen.getByText("Showing 1 of 3 posts")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Alpha Beta" })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Alpha", exact: true })).not.toBeInTheDocument();
});

test("sorts titles and switches to list view", async () => {
  getPosts.mockResolvedValue(posts);
  getUsers.mockResolvedValue(users);

  renderPage();

  await screen.findByRole("heading", { name: "Gamma" });
  fireEvent.change(screen.getByRole("combobox", { name: "Sort by" }), {
    target: { value: "title" },
  });
  fireEvent.click(screen.getByRole("button", { name: "List" }));

  expect(screen.getByTestId("current-path")).toHaveTextContent("sort=title");
  expect(screen.getByTestId("current-path")).toHaveTextContent("view=list");
  expect(screen.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "true");

  const postList = screen.getByRole("list");
  expect(postList).toHaveClass("post-grid--list");
  expect(within(postList).getAllByRole("heading").map(heading => heading.textContent)).toEqual([
    "Alpha",
    "Alpha Beta",
    "Gamma",
  ]);
});

test("removes individual active filters and resets all filters", async () => {
  getPosts.mockResolvedValue(posts);
  getUsers.mockResolvedValue(users);

  renderPage("/posts?q=alpha&author=2&sort=oldest&view=list");

  expect(await screen.findByText("Showing 1 of 3 posts")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Remove search filter" }));

  expect(screen.getByTestId("current-path")).not.toHaveTextContent("q=");
  expect(screen.getByText("Showing 2 of 3 posts")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));

  expect(screen.getByTestId("current-path")).toHaveTextContent("/posts");
  expect(screen.getByText("Showing 3 of 3 posts")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Grid" })).toHaveAttribute("aria-pressed", "true");
});