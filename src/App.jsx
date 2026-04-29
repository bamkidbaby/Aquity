import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogPage from "./pages/Blog";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StaticPage from "./pages/StaticPage";
import SiteLayout from "./layouts/SiteLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/careers" element={<StaticPage />} />
          <Route path="/press" element={<StaticPage />} />
          <Route path="/services/strategy" element={<StaticPage />} />
          <Route path="/services/design" element={<StaticPage />} />
          <Route path="/services/engineering" element={<StaticPage />} />
          <Route path="/services/scale" element={<StaticPage />} />
          <Route path="/privacy" element={<StaticPage />} />
          <Route path="/terms" element={<StaticPage />} />
          <Route path="/cookies" element={<StaticPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
