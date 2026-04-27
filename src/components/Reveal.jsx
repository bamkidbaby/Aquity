export default function Reveal({
  as: Tag = "div",
  animation = "fade-up",
  delay = 0,
  duration = 900,
  offset = 80,
  once = true,
  anchorPlacement = "top-bottom",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-offset={offset}
      data-aos-once={once}
      data-aos-anchor-placement={anchorPlacement}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}
