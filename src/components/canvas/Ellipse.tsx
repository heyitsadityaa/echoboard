import type { EllipseLayer } from "@/types";
import { colorToCss } from "@/utils";

export default function Ellipse({
  id,
  layer,
  onPointerDown,
}: {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
}) {
  const { x, y, width, height, fill, stroke, opacity } = layer;
  return (
    <g className="group">
      {/* Hover Ellipse */}
      <ellipse
        style={{ transform: `translate(${x}px, ${y}px)` }}
        fill="none"
        stroke="#Bfff00"
        strokeWidth="4"
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        className="pointer-events-none opacity-0 group-hover:opacity-100"
      />
      {/* Main Ellipse */}
      <ellipse
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{ transform: `translate(${x}px, ${y}px)` }}
        fill={fill ? colorToCss(fill) : "#CCC"}
        stroke={stroke ? colorToCss(stroke) : "#CCC"}
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        strokeWidth="1"
        opacity={`${opacity ?? 100}%`}
      />
    </g>
  );
}
