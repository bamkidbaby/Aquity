import { Link } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
import Reveal from "../components/Reveal";

const projectCards = [
  {
    name: "Aquity Website Refresh",
    status: "In Progress",
    progress: "72%",
    update: "Hero direction approved. Content and dashboard flow are next.",
  },
  {
    name: "Client Portal Foundation",
    status: "Planning",
    progress: "28%",
    update: "Auth journey is scaffolded. Project navigation and permissions are pending.",
  },
  {
    name: "Journal Content System",
    status: "Active",
    progress: "64%",
    update: "Articles and route structure are live. Editorial polish continues.",
  },
];

const activity = [
  "New article pages added for every journal slug.",
  "Footer links now point to real destination pages.",
  "Route transitions now reset scroll and refresh animations.",
];

export default function DashboardPage() {
  return (
    <PageFrame glowClassName="left-1/2 top-0 h-[460px] w-[860px] -translate-x-1/2 bg-sky-300/8">
      <section className="pb-16 pt-36 md:pt-48">
        <Reveal className="flex flex-col gap-6 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <AnimatedText
              as="p"
              className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-white/30"
              text="Dashboard"
            />
            <AnimatedText
              as="h1"
              className="text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
              lines={["A clearer view of", "projects and progress."]}
            />
          </div>
          <AnimatedText
            as="p"
            delay={120}
            className="max-w-sm font-mono text-sm leading-relaxed text-white/40"
            lines={[
              "A client-facing workspace for updates, approvals, deliverables, and the next actions that matter.",
            ]}
          />
        </Reveal>
      </section>

      <section className="grid gap-10 pb-24 md:grid-cols-12">
        <div className="grid gap-px border border-white/10 bg-white/10 md:col-span-8">
          {projectCards.map((project, index) => (
            <Reveal
              key={project.name}
              delay={index * 70}
              className="grid gap-4 bg-black/45 p-6 backdrop-blur-md md:grid-cols-[1.4fr_0.7fr_0.5fr]"
            >
              <div>
                <AnimatedText
                  as="h2"
                  className="text-xl font-semibold tracking-tight"
                  text={project.name}
                />
                <AnimatedText
                  as="p"
                  delay={60}
                  className="mt-2 font-mono text-sm leading-relaxed text-white/38"
                  lines={[project.update]}
                />
              </div>
              <div className="grid gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Status
                </span>
                <span className="text-sm text-white/75">{project.status}</span>
              </div>
              <div className="grid gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Progress
                </span>
                <span className="text-sm text-white/75">{project.progress}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-8 md:col-span-4">
          <Reveal className="border border-white/10 bg-black/45 p-6 backdrop-blur-md">
            <AnimatedText
              as="p"
              className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
              text="Recent Activity"
            />
            <div className="grid gap-4">
              {activity.map((item, index) => (
                <AnimatedText
                  key={item}
                  as="p"
                  delay={index * 70}
                  className="font-mono text-sm leading-relaxed text-white/38"
                  lines={[item]}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="border border-white/10 bg-black/45 p-6 backdrop-blur-md">
            <AnimatedText
              as="p"
              className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
              text="Quick Actions"
            />
            <div className="grid gap-3">
              <Link
                to="/contact"
                className="border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Start New Request
              </Link>
              <Link
                to="/blog"
                className="border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Read Journal
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageFrame>
  );
}
