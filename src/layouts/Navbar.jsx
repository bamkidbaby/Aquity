import { useState } from "react";
import NavLink from "../components/NavLink";

function MobileLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-white/80 hover:text-white text-xs uppercase tracking-widest font-mono py-4 border-b border-white/10 transition duration-200"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full absolute top-0 left-0 z-50 px-6 md:px-12 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between text-white font-mono text-sm tracking-wide">
          <div className="text-xl md:text-xl font-semibold">Aquity</div>

          <div className="hidden md:flex items-center gap-8 md:gap-10 uppercase text-xs md:text-sm">
            <NavLink href="#blog">Blog</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact Us</NavLink>

            <div className="flex items-center gap-3">
              <button className="px-2 py-1 bg-white/20 border border-white/20 rounded-sm backdrop-blur-sm">
                EN
              </button>
              <span className="text-white/60">/</span>
              <button className="text-white/70 hover:text-white transition">
                FR
              </button>
            </div>
          </div>

          <button
            className="md:hidden flex flex-col gap-[4.5px] p-1 z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5.5 h-[1.5px] bg-white rounded transition-transform duration-300 origin-center ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5.5 h-[1.5px] bg-white rounded transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5.5 h-[1.5px] bg-white rounded transition-transform duration-300 origin-center ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        className={`fixed top-0 left-0 right-0 z-40 md:hidden backdrop-blur-xl bg-black/80 border-b border-white/10 px-6 pt-20 pb-8 flex flex-col gap-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <MobileLink href="#blog" onClick={() => setIsOpen(false)}>
          Blog
        </MobileLink>
        <MobileLink href="#about" onClick={() => setIsOpen(false)}>
          About
        </MobileLink>
        <MobileLink href="#contact" onClick={() => setIsOpen(false)}>
          Contact Us
        </MobileLink>

        <div className="flex items-center gap-3 pt-5 text-xs uppercase tracking-widest font-mono">
          <button className="px-2 py-1 bg-white/20 border border-white/20 rounded-sm backdrop-blur-sm text-white">
            EN
          </button>
          <span className="text-white/40">/</span>
          <button className="text-white/50 hover:text-white transition">
            FR
          </button>
        </div>
      </div>
    </>
  );
}
