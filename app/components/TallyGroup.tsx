type Props = {
  count: number; // 0–5
  className?: string;
};

const STROKES: [number, number, number, number][] = [
  [10, 5,  10, 55], // 1. left vertical
  [10, 5,  40, 5 ], // 2. top horizontal
  [40, 5,  40, 55], // 3. right vertical
  [10, 55, 40, 55], // 4. bottom horizontal
  [45, 5,   5, 55], // 5. diagonal slash
];

export function TallyGroup({ count, className = "w-full h-auto" }: Props) {
  return (
    <svg viewBox="0 0 50 60" className={className} aria-hidden="true">
      {STROKES.slice(0, Math.min(count, 5)).map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
