import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { PostsPage } from "./pages/PostsPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { AuthorPage } from "./pages/AuthorPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="container page">
          <Routes>
            <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/authors/:id" element={<AuthorPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
