import { Link } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
import Reveal from "../components/Reveal";

const benefits = [
  {
    title: "Centralized communication",
    body: "Keep project context, approvals, and milestones inside one calm workspace.",
  },
  {
    title: "Faster feedback loops",
    body: "Comment on work in context and move decisions forward without scattered threads.",
  },
  {
    title: "More visibility",
    body: "See status, next steps, and project health without asking for updates.",
  },
];

export default function SignupPage() {
  return (
    <PageFrame glowClassName="left-[38%] top-0 h-[460px] w-[760px] -translate-x-1/2 bg-fuchsia-300/10">
      <section className="grid min-h-screen items-center gap-12 pt-28 pb-16 md:grid-cols-12 md:gap-10 md:pt-36">
        <Reveal className="md:col-span-6">
          <AnimatedText
            as="p"
            className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-white/30"
            text="Create Account"
          />
          <AnimatedText
            as="h1"
            className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
            lines={["Build a calmer", "client experience."]}
          />
          <AnimatedText
            as="p"
            delay={120}
            className="mt-6 max-w-md font-mono text-sm leading-relaxed text-white/42 md:text-base"
            lines={[
              "Set up your account to manage projects, keep communication focused, and give clients a more confident experience from day one.",
            ]}
          />

          <div className="mt-10 grid gap-px border border-white/10 bg-white/10">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.title}
                delay={index * 70}
                className="bg-black/50 px-5 py-5"
              >
                <AnimatedText
                  as="h3"
                  className="text-lg font-semibold tracking-tight"
                  text={benefit.title}
                />
                <AnimatedText
                  as="p"
                  delay={60}
                  className="mt-2 font-mono text-sm leading-relaxed text-white/38"
                  lines={[benefit.body]}
                />
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={120}
          className="md:col-span-6"
        >
          <div className="border border-white/10 bg-black/45 p-8 backdrop-blur-md md:p-10">
            <AnimatedText
              as="h2"
              className="text-2xl font-semibold tracking-tight"
              text="Get started"
            />
            <AnimatedText
              as="p"
              delay={60}
              className="mt-2 font-mono text-sm text-white/35"
              text="Create your workspace and invite your team later."
            />

            <form className="mt-8 grid gap-5">
              <div className="grid gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="border border-white/12 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/30"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  className="border border-white/12 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/30"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="border border-white/12 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/30"
                />
              </div>

              <Link
                to="/dashboard"
                className="mt-2 border border-white/20 bg-white px-5 py-3 font-mono text-xs uppercase tracking-widest text-black transition duration-300 hover:bg-white/90"
              >
                Create Account
              </Link>
            </form>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <span className="font-mono text-xs text-white/25">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="font-mono text-xs uppercase tracking-widest text-white/65 transition duration-200 hover:text-white"
              >
                Sign in
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PageFrame>
  );
}
