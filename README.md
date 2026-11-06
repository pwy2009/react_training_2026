# Blog Explorer: Capstone Starter

A ready-to-build starting point for the Blog Explorer capstone: a blog reader on
[JSONPlaceholder](https://jsonplaceholder.typicode.com) with a filterable post list, a detail page at
`/posts/:id`, filters that survive navigation, author pages, and RxJS streams for shared state.

**What's already done:** project setup, folder structure, a complete style system, testing setup,
and five passing sample tests.

**What you build:** everything else. There are no routes, no API calls and no state yet.
The `TODO (Milestone N)` comments in the code show where each part goes.

No login or registration is part of this project.

---

## 1. Prerequisites

| Tool | Version | Check with |
| --- | --- | --- |
| Node.js | 18 or newer (20+ recommended) | `node -v` |
| npm | comes with Node | `npm -v` |
| Editor | VS Code recommended | |
| Browser | Chrome, Edge or Firefox, with React Developer Tools | |

## 2. Get it running

```bash
# 1. Unzip, then open the folder
cd blog-explorer-starter

# 2. Install dependencies
npm install

# 3. Create your local settings file
cp .env.example .env.local        # Windows (PowerShell): copy .env.example .env.local

# 4. Start the app
npm run dev                       # open the URL it prints, usually http://localhost:5173

# 5. Run the tests
npm test                          # 5 tests should pass
```

You should see the **Starter style guide** page: header, buttons, filters, post cards, an author
card, comments, and loading and error states. That page is your visual reference.

## 3. Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with instant reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run all tests once |
| `npm run test:watch` | Re-run tests on every save |
| `npm run test:coverage` | Tests plus a coverage report |

## 4. What's installed

| Package | Why |
| --- | --- |
| `react`, `react-dom` | The UI library |
| `react-router-dom` | Routes, including `/posts/:id` and query strings |
| `rxjs` | Observables: debounced search, cancelling stale requests, shared stores |
| `react-hook-form`, `zod`, `@hookform/resolvers` | The "Add a comment" form and its validation |
| `jest`, `@testing-library/*` | Unit and component tests |
| `vite` | Dev server and build |

## 5. The app you'll build

| Route | Screen |
| --- | --- |
| `/` | Redirects to `/posts` |
| `/posts?q=&author=&sort=&view=` | Post list with search, author filter, sort and grid/list view |
| `/posts/:id` | Post detail: the post, its author, its comments, Previous/Next, "More from this author", and an "Add a comment" form |
| `/authors/:id` | Author page: profile, their posts, and todo progress |
| `/bookmarks` | Posts the reader has bookmarked |
| `*` | Not found page |

Filters live in the query string, so a filtered view can be bookmarked, shared and restored with
the browser's Back button. The detail page keeps the same query string, so "Back to posts" and
Previous/Next follow the filtered list.

## 6. Folder structure

```
blog-explorer-starter/
├── .env.example             API base URL (copy to .env.local)
├── index.html
├── package.json
├── vite.config.js
├── babel.config.cjs         Jest only: lets Jest read JSX
├── jest.config.cjs          Jest settings
├── jest.setup.js            Adds toBeInTheDocument() and friends
├── test-mocks/              Stand-ins for CSS, images and appConfig in tests
└── src/
    ├── main.jsx             Entry point
    ├── App.jsx              App shell. Routes go here (Milestone 2)
    ├── appConfig.js         Reads VITE_API_BASE_URL
    ├── api/                 All network code (Milestone 1)
    │   ├── client.js
    │   └── posts.js
    ├── components/
    │   ├── layout/          Header, Footer (done)
    │   └── ui/              Button, Avatar, Chip, Spinner, EmptyState, ErrorBoundary...
    ├── features/
    │   ├── posts/           PostList, PostCard, FilterBar, Pager
    │   ├── comments/        CommentList, CommentItem, CommentForm
    │   ├── authors/         AuthorCard, AuthorStats
    │   ├── bookmarks/       BookmarkButton, BookmarkList
    │   └── recently-viewed/ RecentlyViewedStrip
    ├── pages/               One component per route
    ├── hooks/               Shared hooks: usePostFilters, useObservable...
    ├── store/               RxJS stores: bookmarks, recently viewed, local comments
    ├── utils/               Pure helpers: format.js (done)
    ├── styles/              Design tokens and all CSS (done)
    └── dev/                 StylePreview.jsx: delete when your pages exist
```

Each folder has a short `README.md` saying exactly what belongs in it.

**Rules of thumb**

- **Network code only in `api/`.** Components never call `fetch` directly.
- **Pages read the URL; components receive props.** A component in `features/` or `components/`
  gets data through props and reports actions through callbacks (`onToggleBookmark`, `onSubmit`, `onNext`).
- **RxJS only in `store/` and `hooks/`.** Components use a hook like `useObservable(stream$)`.
- **Tests sit next to the file they test:** `PostCard.jsx` and `PostCard.test.jsx`.

## 7. The API: JSONPlaceholder

Base URL: `https://jsonplaceholder.typicode.com` (set in `.env.local` as `VITE_API_BASE_URL`).
No API key or sign-up. Full guide: [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com).

| Endpoint | Returns | Used on |
| --- | --- | --- |
| `GET /posts` | 100 posts | Post list |
| `GET /posts/:id` | One post | Post detail |
| `GET /posts/:id/comments` | That post's comments (5 each) | Post detail |
| `GET /users` | 10 users (the authors) | Author filter, bylines |
| `GET /users/:id` | One user | Author page, author card |
| `GET /users/:id/posts` | That author's posts | Author page, "More from this author" |
| `GET /users/:id/todos` | That author's todos | Author page progress |
| `POST /comments` (body includes `postId`) | A fake new comment with an id | "Add a comment" (not really saved) |

Data shapes:

```json
// post
{ "userId": 1, "id": 1, "title": "sunt aut facere repellat...", "body": "quia et suscipit\nsuscipit..." }

// comment
{ "postId": 1, "id": 1, "name": "id labore ex et quam laborum", "email": "Eliseo@gardner.biz", "body": "laudantium enim..." }

// user (trimmed)
{ "id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz",
  "address": { "city": "Gwenborough" }, "company": { "name": "Romaguera-Crona" } }

// todo
{ "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false }
```

Watch out for:

- **Posts don't include the author's name.** Load `/users` once and look authors up by `userId`.
- **Text is lowercase Latin placeholder text.** Use `capitalize()` from `utils/format.js` for titles.
- **Bodies contain `\n` line breaks.** The `article__body` and `comment__body` classes preserve them.
- **Unknown ids return 404** (for example `/posts/999`). Show a "Post not found" message.
- **Writes are faked.** A POST returns a response but nothing is saved, so keep added comments and
  bookmarks in the browser (RxJS store plus `localStorage`).
- **The data is small.** Load posts and users once, then filter in the browser. Don't call the API on every keystroke.

## 8. Style guide: class reference

All styles are ready in `src/styles/`. Change colours, spacing and radius in `tokens.css`.
Dark mode is automatic.

| Purpose | Classes |
| --- | --- |
| Page shell | `app`, `container`, `page`, `page-header` |
| Header and footer | `site-header`, `brand`, `nav`, `site-footer` |
| Layout helpers | `with-sidebar`, `sidebar`, `stack`, `cluster`, `spread` |
| Post list | `post-grid`, `post-grid--list` |
| Post card | `post-card`, `post-card__id`, `post-card__title`, `post-card__excerpt`, `post-card__footer` |
| Detail page | `detail` (article + sidebar), `article`, `article__body`, `pager` |
| Author | `avatar`, `avatar--large`, `byline`, `author-card`, `meta-list` |
| Comments | `comment-list`, `comment`, `comment__name`, `comment__email`, `comment__body`, `comment--local` |
| Stats | `stat-row`, `stat`, `stat__value`, `stat__label`, `progress`, `progress__bar` |
| Buttons | `btn`, `btn--primary`, `btn--ghost`, `btn--danger`, `btn--icon` (use `aria-pressed="true"` for toggled) |
| Labels | `badge`, `tag`, `chip` (with a remove `<button>` inside) |
| Forms | `field`, `input`, `select`, `range`, `field__error`, `field__hint`, `filter-panel` |
| Feedback | `spinner`, `skeleton`, `alert alert--error`, `alert alert--success`, `empty-state` |
| Strips | `strip` (recently viewed, more from this author) |
| Accessibility | `visually-hidden`, `muted` |

Style invalid inputs with `aria-invalid="true"`: the red border comes from the CSS, and screen
readers get the same signal.

## 9. Build plan: step by step

Work through the milestones in order. Commit at the end of each one.

### Milestone 1: API layer
- [ ] `api/client.js`: write `getJson(path, { signal })` (base URL, `res.ok` check, abort support)
- [ ] `api/posts.js`: one function per endpoint in section 7
- [ ] Unit test `getJson` with a mocked `fetch`, including a 404

### Milestone 2: Routing
- [ ] Wrap the app in `<BrowserRouter>` in `App.jsx`
- [ ] Add routes: `/` (redirect), `/posts`, `/posts/:id`, `/authors/:id`, `/bookmarks`, `*`
- [ ] Create empty page components in `pages/`
- [ ] Switch header links to `<NavLink>`

### Milestone 3: Post list and filters
- [ ] Load posts and users together, with loading, error (with Retry) and empty states
- [ ] `PostList` and `PostCard`: the parent passes the post, author and callbacks; the card calls them
- [ ] Filters: title search, author, sort (newest, oldest, title A to Z), grid/list view
- [ ] Keep every filter in the URL query string with `useSearchParams`
- [ ] Active filter chips, each removable; a Reset button; "Showing 10 of 100 posts"

### Milestone 4: Detail and author pages
- [ ] Read `:id` with `useParams`; load the post and its comments; handle 404
- [ ] "Back to posts" returns to the list with the same filters
- [ ] Previous and Next move through the filtered, sorted list ("3 of 10")
- [ ] Author card in the sidebar, linking to `/authors/:id`
- [ ] "More from this author": up to 3 of their other posts
- [ ] Author page: profile, their posts, and todo progress (completed out of total)

### Milestone 5: Observables (RxJS)
- [ ] `hooks/useObservable.js`: subscribe in `useEffect`, unsubscribe in cleanup
- [ ] Debounced search: `debounceTime(300)` and `distinctUntilChanged`
- [ ] Detail loading with `switchMap`, so fast Previous/Next clicks cancel stale requests
- [ ] Stores with `BehaviorSubject`: bookmarks, recently viewed (max 5), local comments
- [ ] The header's bookmark badge updates live from the store

### Milestone 6: Bookmarks and the comment form
- [ ] Bookmarks page, saved in `localStorage`, with remove and an empty state
- [ ] "Add a comment" form (name, email, comment) validated with React Hook Form and Zod
- [ ] `CommentForm` (child) calls `onSubmit`; the page (parent) posts it and adds it to the local store
- [ ] New comments appear at the top of the list with the `comment--local` style

### Milestone 7: Performance and resilience
- [ ] Profile with React DevTools; fix avoidable re-renders with `memo`, `useMemo`, `useCallback`
- [ ] Lazy-load the Author and Bookmarks pages
- [ ] An error boundary around each page

### Milestone 8: Tests and polish
- [ ] Tests for `utils`, the stores, the hooks, `PostCard`, the filters and the detail page
- [ ] API mocked in every test; no real network calls
- [ ] Keyboard check: every action works without a mouse
- [ ] Delete `src/dev/StylePreview.jsx`

The capstone specification document has the full requirements and acceptance criteria for each screen.

## 10. Testing quick reference

```js
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as api from "../api/posts";

jest.mock("../api/posts");   // replace the API with mocks

test("shows the post title", async () => {
  api.getPost.mockResolvedValue({ id: 1, userId: 1, title: "qui est esse", body: "..." });
  api.getPostComments.mockResolvedValue([]);
  api.getUser.mockResolvedValue({ id: 1, name: "Leanne Graham" });

  render(
    <MemoryRouter initialEntries={["/posts/1"]}>
      <PostDetailPage />
    </MemoryRouter>
  );

  expect(await screen.findByRole("heading", { name: "Qui est esse" })).toBeInTheDocument();
});
```

A page that reads `useParams` must be rendered inside a matching `<Routes><Route path="/posts/:id" ...>`
in the test, as well as the `MemoryRouter`.

## 11. Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm install` fails with `ERESOLVE … @babel/core` | Keep the Babel 7 versions in `package.json`; Jest 29 needs Babel 7 |
| `Cannot use 'import.meta' outside a module` in a test | Import the base URL from `appConfig.js`; never read `import.meta` elsewhere |
| `Cannot find module './x.css'` in a test | Check `moduleNameMapper` in `jest.config.cjs` |
| Author names show as "undefined" | Posts only have `userId`; join them with the users list |
| A route shows a blank page after refresh in production | Configure your host to serve `index.html` for all routes |
