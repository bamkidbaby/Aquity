export default function Overlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[0.3]"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.65) 38%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.93) 100%)",
      }}
    />
  );
}
