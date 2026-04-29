import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
import Reveal from "../components/Reveal";
import { signup } from "../lib/api";
import { storeSession } from "../lib/auth";
import {
  passwordRules,
  validateEmail,
  validateName,
  validatePassword,
} from "../lib/validation";

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
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateName(form.fullName)) {
      setError("Enter your full name.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Enter a valid work email.");
      return;
    }

    if (!validatePassword(form.password)) {
      setError("Password must meet all security requirements.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = await signup(form);
      storeSession(payload);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className="border border-white/12 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/30"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Work Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="jane@company.com"
                  className="border border-white/12 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/30"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="w-full border border-white/12 bg-white/[0.03] px-4 py-3 pr-14 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/28 transition duration-200 hover:text-white/72"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="grid gap-1 pt-1">
                  {passwordRules.map((rule) => (
                    <p key={rule} className="font-mono text-[11px] text-white/25">
                      {rule}
                    </p>
                  ))}
                </div>
              </div>

              {error ? (
                <p className="font-mono text-xs text-red-300">{error}</p>
              ) : null}

              <button
                type="submit"
                className="mt-2 border border-white/20 bg-white px-5 py-3 font-mono text-xs uppercase tracking-widest text-black transition duration-300 hover:bg-white/90"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
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
