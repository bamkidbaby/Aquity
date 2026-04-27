import Reveal from "./Reveal";

export default function StatGrid({
  items,
  columns = "md:grid-cols-4",
  className = "",
  cardClassName = "",
  renderValue,
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-px border border-white/10 bg-white/10 ${columns} ${className}`}
    >
      {items.map((item, index) => (
        <Reveal
          key={item.label}
          delay={index * 80}
          className={`flex flex-col gap-2 bg-black/60 px-6 py-8 backdrop-blur-[2px] transition duration-300 hover:bg-white/[0.05] md:py-10 ${cardClassName}`}
        >
          <span className="text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">
            {renderValue ? renderValue(item) : item.value}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-white/32">
            {item.label}
          </span>
        </Reveal>
      ))}
    </div>
  );
}
