import { fireEvent, render, screen } from "@testing-library/react";
import { PostCard } from "./PostCard";

const post = { id: 3, title: "hello world", body: "A post body." };
const author = { id: 7, name: "Ada Lovelace" };

test("calls the parent callbacks with the post and author", () => {
  const onPostClick = jest.fn();
  const onAuthorClick = jest.fn();

  render(
    <PostCard
      post={post}
      author={author}
      onPostClick={onPostClick}
      onAuthorClick={onAuthorClick}
    />,
  );

  fireEvent.click(screen.getByRole("button", { name: "Hello world" }));
  fireEvent.click(screen.getByRole("button", { name: /Ada Lovelace/ }));

  expect(onPostClick).toHaveBeenCalledWith(post);
  expect(onAuthorClick).toHaveBeenCalledWith(author);
});