import AnimatedText from "./AnimatedText";
import Reveal from "./Reveal";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  titleAs: TitleTag = "h2",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  aside,
}) {
  return (
    <div
      className={`flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${className}`}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <AnimatedText
            as="p"
            animation="fade-right"
            className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-white/35"
            text={eyebrow}
          />
        ) : null}
        <Reveal
          as={TitleTag}
          className={`text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl lg:text-7xl ${titleClassName}`}
        >
          {title}
        </Reveal>
      </div>

      {aside ? (
        <Reveal
          animation="fade-left"
          delay={120}
          className="md:max-w-sm"
        >
          {aside}
        </Reveal>
      ) : description ? (
        <Reveal
          animation="fade-left"
          delay={120}
          className={`md:max-w-sm ${descriptionClassName}`}
        >
          <div className="mb-4 h-px w-8 bg-white/15" />
          <AnimatedText
            as="p"
            delay={140}
            className="font-mono text-sm leading-relaxed text-white/42"
            lines={[description]}
          />
        </Reveal>
      ) : null}
    </div>
  );
}
