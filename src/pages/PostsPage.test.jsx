import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getPosts, getUsers } from "../api/posts";
import { PostsPage } from "./PostsPage";

jest.mock("../api/posts", () => ({
  getPosts: jest.fn(),
  getUsers: jest.fn(),
}));

const posts = [{ id: 1, userId: 2, title: "hello world", body: "A post body." }];
const users = [{ id: 2, name: "Ada Lovelace" }];

function renderPage() {
  return render(
    <MemoryRouter>
      <PostsPage />
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

  expect(await screen.findByRole("heading", { name: "Hello world" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Ada Lovelace/ })).toHaveAttribute("href", "/authors/2");
});

test("shows an error and retries both requests", async () => {
  getPosts.mockRejectedValueOnce(new Error("Network error")).mockResolvedValueOnce(posts);
  getUsers.mockResolvedValue(users);

  renderPage();

  expect(await screen.findByRole("alert")).toHaveTextContent("Couldn't load posts and users.");
  fireEvent.click(screen.getByRole("button", { name: "Retry" }));

  expect(await screen.findByRole("heading", { name: "Hello world" })).toBeInTheDocument();
  expect(getPosts).toHaveBeenCalledTimes(2);
  expect(getUsers).toHaveBeenCalledTimes(2);
});

test("shows an empty state when there are no posts", async () => {
  getPosts.mockResolvedValue([]);
  getUsers.mockResolvedValue(users);

  renderPage();

  expect(await screen.findByRole("heading", { name: "No posts available" })).toBeInTheDocument();
});