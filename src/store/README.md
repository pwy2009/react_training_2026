# store/

Shared state as RxJS streams. Each store is a small module with a `BehaviorSubject` inside and plain functions outside.

- `bookmarksStore.js`: `bookmarks$`, `toggleBookmark(post)` (saved to localStorage)
- `recentlyViewedStore.js`: `recentlyViewed$`, `addRecentlyViewed(post)` (max 5, newest first)
- `localCommentsStore.js`: `localComments$`, `addLocalComment(postId, comment)` (comments the user adds; JSONPlaceholder doesn't save them)

Components never import RxJS directly; they use `useObservable` from `hooks/`.
