# api/

All network code lives here, and nothing else talks to the server.

- `client.js`: one `getJson(path, { signal })` helper (base URL, errors, abort).
- `posts.js`: one function per JSONPlaceholder endpoint, built on `getJson`.

Tests replace this folder with `jest.mock("../api/posts")`.
