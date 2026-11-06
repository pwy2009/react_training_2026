import { truncate, initials, capitalize } from "./format";

// Sample tests: prove Jest is set up. Extend them.
test("truncates long text with an ellipsis", () => {
  expect(truncate("Hello world", 5)).toBe("Hello…");
  expect(truncate("Hi", 5)).toBe("Hi");
});

test("makes initials from a name", () => {
  expect(initials("Leanne Graham")).toBe("LG");
});

test("capitalizes the first letter", () => {
  expect(capitalize("sunt aut facere")).toBe("Sunt aut facere");
});
