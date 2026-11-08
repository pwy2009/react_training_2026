import { getJson } from "./client";
import {
	getPost,
	getPostComments,
	getPosts,
	getUser,
	getUserPosts,
	getUserTodos,
	getUsers,
} from "./posts";

jest.mock("./client", () => ({ getJson: jest.fn() }));

beforeEach(() => {
	getJson.mockClear();
});

test.each([
	[getPosts, "/posts", []],
	[getPost, "/posts/12", [12]],
	[getPostComments, "/posts/12/comments", [12]],
	[getUsers, "/users", []],
	[getUser, "/users/4", [4]],
	[getUserPosts, "/users/4/posts", [4]],
	[getUserTodos, "/users/4/todos", [4]],
])("requests %s", (endpoint, path, args) => {
	endpoint(...args);

	expect(getJson).toHaveBeenCalledWith(path);
});