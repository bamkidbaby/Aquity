import { Link, useParams } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
import Reveal from "../components/Reveal";
import { articles, getArticleBySlug } from "../content/articles";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const relatedArticles = articles
    .filter((entry) => entry.slug !== slug)
    .slice(0, 3);

  if (!article) {
    return (
      <PageFrame glowClassName="left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 bg-white/8">
        <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
          <AnimatedText
            as="p"
            className="font-mono text-xs uppercase tracking-[0.3em] text-white/30"
            text="Article Not Found"
          />
          <AnimatedText
            as="h1"
            className="text-4xl font-semibold tracking-tight md:text-5xl"
            text="This story does not exist yet."
          />
          <Link
            to="/blog"
            className="border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Back to Journal
          </Link>
        </section>
      </PageFrame>
    );
  }

  return (
    <PageFrame glowClassName="left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 bg-amber-200/10">
      <article key={article.slug} className="pb-24 pt-36 md:pt-48">
        <section className="border-b border-white/10 pb-16 md:pb-20">
          <Reveal className="mb-6 flex flex-wrap items-center gap-3">
            <span className="border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/40">
              {article.tag}
            </span>
            <span className="font-mono text-xs text-white/25">{article.date}</span>
            <span className="font-mono text-xs text-white/20">{article.readTime}</span>
          </Reveal>

          <AnimatedText
            as="h1"
            className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
            lines={[article.title]}
          />
          <AnimatedText
            as="p"
            delay={120}
            className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-white/42 md:text-base"
            lines={[article.intro]}
          />
        </section>

        <Reveal className="mt-12 overflow-hidden border border-white/10" delay={120}>
          <img
            src={article.image}
            alt={article.title}
            className="h-[320px] w-full object-cover md:h-[520px]"
          />
        </Reveal>

        <section className="mt-16 grid gap-14">
          {article.sections.map((section, index) => (
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

        <section className="mt-20 border-t border-white/10 pt-10">
          <AnimatedText
            as="p"
            className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
            text="Related Reading"
          />
          <div className="grid gap-px border border-white/10 bg-white/8 md:grid-cols-3">
            {relatedArticles.map((entry, index) => (
              <Reveal
                key={entry.slug}
                delay={index * 70}
                as={Link}
                to={`/blog/${entry.slug}`}
                className="group bg-black/45 p-6 transition duration-300 hover:bg-white/[0.03]"
              >
                <AnimatedText
                  as="p"
                  className="mb-3 font-mono text-xs uppercase tracking-widest text-white/25"
                  text={entry.tag}
                />
                <AnimatedText
                  as="h3"
                  delay={40}
                  className="text-xl font-semibold leading-tight tracking-tight"
                  text={entry.title}
                />
                <AnimatedText
                  as="p"
                  delay={90}
                  className="mt-3 font-mono text-sm leading-relaxed text-white/35"
                  lines={[entry.excerpt]}
                />
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="mt-10 border-t border-white/10 pt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Back to Journal
          </Link>
        </Reveal>
      </article>
    </PageFrame>
  );
}
