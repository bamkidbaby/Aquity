import bg from "../assets/bg.png";
import Navbar from "../layouts/Navbar";
import Overlay from "../components/Overlay";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-left md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Overlay />
      <Navbar />
      <main className="relative z-10">
        <div className="flex flex-col gap-2 justify-center items-center h-screen">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Welcome to Aquity
          </h1>
          <p className="text-white text-sm md:text-lg">
            Where ideas turn into seamless digital experiences.
          </p>
          <div className="flex items-center gap-1 md:gap-2 text-sm font-mono text-white/70">
            <span>Launch</span>
            <span>|</span>
            <span>Build</span>
            <span>|</span>
            <span>Scale</span>
          </div>
        </div>
      </main>
    </div>
  );
}
