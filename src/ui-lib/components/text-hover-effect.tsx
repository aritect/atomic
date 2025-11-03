import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/utils-ui-lib/classnames";

export const TextHoverEffect = ({
  text,
  className,
  duration = 0.25,
}: {
  text: string;
  className?: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => requestAnimationFrame(() => setCursor({ x: e.clientX, y: e.clientY }))}
      className="select-none"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="50%" stopColor={"hsl(var(--bright-pink))"} />
              <stop offset="55%" stopColor={"hsl(var(--dark-yellow))"} />
              <stop offset="60%" stopColor={"hsl(var(--electric-blue))"} />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="15%"
          width="100%"
          height="100%"
          animate={maskPosition}
          transition={{
            visualDuration: duration ?? 0,
            ease: "easeOut",
            type: "spring",
          }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={cn("font-sans font-black stroke-border fill-transparent text-7xl", className)}
        style={{ opacity: hovered ? 1 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={cn("font-sans font-black fill-transparent text-7xl stroke-border", className)}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 3,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className={cn("font-sans font-black fill-transparent text-7xl", className)}
      >
        {text}
      </text>
    </svg>
  );
};
