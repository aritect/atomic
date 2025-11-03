import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils-ui-lib/classnames";

import mask from "@/assets-ui-lib/images/mask.svg?base64";

export const MaskContainer = ({
  children,
  revealText,
  size = 0,
  revealSize = 200,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<any>({ x: null, y: null });
  const containerRef = useRef<any>(null);
  const updateMousePosition = (e: any) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    containerRef.current.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mousemove",
          updateMousePosition,
        );
      }
    };
  }, []);
  let maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      ref={containerRef}
      className={cn("h-screen relative", className)}
    >
      <motion.div
        className={`w-full h-full flex items-center bg-muted justify-center text-6xl absolute text-foreground [mask-size:40px] [mask-repeat:no-repeat]`}
        style={{ "maskImage": `url(data:image/svg+xml;base64,${mask})` }}
        animate={{
          maskPosition: `${mousePosition.x - maskSize / 2}px ${
            mousePosition.y - maskSize / 2
          }px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: {
            duration: 0,
          },
          maskPosition: {
            duration: 0,
          }
        }}
      >
        <div className="absolute inset-0 h-full w-full z-0 opacity-50" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="max-w-4xl mx-auto text-center text-4xl font-bold relative z-20"
        >
          {children}
        </div>
      </motion.div>

      <div className="w-full h-full flex items-center justify-center text-foreground">
        {revealText}
      </div>
    </motion.div>
  );
};
