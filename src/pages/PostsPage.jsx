import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPosts, getUsers } from "../api/posts";
import { FilterBar } from "../features/posts/components/FilterBar";
import { PostList } from "../features/posts/components/PostList";

const FILTER_KEYS = ["q", "author", "sort", "view"];

export function PostsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [retryCount, setRetryCount] = useState(0);
  const [request, setRequest] = useState({ status: "loading", posts: [], users: [] });
  const query = searchParams.get("q") ?? "";
  const authorId = searchParams.get("author") ?? "";
  const requestedSort = searchParams.get("sort");
  const sort = ["oldest", "title"].includes(requestedSort) ? requestedSort : "newest";
  const view = searchParams.get("view") === "list" ? "list" : "grid";

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);
    const isDefault = !value || (key === "sort" && value === "newest") || (key === "view" && value === "grid");

    if (isDefault) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  }

  function resetFilters() {
    const nextParams = new URLSearchParams(searchParams);
    FILTER_KEYS.forEach(key => nextParams.delete(key));
    setSearchParams(nextParams);
  }

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

  const visiblePosts = request.posts
    .filter(post => {
      const matchesTitle = post.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
      const matchesAuthor = !authorId || String(post.userId) === authorId;
      return matchesTitle && matchesAuthor;
    })
    .sort((left, right) => {
      if (sort === "oldest") return left.id - right.id;
      if (sort === "title") {
        return left.title.localeCompare(right.title, undefined, { sensitivity: "base" });
      }
      return right.id - left.id;
    });

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

      {request.status === "success" && (
        <>
          <FilterBar
            query={query}
            authorId={authorId}
            sort={sort}
            view={view}
            users={request.users}
            resultCount={visiblePosts.length}
            totalCount={request.posts.length}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
          {visiblePosts.length > 0 ? (
            <PostList
              posts={visiblePosts}
              users={request.users}
              view={view}
              onPostClick={post => navigate(`/posts/${post.id}`)}
              onAuthorClick={author => navigate(`/authors/${author.id}`)}
            />
          ) : (
            <div className="empty-state">
              <h2>{request.posts.length === 0 ? "No posts available" : "No posts match these filters"}</h2>
              <p>{request.posts.length === 0 ? "There are no posts to show." : "Try changing or resetting your filters."}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}