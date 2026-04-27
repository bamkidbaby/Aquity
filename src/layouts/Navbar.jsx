import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({ to, children }) {
  const { pathname } = useLocation();
  const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`transition duration-200 hover:text-white uppercase text-xs tracking-widest font-mono ${
        isActive ? "text-white" : "text-white/50"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({ to, children, onClick }) {
  const { pathname } = useLocation();
  const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-xs uppercase tracking-widest font-mono py-4 border-b border-white/10 transition duration-200 hover:text-white flex items-center justify-between ${
        isActive ? "text-white" : "text-white/50"
      }`}
    >
      {children}
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
      )}
    </Link>
  );
}

const routes = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full absolute top-0 left-0 z-50 px-6 md:px-12 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between text-white font-mono text-sm tracking-wide">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold hover:text-white/80 transition duration-200"
          >
            Aquity
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 md:gap-10">
            {routes.map((r) => (
              <NavLink key={r.to} to={r.to}>
                {r.label}
              </NavLink>
            ))}

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs uppercase tracking-widest text-white/50 transition hover:text-white"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="border border-white/20 bg-white/10 px-3 py-2 text-xs uppercase tracking-widest text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[4.5px] p-1 z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-[22px] h-[1.5px] bg-white rounded transition-transform duration-300 origin-center ${
                isOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-[22px] h-[1.5px] bg-white rounded transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-[22px] h-[1.5px] bg-white rounded transition-transform duration-300 origin-center ${
                isOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 md:hidden backdrop-blur-xl bg-black/85 border-b border-white/10 px-6 pt-20 pb-8 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {routes.map((r) => (
          <MobileLink key={r.to} to={r.to} onClick={() => setIsOpen(false)}>
            {r.label}
          </MobileLink>
        ))}

        <div className="grid gap-3 pt-5 font-mono text-xs uppercase tracking-widest">
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="border border-white/10 px-4 py-3 text-white/70 transition duration-200 hover:border-white/25 hover:text-white"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="border border-white/20 bg-white px-4 py-3 text-center text-black transition duration-200 hover:bg-white/90"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
