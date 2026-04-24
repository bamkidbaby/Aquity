export default function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-white/50 hover:text-white transition duration-300"
    >
      {" "}
      {children}{" "}
    </a>
  );
}
