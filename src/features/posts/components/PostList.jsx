import { PostCard } from "./PostCard";

export function PostList({ posts, users, view = "grid", onPostClick, onAuthorClick }) {
  return (
    <ul className={`post-grid${view === "list" ? " post-grid--list" : ""}`}>
      {posts.map(post => (
        <li key={post.id}>
          <PostCard
            post={post}
            author={users.find(user => user.id === post.userId)}
            onPostClick={onPostClick}
            onAuthorClick={onAuthorClick}
          />
        </li>
      ))}
    </ul>
  );
}