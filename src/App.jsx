import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { StylePreview } from "./dev/StylePreview";

// Starting point. There are no routes yet.
// TODO (Milestone 2): wrap the app in <BrowserRouter> and replace <StylePreview />
// with <Routes> for /posts, /posts/:id, /authors/:id, /bookmarks and *.
export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container page">
        <StylePreview />
      </main>
      <Footer />
    </div>
  );
}
