export default function Overlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `
          radial-gradient(circle at 82% 18%, rgba(2, 6, 23, 0.58) 0%, rgba(2, 6, 23, 0.34) 18%, rgba(2, 6, 23, 0) 42%),
          radial-gradient(circle at 22% 22%, rgba(15, 23, 42, 0.26) 0%, rgba(15, 23, 42, 0.08) 26%, rgba(15, 23, 42, 0) 46%),
          linear-gradient(90deg, rgba(2, 6, 23, 0.58) 0%, rgba(2, 6, 23, 0.22) 34%, rgba(2, 6, 23, 0.12) 58%, rgba(2, 6, 23, 0.48) 100%),
          linear-gradient(180deg, rgba(2, 6, 23, 0.88) 0%, rgba(2, 6, 23, 0.42) 24%, rgba(2, 6, 23, 0.56) 62%, rgba(2, 6, 23, 0.9) 100%)
        `,
      }}
    />
  );
}
