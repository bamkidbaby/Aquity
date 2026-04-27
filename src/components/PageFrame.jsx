import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

export default function PageFrame({
  children,
  glowClassName = "left-1/2 top-0 h-[440px] w-[820px] -translate-x-1/2 bg-[#7dd3fc]/10",
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.95) 1px, transparent 0)",
          backgroundSize: "34px 34px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.95) 18%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div
        className={`pointer-events-none fixed z-0 rounded-full blur-[140px] ${glowClassName}`}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {children}
      </div>

      <Footer />
    </div>
  );
}
