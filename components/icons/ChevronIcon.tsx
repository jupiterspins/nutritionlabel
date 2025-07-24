export default function ChevronIcon({ direction = "right", className = "" }: { direction?: "up" | "down" | "left" | "right"; className?: string }) {
  const rotations = {
    up: "rotate-180",
    down: "",
    left: "rotate-90",
    right: "-rotate-90"
  };
  
  return (
    <svg
      className={`${className} ${rotations[direction]} transition-transform`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}