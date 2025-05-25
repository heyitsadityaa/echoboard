import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "@/utils";

interface PathProps {
  x: number;
  y: number;
  stroke?: string;
  fill: string;
  opacity: number;
  points: number[][];
  onPointerDown?: (e: React.PointerEvent) => void;
}

export default function Path({
  x,
  y,
  stroke,
  fill,
  opacity,
  points,
  onPointerDown,
}: PathProps) {
  const freeHandStroke = getStroke(points, {
    size: 16,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });

  const pathData = getSvgPathFromStroke(freeHandStroke);
  return (
    <g className="group">
      {/* Hover Path */}
      <path
        style={{ transform: `translate(${x}px, ${y}px)` }}
        d={pathData}
        fill="none"
        stroke="#Bfff00"
        strokeWidth="3"
        className="pointer-events-none opacity-0 group-hover:opacity-100"
      />
      {/* Main Path */}
      <path
        onPointerDown={onPointerDown}
        style={{ transform: `translate(${x}px, ${y}px)` }}
        d={pathData}
        fill={fill}
        stroke={stroke ?? "#CCC"}
        strokeWidth={1}
        opacity={`${opacity ?? 100}%`}
      />
    </g>
  );
}
