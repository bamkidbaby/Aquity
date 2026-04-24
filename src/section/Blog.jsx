import CountUp from "react-countup";

const posts = [
  {
    slug: "strategy-before-design",
    tag: "Strategy",
    date: "Apr 12, 2025",
    title: "Why Strategy Comes Before Design",
    excerpt:
      "Most teams rush to Figma before they understand the problem. Here's why the most successful products start with a blank doc, not a blank canvas.",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
  {
    slug: "craft-at-every-layer",
    tag: "Engineering",
    date: "Mar 28, 2025",
    title: "Craft at Every Layer of the Stack",
    excerpt:
      "Great software isn't just beautiful on the surface. We break down how intentional decisions at every level define product quality.",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    slug: "building-to-scale",
    tag: "Architecture",
    date: "Mar 10, 2025",
    title: "Built to Scale: What That Actually Means",
    excerpt:
      '"Scalable" is one of the most overused words in tech. We define what it means in practice and how we engineer for growth from day one.',
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
  },
  {
    slug: "digital-experience-west-africa",
    tag: "Industry",
    date: "Feb 22, 2025",
    title: "The State of Digital Experience in West Africa",
    excerpt:
      "Users across West Africa are more demanding than ever. We explore the trends shaping digital product expectations and what studios need to do to keep up.",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
  },
  {
    slug: "launch-fast-or-launch-right",
    tag: "Product",
    date: "Feb 5, 2025",
    title: "Launch Fast or Launch Right?",
    excerpt:
      "The MVP debate never dies. We share our take on when speed matters, when it costs you, and how to find the balance that fits your stage.",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    slug: "client-collaboration-framework",
    tag: "Process",
    date: "Jan 18, 2025",
    title: "How We Run Client Collaboration at Aquity",
    excerpt:
      "Transparency, async communication, and shared ownership. A look inside the process that keeps our projects on time and our clients in the loop.",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  },
];

const tags = [
  "All",
  "Strategy",
  "Engineering",
  "Architecture",
  "Industry",
  "Product",
  "Process",
];

export default function Blog() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div id="blog" className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 rounded-full bg-white/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Page header */}
        <div className="pt-36 md:pt-48 pb-16 md:pb-20 border-b border-white/10">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/30 mb-6">
            Aquity — Journal
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.02] tracking-tight">
              Ideas &{" "}
              <span className="italic font-light text-white/40">Insights.</span>
            </h1>
            <div className="md:max-w-xs">
              <div className="w-8 h-px bg-white/20 mb-4" />
              <p className="text-white/40 text-sm font-mono leading-relaxed">
                Thoughts on product, design, engineering, and building things
                that endure in a fast-moving world.
              </p>
            </div>
          </div>
        </div>

        {/* Tag filter */}
        <div className="flex items-center gap-2 flex-wrap py-7 border-b border-white/10">
          {tags.map((tag, i) => (
            <button
              key={tag}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest border transition duration-200 ${
                i === 0
                  ? "border-white/40 text-white bg-white/8"
                  : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"
              }`}
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-white/20 hidden md:block">
            {posts.length} articles
          </span>
        </div>

        {/* Featured post */}
        <div className="py-16 md:py-24 border-b border-white/10 group cursor-pointer">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/25 mb-8">
            Featured Article
          </p>
          <div className="flex flex-col md:flex-row md:items-stretch gap-10 md:gap-16">
            {/* Text */}
            <div className="md:w-5/12 flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 border border-white/15 px-3 py-1">
                    {featured.tag}
                  </span>
                  <span className="text-xs font-mono text-white/25">
                    {featured.date}
                  </span>
                  <span className="text-xs font-mono text-white/20">
                    · {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-tight mb-5 group-hover:text-white/80 transition duration-300">
                  {featured.title}
                </h2>
                <p className="text-white/45 text-sm font-mono leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/30 group-hover:text-white/60 transition duration-300">
                <span>Read Article</span>
                <div className="h-px bg-white/25 w-6 group-hover:w-14 group-hover:bg-white/50 transition-all duration-500" />
              </div>
            </div>

            {/* Featured image — Unsplash link */}
            <div className="md:w-7/12 aspect-16/10 md:aspect-auto overflow-hidden border border-white/10 group-hover:border-white/20 transition duration-300">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt={featured.title}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 group-hover:grayscale-0 transition duration-700 scale-100 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* Post grid */}
        <div className="py-16 md:py-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/25 mb-10">
            Latest Articles
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.07] border border-white/10">
            {rest.map((post) => (
              <div
                key={post.slug}
                className="bg-black flex flex-col group cursor-pointer hover:bg-white/2.5 transition duration-300"
              >
                {/* Card image */}
                <div className="aspect-video overflow-hidden border-b border-white/10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-75 group-hover:grayscale-0 transition duration-700 scale-100 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Card content */}
                <div className="p-7 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/30 border border-white/10 px-2 py-0.5">
                      {post.tag}
                    </span>
                    <span className="text-xs font-mono text-white/20">
                      {post.readTime}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/20 mb-2.5">
                      {post.date}
                    </p>
                    <h3 className="text-base md:text-lg font-semibold leading-snug tracking-tight group-hover:text-white/80 transition duration-200">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-white/35 text-xs font-mono leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-white/20 group-hover:text-white/50 transition duration-300 pt-4 border-t border-white/8">
                    <span>Read Article</span>
                    <div className="w-4 h-px bg-white/15 group-hover:w-8 group-hover:bg-white/40 transition-all duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-16 md:mb-20" />

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-16 md:mb-20">
          {[
            { end: 6, suffix: "+", label: "Articles Published" },
            { end: 4, suffix: "", label: "Topics Covered" },
            { end: 12, suffix: "k+", label: "Monthly Readers" },
            { end: 2025, suffix: "", label: "Est. Year" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-black px-6 py-8 md:py-10 flex flex-col gap-2 hover:bg-white/2.5 transition duration-300"
            >
              <span className="text-2xl md:text-3xl font-semibold tracking-tight tabular-nums">
                <CountUp end={s.end} duration={2} />
                {s.suffix}
              </span>
              <span className="text-white/30 text-xs font-mono uppercase tracking-widest">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="border border-white/10 hover:border-white/20 transition duration-500 mb-20">
          <div className="px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/25 mb-3">
                Newsletter
              </p>
              <p className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
                Stay in the loop.
              </p>
              <p className="text-white/35 text-sm font-mono">
                New articles on product, design and engineering — no noise, no
                spam.
              </p>
            </div>
            <div className="flex items-stretch w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/5 border border-white/15 border-r-0 text-white text-sm font-mono px-5 py-3.5 outline-none placeholder:text-white/20 w-full md:w-64 focus:border-white/35 transition duration-200"
              />
              <button className="shrink-0 px-6 py-3.5 bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-white/90 active:scale-[0.98] transition duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </div>
  );
}
