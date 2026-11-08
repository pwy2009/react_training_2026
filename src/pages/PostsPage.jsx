import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, getUsers } from "../api/posts";
import { capitalize, initials, truncate } from "../utils/format";

export function PostsPage() {
  const [retryCount, setRetryCount] = useState(0);
  const [request, setRequest] = useState({ status: "loading", posts: [], users: [] });

  useEffect(() => {
    let isCurrent = true;
    setRequest({ status: "loading", posts: [], users: [] });

    Promise.all([getPosts(), getUsers()])
      .then(([posts, users]) => {
        if (isCurrent) {
          setRequest({ status: "success", posts, users });
        }
      })
      .catch(() => {
        if (isCurrent) {
          setRequest({ status: "error", posts: [], users: [] });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [retryCount]);

  return (
    <>
      <header className="page-header">
        <h1>Posts</h1>
      </header>

      {request.status === "loading" && (
        <div className="cluster" role="status">
          <div className="spinner" aria-hidden="true" />
          <span>Loading posts and users...</span>
        </div>
      )}

      {request.status === "error" && (
        <div className="alert alert--error" role="alert">
          <span>Couldn't load posts and users.</span>
          <button className="btn" type="button" onClick={() => setRetryCount(count => count + 1)}>
            Retry
          </button>
        </div>
      )}

      {request.status === "success" && request.posts.length === 0 && (
        <div className="empty-state">
          <h2>No posts available</h2>
          <p>There are no posts to show.</p>
        </div>
      )}

      {request.status === "success" && request.posts.length > 0 && (
        <ul className="post-grid">
          {request.posts.map(post => {
            const author = request.users.find(user => user.id === post.userId);

            return (
              <li key={post.id}>
                <article className="post-card">
                  <span className="post-card__id">#{post.id}</span>
                  <h2 className="post-card__title">
                    <Link to={`/posts/${post.id}`}>{capitalize(post.title)}</Link>
                  </h2>
                  <p className="post-card__excerpt">
                    {truncate(post.body.replace(/\s+/g, " "), 140)}
                  </p>
                  <div className="post-card__footer">
                    {author ? (
                      <Link className="byline" to={`/authors/${author.id}`}>
                        <span className="avatar" aria-hidden="true">{initials(author.name)}</span>
                        {author.name}
                      </Link>
                    ) : (
                      <span className="muted">Unknown author</span>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}