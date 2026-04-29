import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
import Reveal from "../components/Reveal";
import { login } from "../lib/api";
import { storeSession } from "../lib/auth";
import { validateEmail } from "../lib/validation";

const highlights = [
  "Track project status and milestones in one place.",
  "Review deliverables, notes, and approvals without email clutter.",
  "Keep client communication and decisions organized by project.",
];

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
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
    if (!validateEmail(form.email) || form.password.length < 8) {
      setError("Enter a valid email and password.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = await login(form);
      storeSession(payload);
      navigate(location.state?.from ?? "/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFrame glowClassName="left-[62%] top-0 h-[460px] w-[760px] -translate-x-1/2 bg-cyan-300/10">
      <section className="grid min-h-screen items-center gap-12 pt-28 pb-16 md:grid-cols-12 md:gap-10 md:pt-36">
        <Reveal className="md:col-span-5">
          <AnimatedText
            as="p"
            className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-white/30"
            text="Client Portal"
          />
          <AnimatedText
            as="h1"
            className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
            lines={["Welcome back to your workspace."]}
          />
          <AnimatedText
            as="p"
            delay={120}
            className="mt-6 max-w-md font-mono text-sm leading-relaxed text-white/42 md:text-base"
            lines={[
              "Sign in to view project progress, review decisions, and keep every conversation anchored to the work.",
            ]}
          />

          <div className="mt-10 grid gap-px border border-white/10 bg-white/10">
            {highlights.map((item, index) => (
              <Reveal
                key={item}
                delay={index * 70}
                className="bg-black/50 px-5 py-4 font-mono text-sm leading-relaxed text-white/42"
              >
                {item}
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="md:col-span-7 md:col-start-7">
          <div className="border border-white/10 bg-black/45 p-8 backdrop-blur-md md:p-10">
            <AnimatedText
              as="h2"
              className="text-2xl font-semibold tracking-tight"
              text="Sign in"
            />
            <AnimatedText
              as="p"
              delay={60}
              className="mt-2 font-mono text-sm text-white/35"
              text="Access your projects, approvals, and updates."
            />

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-2">
                <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="border border-white/12 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none transition duration-200 placeholder:text-white/15 focus:border-white/30"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-white/25">
                    Password
                  </label>
                  <button
                    type="button"
                    className="font-mono text-xs text-white/25 transition duration-200 hover:text-white/60"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Enter your password"
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
              </div>

              {error ? (
                <p className="font-mono text-xs text-red-300">{error}</p>
              ) : null}

              <button
                type="submit"
                className="mt-2 border border-white/20 bg-white px-5 py-3 font-mono text-xs uppercase tracking-widest text-black transition duration-300 hover:bg-white/90"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <span className="font-mono text-xs text-white/25">New here?</span>
              <Link
                to="/signup"
                className="font-mono text-xs uppercase tracking-widest text-white/65 transition duration-200 hover:text-white"
              >
                Create account
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PageFrame>
  );
}
