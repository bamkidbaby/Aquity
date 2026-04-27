import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";

const budgets = ["< $5k", "$5k - $15k", "$15k - $50k", "$50k+"];
const types = ["Website", "Web App", "Branding", "Strategy", "Other"];

const contactMethods = [
  {
    label: "WhatsApp",
    value: "+234 704 107 8074",
    href: "https://wa.me/2347041078074",
  },
  {
    label: "Email",
    value: "hello@aquity.io",
    href: "mailto:hello@aquity.io",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    type: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handle = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const setField = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));

  const resetForm = () => {
    setSent(false);
    setForm({
      name: "",
      email: "",
      budget: "",
      type: "",
      message: "",
    });
  };

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <PageFrame glowClassName="left-[60%] top-6 h-[420px] w-[700px] -translate-x-1/2 bg-sky-300/10">
      <section className="border-b border-white/10 pb-16 pt-36 md:pb-20 md:pt-48">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let's build
              <br />
              <span className="font-light italic text-white/35">
                something.
              </span>
            </>
          }
          description="Tell us about your project. We'll get back to you within one business day."
          titleClassName="text-5xl leading-[0.97] md:text-7xl lg:text-8xl"
        />
      </section>

      <section className="grid gap-16 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="flex flex-col gap-12 md:col-span-4">
          <div className="flex flex-col gap-6">
            <Reveal
              as="p"
              animation="fade-right"
              className="font-mono text-xs uppercase tracking-[0.25em] text-white/25"
            >
              Direct
            </Reveal>
            {contactMethods.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 90}
                as="a"
                href={item.href}
                className="group flex items-center justify-between border border-white/10 px-5 py-4 transition duration-300 hover:border-white/25 hover:bg-white/[0.03]"
              >
                <div>
                  <p className="mb-1 font-mono text-xs uppercase tracking-widest text-white/30">
                    {item.label}
                  </p>
                  <p className="font-mono text-sm text-white/70 transition duration-200 group-hover:text-white">
                    {item.value}
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-white/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60"
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/25">
              Availability
            </p>
            <div className="flex flex-col gap-3 border border-white/10 px-5 py-5 backdrop-blur-[2px]">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="font-mono text-xs text-white/50">
                  Available for new projects
                </span>
              </div>
              <p className="font-mono text-xs leading-relaxed text-white/25">
                Next available slot: June 2025. Limited capacity, we take on 3
                projects per quarter.
              </p>
            </div>
          </Reveal>

          <Reveal className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/25">
              Location
            </p>
            <div className="border border-white/10 px-5 py-5 backdrop-blur-[2px]">
              <p className="font-mono text-sm text-white/50">Lagos, Nigeria</p>
              <p className="mt-1 font-mono text-xs text-white/25">
                Working with clients globally
              </p>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          {sent ? (
            <Reveal className="flex h-full flex-col items-start justify-center gap-5 border border-white/10 px-8 py-16 md:px-12">
              <div className="h-px w-8 bg-white/20" />
              <AnimatedText
                as="h2"
                className="text-2xl font-semibold tracking-tight md:text-3xl"
                text="Message received."
              />
              <AnimatedText
                as="p"
                delay={90}
                className="max-w-sm font-mono text-sm leading-relaxed text-white/40"
                lines={[
                  "Thanks for reaching out. We'll review your project details and get back to you within one business day.",
                ]}
              />
              <button
                onClick={resetForm}
                className="mt-4 font-mono text-xs uppercase tracking-widest text-white/30 transition duration-200 hover:text-white"
              >
                Send another &rarr;
              </button>
            </Reveal>
          ) : (
            <Reveal
              as="form"
              onSubmit={submit}
              className="flex flex-col border border-white/10"
            >
              <div className="grid gap-px bg-white/10 md:grid-cols-2">
                {[
                  { label: "Name", name: "name", placeholder: "John Doe" },
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                    placeholder: "you@company.com",
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className="flex flex-col gap-2 bg-black/60 px-6 py-5 backdrop-blur-[2px]"
                  >
                    <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type ?? "text"}
                      value={form[field.name]}
                      onChange={handle}
                      required
                      placeholder={field.placeholder}
                      className="border-b border-white/10 bg-transparent pb-2 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/30"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Budget Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((budget) => (
                    <button
                      type="button"
                      key={budget}
                      onClick={() => setField("budget", budget)}
                      className={`px-4 py-1.5 font-mono text-xs border transition duration-200 ${
                        form.budget === budget
                          ? "border-white/50 bg-white/10 text-white"
                          : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/60"
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setField("type", type)}
                      className={`px-4 py-1.5 font-mono text-xs border transition duration-200 ${
                        form.type === type
                          ? "border-white/50 bg-white/10 text-white"
                          : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/60"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-5">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Tell us about your project
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  required
                  rows={5}
                  placeholder="Describe what you're building, your timeline, and any context that helps..."
                  className="resize-none border-b border-white/10 bg-transparent pb-2 font-mono text-sm leading-relaxed text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/30"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-5">
                <p className="font-mono text-xs text-white/20">
                  We respond within 1 business day.
                </p>
                <button
                  type="submit"
                  className="group flex items-center gap-3 border border-white/20 px-7 py-3 font-mono text-sm uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
                >
                  Send Message
                  <ArrowUpRight
                    size={13}
                    className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </PageFrame>
  );
}
