import { Link } from "react-router-dom";
import bg from "../assets/bg.png";
import AnimatedText from "../components/AnimatedText";
import Overlay from "../components/Overlay";
import Reveal from "../components/Reveal";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import About from "../section/About";
import Blog from "../section/Blog";

const proofPoints = [
  { value: "120+", label: "Projects shipped" },
  { value: "98%", label: "Client satisfaction" },
  { value: "6 yrs", label: "Senior product craft" },
];

const capabilities = ["Strategy", "Design Systems", "Engineering", "Launch"];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Navbar />

      <main className="relative z-10">
        <section className="relative min-h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          />
          <Overlay className="pointer-events-none absolute inset-0 z-[1]" />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40 bg-gradient-to-b from-black/45 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-52 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-end px-6 pb-10 pt-32 md:px-12 md:pb-14 md:pt-40">
            <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <AnimatedText
                  as="p"
                  animation="fade-down"
                  className="mb-6 font-mono text-[11px] uppercase tracking-[0.38em] text-white/48 md:text-xs"
                  text="Aquity Studio • Lagos, Nigeria"
                />

                <AnimatedText
                  as="h1"
                  delay={70}
                  className="max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white"
                  lines={[
                    "We design digital products that",
                    "feel inevitable.",
                  ]}
                />

                <AnimatedText
                  as="p"
                  delay={160}
                  className="mt-7 max-w-2xl font-mono text-sm leading-7 text-white/64 md:text-base"
                  lines={[
                    "Aquity turns ambitious ideas into sharp, resilient digital experiences.",
                    "Strategy, design, and engineering brought together with real product taste.",
                  ]}
                />

                <Reveal
                  delay={240}
                  className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center border border-white/18 bg-white px-6 py-3.5 font-mono text-xs uppercase tracking-[0.22em] text-black transition duration-300 hover:bg-white/92"
                  >
                    Start a Project
                  </Link>
                  <Link
                    to="/blog"
                    className="inline-flex items-center justify-center border border-white/18 bg-black/18 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.22em] text-white/76 backdrop-blur-sm transition duration-300 hover:border-white/35 hover:bg-white/8 hover:text-white"
                  >
                    Read Our Thinking
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center border border-transparent px-2 py-3.5 font-mono text-xs uppercase tracking-[0.22em] text-white/38 transition duration-300 hover:text-white/72"
                  >
                    View Dashboard
                  </Link>
                </Reveal>
              </div>

              <div className="grid gap-4 lg:col-span-4 lg:pl-6">
                <Reveal
                  delay={180}
                  className="border border-white/10 bg-black/30 p-5 backdrop-blur-md"
                >
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/34">
                    Current Focus
                  </p>
                  <div className="grid gap-3">
                    {capabilities.map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center justify-between border-b border-white/8 pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="font-mono text-xs text-white/28">
                          0{index + 1}
                        </span>
                        <span className="text-sm tracking-wide text-white/78">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal
                  delay={260}
                  className="border border-white/10 bg-black/26 p-5 backdrop-blur-md"
                >
                  <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-white/34">
                    Signal
                  </p>
                  <div className="grid grid-cols-3 gap-px border border-white/8 bg-white/8">
                    {proofPoints.map((item) => (
                      <div key={item.label} className="bg-black/35 px-3 py-4">
                        <p className="text-xl font-semibold tracking-tight text-white">
                          {item.value}
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase leading-4 tracking-[0.18em] text-white/32">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <Reveal
            delay={320}
            className="relative z-10 mx-auto -mt-2 grid max-w-7xl gap-px border-y border-white/10 bg-white/10 px-0 md:grid-cols-3"
          >
            <div className="bg-black/36 px-6 py-5 md:px-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/26">
                Built For
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                Founders, product teams, and operators who want the product to
                feel world-class before scale exposes the cracks.
              </p>
            </div>
            <div className="bg-black/30 px-6 py-5 md:px-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/26">
                Product Standard
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                Calm interfaces, strong systems, and decisions that still make
                sense six months after launch.
              </p>
            </div>
            <div className="bg-black/36 px-6 py-5 md:px-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/26">
                Engagement Style
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                Senior collaboration, direct thinking, and fewer layers between
                strategy and execution.
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <Blog />
      <About />
      <Footer />
    </div>
  );
}
