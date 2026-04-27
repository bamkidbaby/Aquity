import Navbar from "../layouts/Navbar";
import About from "../section/About";
import Blog from "../section/Blog";
import Footer from "../layouts/Footer";
import AnimatedText from "../components/AnimatedText";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Navbar />
      <main className="relative z-10">
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 px-6 text-center">
          <AnimatedText
            as="p"
            animation="fade-down"
            className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.35em] text-white/45"
            text="Aquity Studio"
          />
          <AnimatedText
            as="h1"
            delay={80}
            className="whitespace-nowrap text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            text="Welcome to Aquity"
          />
          <AnimatedText
            as="p"
            delay={140}
            className="whitespace-nowrap text-sm text-white/80 md:text-lg"
            text="Where ideas turn into seamless digital experiences."
          />
          <Reveal
            delay={220}
            className="flex items-center gap-1 whitespace-nowrap font-mono text-sm text-white/60 md:gap-2"
          >
            <span>Launch</span>
            <span>|</span>
            <span>Build</span>
            <span>|</span>
            <span>Scale</span>
          </Reveal>
        </div>
      </main>
      <Blog />
      <About />
      <Footer />
    </div>
  );
}
