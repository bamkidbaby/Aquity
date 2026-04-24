import CountUp from "react-countup";

export default function About() {
  const stats = [
    { value: <CountUp end={120} />, suffix: "+", label: "Projects Delivered" },
    { value: <CountUp end={98} />, suffix: "%", label: "Client Satisfaction" },
    { value: <CountUp end={6} />, suffix: "+", label: "Years of Experience" },
    { value: <CountUp end={40} />, suffix: "+", label: "Global Clients" },
  ];

  const pillars = [
    {
      number: "01",
      title: "Strategy First",
      body: "Every product starts with a clear understanding of your goals, your users, and the market you're entering.",
    },
    {
      number: "02",
      title: "Craft at Every Layer",
      body: "From architecture to animation, we hold every detail to the same standard — because quality compounds.",
    },
    {
      number: "03",
      title: "Built to Scale",
      body: "We build with growth in mind from day one. Clean code, solid foundations, systems that don't break under pressure.",
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-black text-white overflow-hidden"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full bg-white/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-40">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/40 mb-5">
            Who We Are
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight max-w-2xl">
              We turn ideas into{" "}
              <span className="italic font-light text-white/60">
                lasting products.
              </span>
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-sm font-mono">
              Aquity is a digital product studio. We design, build, and launch
              experiences that are fast, intentional, and built to endure.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-20 md:mb-28">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-black px-6 py-8 md:py-10 flex flex-col gap-2 hover:bg-white/3 transition duration-300"
            >
              <span className="text-3xl md:text-4xl font-semibold tracking-tight">
                {s.value} {s.suffix}
              </span>
              <span className="text-white/40 text-xs font-mono uppercase tracking-widest">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="mb-20 md:mb-28">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/40 mb-10">
            How We Work
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {pillars.map((p) => (
              <div
                key={p.number}
                className="bg-black p-8 md:p-10 flex flex-col gap-5 hover:bg-white/3 transition duration-300 group"
              >
                <span className="font-mono text-xs text-white/20 group-hover:text-white/40 transition duration-300">
                  {p.number}
                </span>
                <div className="w-8 h-px bg-white/20 group-hover:w-14 group-hover:bg-white/50 transition-all duration-500" />
                <h3 className="text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-mono">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="border border-white/10 px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/20 transition duration-500">
          <div>
            <p className="text-lg md:text-xl font-semibold tracking-tight mb-1">
              Ready to build something?
            </p>
            <p className="text-white/40 text-sm font-mono">
              Let's talk about your next project.
            </p>
          </div>
          <a
            href="https://wa.me/2347041078074"
            className="shrink-0 px-7 py-3 border border-white/30 text-sm font-mono uppercase tracking-widest text-white/80 hover:bg-white hover:text-black transition duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}
