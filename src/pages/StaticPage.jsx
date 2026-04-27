import { Link, useLocation } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
import Reveal from "../components/Reveal";
import { staticPages } from "../content/staticPages";

export default function StaticPage() {
  const { pathname } = useLocation();
  const page = Object.values(staticPages).find((entry) => entry.path === pathname);

  if (!page) {
    return (
      <PageFrame glowClassName="left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 bg-white/8">
        <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
          <AnimatedText
            as="p"
            className="font-mono text-xs uppercase tracking-[0.3em] text-white/30"
            text="Page Not Found"
          />
          <AnimatedText
            as="h1"
            className="text-4xl font-semibold tracking-tight md:text-5xl"
            text="This page is not available."
          />
          <Link
            to="/"
            className="border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Back Home
          </Link>
        </section>
      </PageFrame>
    );
  }

  return (
    <PageFrame glowClassName="left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 bg-white/8">
      <article key={page.path} className="pb-24 pt-36 md:pt-48">
        <section className="border-b border-white/10 pb-16 md:pb-20">
          <AnimatedText
            as="p"
            className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-white/35"
            text={page.eyebrow}
          />
          <AnimatedText
            as="h1"
            className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
            lines={page.titleLines}
          />
          <AnimatedText
            as="p"
            delay={120}
            className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-white/42 md:text-base"
            lines={[page.intro]}
          />
        </section>

        <section className="mt-16 grid gap-14">
          {page.sections.map((section, index) => (
            <Reveal
              key={section.heading}
              delay={index * 80}
              className="grid gap-6 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-4">
                <AnimatedText
                  as="h2"
                  className="text-2xl font-semibold tracking-tight md:text-3xl"
                  lines={[section.heading]}
                />
              </div>
              <div className="grid gap-5 md:col-span-8">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <AnimatedText
                    key={paragraphIndex}
                    as="p"
                    delay={paragraphIndex * 70}
                    className="font-mono text-sm leading-8 text-white/44 md:text-base"
                    lines={[paragraph]}
                  />
                ))}
              </div>
            </Reveal>
          ))}
        </section>

        <Reveal className="mt-20 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-8 border border-white/10 bg-black/35 p-8 backdrop-blur-md md:flex-row md:items-center md:justify-between">
            <div>
              <AnimatedText
                as="p"
                className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
                text="Next Step"
              />
              <AnimatedText
                as="h2"
                delay={60}
                className="text-2xl font-semibold tracking-tight md:text-3xl"
                lines={["Want to turn this into", "a live engagement?"]}
              />
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                to="/contact"
                className="border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Start a Project
              </Link>
              <Link
                to="/signup"
                className="font-mono text-xs uppercase tracking-widest text-white/35 transition duration-200 hover:text-white/65"
              >
                Explore client portal
              </Link>
            </div>
          </div>
        </Reveal>
      </article>
    </PageFrame>
  );
}
