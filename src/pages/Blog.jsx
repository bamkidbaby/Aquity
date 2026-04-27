import { useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
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
  "Design",
];

const blogStats = [
  { value: 7, suffix: "+", label: "Articles" },
  { value: 12, suffix: "k+", label: "Readers" },
  { value: 8, suffix: "", label: "Topics" },
];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");

  const featured = articles.find((article) => article.featured) ?? articles[0];
  const filtered =
    activeTag === "All"
      ? articles.filter((article) => article.slug !== featured.slug)
      : articles.filter(
          (article) => article.slug !== featured.slug && article.tag === activeTag,
        );

  return (
    <PageFrame glowClassName="left-1/2 top-[-80px] h-[520px] w-[920px] -translate-x-1/2 bg-fuchsia-300/8">
      <section className="border-b border-white/10 pb-20 pt-36 md:pb-28 md:pt-48">
        <SectionHeader
          eyebrow="Aquity - Journal"
          title={
            <>
              Our
              <br />
              <span className="font-light italic text-white/35">Thinking.</span>
            </>
          }
          aside={
            <div className="pb-2">
              <div className="mb-5 h-px w-10 bg-white/15" />
              <p className="font-mono text-sm leading-relaxed text-white/35">
                Perspectives on product, craft, engineering, and what it takes
                to build things that last.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {blogStats.map((item) => (
                  <div key={item.label}>
                    <p className="text-2xl font-semibold tabular-nums">
                      <CountUp end={item.value} duration={2} />
                      {item.suffix}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-widest text-white/25">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          }
          titleClassName="text-6xl leading-[0.95] md:text-8xl lg:text-[108px]"
        />
      </section>

      <section className="border-b border-white/10 py-16 md:py-24">
        <Reveal
          as={Link}
          to={`/blog/${featured.slug}`}
          className="group block"
        >
          <div className="mb-10 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/20">
              Featured
            </p>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/25 transition duration-300 group-hover:text-white/60">
              <span>Read Article</span>
              <div className="h-px w-5 bg-white/20 transition-all duration-500 group-hover:w-12 group-hover:bg-white/50" />
            </div>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="order-2 aspect-[4/3] overflow-hidden border border-white/10 transition duration-500 group-hover:border-white/25 md:order-1">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover grayscale opacity-55 transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:opacity-80"
              />
            </div>

            <div className="order-1 flex flex-col gap-6 md:order-2">
              <div className="flex items-center gap-3">
                <span className="border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/35">
                  {featured.tag}
                </span>
                <span className="font-mono text-xs text-white/20">
                  {featured.date}
                </span>
                <span className="font-mono text-xs text-white/15">
                  - {featured.readTime}
                </span>
              </div>
              <AnimatedText
                as="h2"
                className="text-3xl font-semibold leading-[1.1] tracking-tight transition duration-300 group-hover:text-white/75 md:text-4xl lg:text-5xl"
                text={featured.title}
              />
              <AnimatedText
                as="p"
                delay={120}
                className="font-mono text-sm leading-relaxed text-white/40"
                lines={[featured.excerpt]}
              />
              <div className="h-px w-10 bg-white/15 transition-all duration-500 group-hover:w-20 group-hover:bg-white/35" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-16 md:py-24">
        <Reveal className="mb-12 flex flex-wrap items-center gap-2 border-b border-white/10 pb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition duration-200 ${
                activeTag === tag
                  ? "border-white/50 bg-white/10 text-white"
                  : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/60"
              }`}
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto hidden font-mono text-xs text-white/15 md:block">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </Reveal>

        {filtered.length === 0 ? (
          <Reveal className="flex justify-center py-24">
            <p className="font-mono text-sm uppercase tracking-widest text-white/20">
              No articles in this category yet.
            </p>
          </Reveal>
        ) : (
          <div className="grid gap-px border border-white/10 bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, index) => (
              <Reveal
                key={post.slug}
                delay={index * 70}
                as={Link}
                to={`/blog/${post.slug}`}
                className="group flex flex-col bg-black/60 transition duration-300 hover:bg-white/[0.03]"
              >
                <div className="aspect-[16/9] overflow-hidden border-b border-white/10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover grayscale opacity-45 transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:opacity-75"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-7">
                  <div className="flex items-center justify-between">
                    <span className="border border-white/10 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-white/25">
                      {post.tag}
                    </span>
                    <span className="font-mono text-xs text-white/15">
                      {post.readTime}
                    </span>
                  </div>

                  <div>
                    <p className="mb-2 font-mono text-xs text-white/20">
                      {post.date}
                    </p>
                    <AnimatedText
                      as="h3"
                      delay={40}
                      className="text-base font-semibold leading-snug tracking-tight transition duration-200 group-hover:text-white/75 md:text-lg"
                      text={post.title}
                    />
                  </div>

                  <AnimatedText
                    as="p"
                    delay={90}
                    className="flex-1 font-mono text-xs leading-relaxed text-white/30"
                    lines={[post.excerpt]}
                  />

                  <div className="flex items-center gap-3 border-t border-white/[0.07] pt-4 font-mono text-xs uppercase tracking-widest text-white/20 transition duration-300 group-hover:text-white/50">
                    <span>Read</span>
                    <div className="h-px w-4 bg-white/15 transition-all duration-500 group-hover:w-10 group-hover:bg-white/40" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
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

        <Reveal className="border border-white/10 transition duration-500 hover:border-white/20">
          <div className="flex flex-col items-start justify-between gap-10 px-8 py-12 md:flex-row md:items-center md:px-14">
            <div className="md:max-w-sm">
              <AnimatedText
                as="p"
                className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-white/20"
                text="Newsletter"
              />
              <AnimatedText
                as="p"
                delay={70}
                className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl"
                text="Stay in the loop."
              />
              <AnimatedText
                as="p"
                delay={130}
                className="font-mono text-sm leading-relaxed text-white/30"
                lines={[
                  "New articles on product, design, and engineering.",
                  "No noise, no spam. Unsubscribe anytime.",
                ]}
              />
            </div>
            <div className="flex w-full flex-col gap-3 md:w-auto">
              <div className="flex w-full items-stretch md:w-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-white/15 border-r-0 bg-white/[0.04] px-5 py-4 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/35 md:w-72"
                />
                <button className="shrink-0 bg-white px-7 py-4 font-mono text-xs uppercase tracking-widest text-black transition duration-200 hover:bg-white/90 active:scale-[0.98]">
                  Subscribe
                </button>
              </div>
              <p className="font-mono text-xs text-white/15">
                Join 12,000+ readers. No spam, ever.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </PageFrame>
  );
}
