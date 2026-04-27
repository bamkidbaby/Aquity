import CountUp from "react-countup";
import AnimatedText from "../components/AnimatedText";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import StatGrid from "../components/StatGrid";

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 6, suffix: "+", label: "Years of Experience" },
  { value: 40, suffix: "+", label: "Global Clients" },
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
    body: "From architecture to animation, we hold every detail to the same standard because quality compounds.",
  },
  {
    number: "03",
    title: "Built to Scale",
    body: "We build with growth in mind from day one. Clean code, solid foundations, and systems that do not break under pressure.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-transparent text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-150 w-150 -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <div className="mb-20 md:mb-28">
          <SectionHeader
            eyebrow="Who We Are"
            title={
              <>
                We turn ideas into{" "}
                <span className="font-light italic text-white/60">
                  lasting products.
                </span>
              </>
            }
            description="Aquity is a digital product studio. We design, build, and launch experiences that are fast, intentional, and built to endure."
          />
        </div>

        <StatGrid
          className="mb-20 md:mb-28"
          items={stats}
          renderValue={(item) => (
            <>
              <CountUp end={item.value} duration={2} /> {item.suffix}
            </>
          )}
        />

        <div className="mb-20 md:mb-28">
          <AnimatedText
            as="p"
            animation="fade-right"
            className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-white/40"
            text="How We Work"
          />
          <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.number}
                delay={index * 80}
                className="group flex flex-col gap-5 bg-black/60 p-8 backdrop-blur-[2px] transition duration-300 hover:bg-white/[0.04] md:p-10"
              >
                <span className="font-mono text-xs text-white/20 transition duration-300 group-hover:text-white/40">
                  {pillar.number}
                </span>
                <div className="h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-14 group-hover:bg-white/50" />
                <AnimatedText
                  as="h3"
                  delay={40}
                  className="text-lg font-semibold tracking-tight"
                  text={pillar.title}
                />
                <AnimatedText
                  as="p"
                  delay={90}
                  className="font-mono text-sm leading-relaxed text-white/50"
                  lines={[pillar.body]}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="flex flex-col gap-6 border border-white/10 px-8 py-10 transition duration-500 hover:border-white/20 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <AnimatedText
              as="p"
              className="mb-1 text-lg font-semibold tracking-tight md:text-xl"
              text="Ready to build something?"
            />
            <AnimatedText
              as="p"
              delay={80}
              className="font-mono text-sm text-white/40"
              text="Let's talk about your next project."
            />
          </div>
          <a
            href="https://wa.me/2347041078074"
            className="shrink-0 border border-white/30 px-7 py-3 font-mono text-sm uppercase tracking-widest text-white/80 transition duration-300 hover:bg-white hover:text-black"
          >
            Get in Touch
          </a>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}
