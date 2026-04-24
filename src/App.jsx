import "./App.css";
import Home from "./section/Home";
import About from "./section/About";
import Blog from "./section/Blog";
import Footer from "./layouts/Footer";

function App() {
  return (
    <div className="App">
      <Home />
      <Blog />
      <About />
      <Footer />
    </div>
  );
}

export default App;
