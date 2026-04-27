import Reveal from "./Reveal";

function joinClassNames(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function AnimatedText({
  as: Tag = "p",
  text,
  lines,
  animation = "fade-up",
  delay = 0,
  stagger = 90,
  className = "",
  lineClassName = "",
  wordClassName = "",
  preserveSpacing = false,
  ...props
}) {
  const contentLines = lines ?? (text ? [text] : []);

  return (
    <Reveal
      as={Tag}
      animation={animation}
      delay={delay}
      className={joinClassNames("animated-text", className)}
      {...props}
    >
      {contentLines.map((line, lineIndex) => {
        const words = String(line).split(" ");

        return (
          <span
            key={`${line}-${lineIndex}`}
            className={joinClassNames("animated-text__line", lineClassName)}
          >
            {words.map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className={joinClassNames("animated-text__word", wordClassName)}
                style={{
                  transitionDelay: `${delay + lineIndex * stagger + wordIndex * 40}ms`,
                }}
              >
                {word}
                {preserveSpacing || wordIndex < words.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </span>
        );
      })}
    </Reveal>
  );
}
