// Read endpoints for JSONPlaceholder. One small function per endpoint, built on getJson.
import { getJson } from "./client";

export function getPosts() {
	return getJson("/posts");
}

export function getPost(id) {
	return getJson(`/posts/${id}`);
}

export function getPostComments(postId) {
	return getJson(`/posts/${postId}/comments`);
}

export function getUsers() {
	return getJson("/users");
}

export function getUser(id) {
	return getJson(`/users/${id}`);
}

export function getUserPosts(userId) {
	return getJson(`/users/${userId}/posts`);
}

export function getUserTodos(userId) {
	return getJson(`/users/${userId}/todos`);
}
