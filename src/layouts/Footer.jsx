import { Link } from "react-router-dom";
import { footerLinks } from "../content/staticPages";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-transparent text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full bg-white/4 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-8 border-b border-white/10 py-16 md:flex-row md:items-center md:justify-between md:py-24">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-white/30">
              Start a Project
            </p>
            <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Let&apos;s build something{" "}
              <span className="font-light italic text-white/40">
                remarkable.
              </span>
            </h2>
          </div>

          <a
            href="https://wa.me/2347041078074"
            className="shrink-0 self-start border border-white/20 px-7 py-4 font-mono text-sm uppercase tracking-widest transition duration-300 hover:bg-white hover:text-black md:self-auto"
          >
            Get in Touch
          </a>
        </div>

        <div className="grid grid-cols-2 gap-10 border-b border-white/10 py-16 md:grid-cols-12 md:gap-6 md:py-20">
          <div className="col-span-2 flex flex-col gap-6 md:col-span-4">
            <div>
              <p className="mb-3 font-mono text-xl font-semibold tracking-tight">
                Aquity
              </p>
              <p className="max-w-55 font-mono text-xs leading-relaxed text-white/35">
                A digital product studio building fast, intentional, and
                enduring experiences.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-white/30 transition duration-200 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="font-mono text-xs text-white/30">
                Available for new projects
              </span>
            </div>
          </div>

          <div className="hidden md:col-span-2 md:block" />

          {Object.entries(footerLinks).map(([group, items]) => (
            <div
              key={group}
              className="col-span-1 flex flex-col gap-5 md:col-span-2"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/25">
                {group}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="font-mono text-xs cursor-pointer tracking-wide text-white/45 transition duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <p className="font-mono text-xs tracking-wide text-white/25">
            &copy; {new Date().getFullYear()} Aquity Studio. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="font-mono text-xs text-white/25 transition duration-200 hover:text-white/60"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="font-mono text-xs text-white/25 transition duration-200 hover:text-white/60"
            >
              Terms
            </Link>
            <span className="font-mono text-xs text-white/15">
              Lagos, Nigeria
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
