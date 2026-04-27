export default function Overlay({
  className = "pointer-events-none fixed inset-0 z-[1]",
}) {
  return (
    <div
      className={className}
      style={{
        background: `
          radial-gradient(circle at 82% 18%, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.34) 18%, rgba(0, 0, 0, 0) 42%),
          radial-gradient(circle at 18% 20%, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.12) 24%, rgba(0, 0, 0, 0) 44%),
          linear-gradient(90deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.24) 34%, rgba(0, 0, 0, 0.14) 58%, rgba(0, 0, 0, 0.52) 100%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.46) 24%, rgba(0, 0, 0, 0.58) 62%, rgba(0, 0, 0, 0.92) 100%)
        `,
      }}
    />
  );
}
