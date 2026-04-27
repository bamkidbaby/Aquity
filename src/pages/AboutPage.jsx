import { ArrowUpRight } from "lucide-react";
import CountUp from "react-countup";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import StatGrid from "../components/StatGrid";

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 6, suffix: "+", label: "Years of Experience" },
  { value: 40, suffix: "+", label: "Global Clients" },
];

const values = [
  {
    number: "01",
    title: "Relentless Craft",
    body: "We believe the details are the product. Every margin, every interaction, and every line of code is a deliberate choice because quality is felt before it is understood.",
  },
  {
    number: "02",
    title: "Radical Clarity",
    body: "Complexity is easy. Clarity is hard. We strip every project down to what actually matters, then execute it with precision.",
  },
  {
    number: "03",
    title: "Long-term Thinking",
    body: "We do not build for demos. We build for scale, longevity, and the version of your product that exists three years from now.",
  },
  {
    number: "04",
    title: "True Partnership",
    body: "We embed ourselves in your goals, your constraints, and your vision. When you win, we win.",
  },
];

const team = [
  {
    name: "Peter Bamidele",
    role: "Founder & Creative Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
];

const timeline = [
  {
    year: "2026",
    event:
      "Founded by Peter Bamidele, a teenager with a passion for design and technology.",
  },
];

export default function AboutPage() {
  return (
    <PageFrame glowClassName="left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 bg-cyan-300/10">
      <section className="border-b border-white/10 pb-20 pt-36 md:pb-28 md:pt-48">
        <SectionHeader
          eyebrow="About Aquity"
          title={
            <>
              We build
              <br />
              <span className="font-light italic text-white/35">
                with intent.
              </span>
            </>
          }
          aside={
            <div className="flex flex-col gap-5 pb-2">
              <div className="h-px w-8 bg-white/15" />
              <p className="font-mono text-sm leading-relaxed text-white/40">
                Aquity is a digital product studio based in Lagos, Nigeria. We
                partner with founders and teams to design, engineer, and launch
                products that are fast, focused, and built to last.
              </p>
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 self-start font-mono text-xs uppercase tracking-widest text-white/40 transition duration-300 hover:text-white"
              >
                Start a project
                <ArrowUpRight
                  size={12}
                  className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          }
          titleClassName="text-6xl leading-[0.95] md:text-8xl lg:text-[108px]"
        />
      </section>

      <section className="my-20 md:my-28">
        <StatGrid
          items={stats}
          renderValue={(item) => (
            <>
              <CountUp end={item.value} duration={2} />
              {item.suffix}
            </>
          )}
        />
      </section>

      <section className="grid gap-10 border-b border-white/10 pb-20 md:grid-cols-12 md:gap-16 md:pb-28">
        <Reveal className="md:col-span-5">
          <AnimatedText
            as="p"
            className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
            text="Our Mission"
          />
          <AnimatedText
            as="h2"
            delay={70}
            className="text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl"
            lines={[
              "To make exceptional digital products",
              "accessible to ambitious teams everywhere.",
            ]}
          />
        </Reveal>
        <Reveal
          className="flex flex-col gap-5 md:col-span-7 md:pt-10"
          delay={120}
        >
          <AnimatedText
            as="p"
            className="font-mono text-sm leading-relaxed text-white/45"
            lines={[
              "Most studios optimize for aesthetics. Most agencies optimize for process.",
              "We optimize for outcomes. That means we ask hard questions early, push back when needed, and hold ourselves accountable to the same metrics our clients care about: retention, conversion, adoption, and growth.",
            ]}
          />
          <AnimatedText
            as="p"
            delay={80}
            className="font-mono text-sm leading-relaxed text-white/45"
            lines={[
              "We are a small team by design because the best work comes from focused, senior people who genuinely care about what they are shipping.",
            ]}
          />
        </Reveal>
      </section>

      <section className="border-b border-white/10 py-20 md:py-28">
        <Reveal
          as="p"
          animation="fade-right"
          className="mb-12 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
        >
          What We Stand For
        </Reveal>
        <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
          {values.map((value, index) => (
            <Reveal
              key={value.number}
              delay={index * 80}
              className="group flex flex-col gap-5 bg-black/60 p-8 backdrop-blur-[2px] transition duration-300 hover:bg-white/[0.04] md:p-10"
            >
              <span className="font-mono text-xs text-white/20 transition duration-300 group-hover:text-white/40">
                {value.number}
              </span>
              <div className="h-px w-8 bg-white/15 transition-all duration-500 group-hover:w-16 group-hover:bg-white/40" />
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {value.title}
              </h3>
              <p className="font-mono text-sm leading-relaxed text-white/40">
                {value.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <Reveal
            as="p"
            animation="fade-right"
            className="font-mono text-xs uppercase tracking-[0.25em] text-white/25"
          >
            The Team
          </Reveal>
          <Reveal
            as="p"
            animation="fade-left"
            className="hidden font-mono text-xs text-white/20 md:block"
          >
            Small by design. Senior by default.
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-4">
          {team.map((member, index) => (
            <Reveal
              key={member.name}
              delay={index * 90}
              className="group flex flex-col overflow-hidden bg-black/60"
            >
              <div className="aspect-[3/4] overflow-hidden border-b border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover grayscale opacity-50 transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:opacity-80"
                />
              </div>
              <div className="flex flex-col gap-1 px-5 py-5">
                <p className="text-sm font-semibold tracking-tight">
                  {member.name}
                </p>
                <p className="font-mono text-xs leading-snug text-white/35">
                  {member.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-white/10 py-20 md:py-28">
        <Reveal
          as="p"
          animation="fade-right"
          className="mb-12 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
        >
          Our Story
        </Reveal>
        <div className="flex flex-col">
          {timeline.map((item, index) => (
            <Reveal
              key={item.year}
              delay={index * 70}
              className={`grid grid-cols-12 gap-6 border-t border-white/10 px-2 py-7 transition duration-300 hover:bg-white/[0.02] md:gap-10 ${
                index === timeline.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="col-span-3 pt-0.5 font-mono text-xs text-white/25 md:col-span-2">
                {item.year}
              </span>
              <div className="col-span-1 flex flex-col items-center pt-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
                {index < timeline.length - 1 ? (
                  <div className="mt-2 flex-1 w-px bg-white/8" />
                ) : null}
              </div>
              <p className="col-span-8 font-mono text-sm leading-relaxed text-white/45 md:col-span-9">
                {item.event}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <Reveal className="flex flex-col gap-8 border border-white/10 px-8 py-12 transition duration-500 hover:border-white/20 md:flex-row md:items-center md:justify-between md:px-14">
          <div>
            <AnimatedText
              as="p"
              className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
              text="Work With Us"
            />
            <AnimatedText
              as="h2"
              delay={70}
              className="mb-3 text-2xl font-semibold leading-tight tracking-tight md:text-4xl"
              lines={["Ready to build", "something remarkable?"]}
            />
            <AnimatedText
              as="p"
              delay={130}
              className="font-mono text-sm text-white/35"
              text="We take on 3 projects per quarter. Next slot: June 2025."
            />
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <a
              href="/contact"
              className="group flex items-center gap-3 border border-white/20 px-8 py-4 font-mono text-sm uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Start a Project
              <ArrowUpRight
                size={13}
                className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="https://wa.me/2347041078074"
              className="text-center font-mono text-xs uppercase tracking-widest text-white/25 transition duration-200 hover:text-white/60"
            >
              Or message us on WhatsApp &rarr;
            </a>
          </div>
        </Reveal>
      </section>
    </PageFrame>
  );
}
