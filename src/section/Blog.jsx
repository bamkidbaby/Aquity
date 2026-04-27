import { Link } from "react-router-dom";
import CountUp from "react-countup";
import AnimatedText from "../components/AnimatedText";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import StatGrid from "../components/StatGrid";
import { articles } from "../content/articles";

const tags = [
  "All",
  "Strategy",
  "Engineering",
  "Architecture",
  "Industry",
  "Product",
  "Process",
];

const featured = articles.find((article) => article.featured) ?? articles[0];
const rest = articles.filter((article) => article.slug !== featured.slug);

export default function Blog() {
  return (
    <section id="blog" className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-200 -translate-x-1/2 rounded-full bg-white/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="border-b border-white/10 pb-16 pt-36 md:pb-20 md:pt-48">
          <SectionHeader
            eyebrow="Aquity - Journal"
            title={
              <>
                Ideas &{" "}
                <span className="font-light italic text-white/40">
                  Insights.
                </span>
              </>
            }
            description="Thoughts on product, design, engineering, and building things that endure in a fast-moving world."
          />
        </div>

        <Reveal className="flex flex-wrap items-center gap-2 border-b border-white/10 py-7">
          {tags.map((tag, index) => (
            <button
              key={tag}
              className={`border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition duration-200 ${
                index === 0
                  ? "border-white/40 bg-white/8 text-white"
                  : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"
              }`}
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto hidden font-mono text-xs text-white/20 md:block">
            {articles.length} articles
          </span>
        </Reveal>

        <Reveal
          as={Link}
          to={`/blog/${featured.slug}`}
          className="group block cursor-pointer border-b border-white/10 py-16 md:py-24"
        >
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-white/25">
            Featured Article
          </p>
          <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:gap-16">
            <div className="flex gap-8 md:w-5/12 md:flex-col md:justify-between">
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <span className="border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/40">
                    {featured.tag}
                  </span>
                  <span className="font-mono text-xs text-white/25">
                    {featured.date}
                  </span>
                  <span className="font-mono text-xs text-white/20">
                    - {featured.readTime}
                  </span>
                </div>
                <AnimatedText
                  as="h2"
                  className="mb-5 text-2xl font-semibold leading-[1.15] tracking-tight transition duration-300 group-hover:text-white/80 md:text-3xl lg:text-4xl"
                  text={featured.title}
                />
                <AnimatedText
                  as="p"
                  delay={100}
                  className="font-mono text-sm leading-relaxed text-white/45"
                  lines={[featured.excerpt]}
                />
              </div>
              <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-white/30 transition duration-300 group-hover:text-white/60">
                <span>Read Article</span>
                <div className="h-px w-6 bg-white/25 transition-all duration-500 group-hover:w-14 group-hover:bg-white/50" />
              </div>
            </div>

            <div className="aspect-16/10 overflow-hidden border border-white/10 transition duration-300 group-hover:border-white/20 md:w-7/12 md:aspect-auto">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover grayscale opacity-60 transition duration-700 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:opacity-80"
              />
            </div>
          </div>
        </Reveal>

        <div className="py-16 md:py-20">
          <AnimatedText
            as="p"
            animation="fade-right"
            className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-white/25"
            text="Latest Articles"
          />
          <div className="grid gap-px border border-white/10 bg-white/[0.07] md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal
                key={post.slug}
                delay={index * 70}
                as={Link}
                to={`/blog/${post.slug}`}
                className="group flex cursor-pointer flex-col bg-black/60 transition duration-300 hover:bg-white/[0.03]"
              >
                <div className="aspect-video overflow-hidden border-b border-white/10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover grayscale opacity-50 transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:opacity-75"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-7">
                  <div className="flex items-center justify-between">
                    <span className="border border-white/10 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-white/30">
                      {post.tag}
                    </span>
                    <span className="font-mono text-xs text-white/20">
                      {post.readTime}
                    </span>
                  </div>
                  <div>
                    <p className="mb-2.5 font-mono text-xs text-white/20">
                      {post.date}
                    </p>
                    <AnimatedText
                      as="h3"
                      delay={30}
                      className="text-base font-semibold leading-snug tracking-tight transition duration-200 group-hover:text-white/80 md:text-lg"
                      text={post.title}
                    />
                  </div>
                  <AnimatedText
                    as="p"
                    delay={80}
                    className="flex-1 font-mono text-xs leading-relaxed text-white/35"
                    lines={[post.excerpt]}
                  />
                  <div className="flex items-center gap-3 border-t border-white/8 pt-4 font-mono text-xs uppercase tracking-widest text-white/20 transition duration-300 group-hover:text-white/50">
                    <span>Read Article</span>
                    <div className="h-px w-4 bg-white/15 transition-all duration-500 group-hover:w-8 group-hover:bg-white/40" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <StatGrid
          className="mb-16 md:mb-20"
          items={[
            { value: 6, suffix: "+", label: "Articles Published" },
            { value: 4, suffix: "", label: "Topics Covered" },
            { value: 12, suffix: "k+", label: "Monthly Readers" },
            { value: 2025, suffix: "", label: "Est. Year" },
          ]}
          renderValue={(item) => (
            <>
              <CountUp end={item.value} duration={2} />
              {item.suffix}
            </>
          )}
        />

        <Reveal className="mb-20 border border-white/10 transition duration-500 hover:border-white/20">
          <div className="flex flex-col items-start justify-between gap-8 px-8 py-10 md:flex-row md:items-center md:px-12">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/25">
                Newsletter
              </p>
              <p className="mb-2 text-xl font-semibold tracking-tight md:text-2xl">
                Stay in the loop.
              </p>
              <p className="font-mono text-sm text-white/35">
                New articles on product, design and engineering. No noise, no
                spam.
              </p>
            </div>
            <div className="flex w-full items-stretch md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full border border-white/15 border-r-0 bg-white/5 px-5 py-3.5 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/20 focus:border-white/35 md:w-64"
              />
              <button className="shrink-0 bg-white px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-black transition duration-200 hover:bg-white/90 active:scale-[0.98]">
                Subscribe
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}
