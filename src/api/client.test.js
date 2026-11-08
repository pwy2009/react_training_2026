import { API_BASE_URL, getJson } from "./client";

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  if (originalFetch === undefined) {
    delete global.fetch;
  } else {
    global.fetch = originalFetch;
  }
});

// Sample test: proves the API layer can be imported in tests (import.meta is handled).
test("uses the JSONPlaceholder base URL", () => {
  expect(API_BASE_URL).toBe("https://jsonplaceholder.typicode.com");
});

test("fetches and returns parsed JSON, forwarding the abort signal", async () => {
  const data = [{ id: 1, title: "A post" }];
  const signal = new AbortController().signal;
  const json = jest.fn().mockResolvedValue(data);
  global.fetch.mockResolvedValue({ ok: true, json });

  await expect(getJson("/posts", { signal })).resolves.toEqual(data);

  expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/posts`, { signal });
  expect(json).toHaveBeenCalledTimes(1);
});

test("throws an error for a 404 response", async () => {
  const json = jest.fn();
  global.fetch.mockResolvedValue({ ok: false, status: 404, json });

  await expect(getJson("/posts/999")).rejects.toThrow("Request failed with status 404");

  expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/posts/999`, { signal: undefined });
  expect(json).not.toHaveBeenCalled();
});
