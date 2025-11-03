import React, { useRef, useEffect, useState, useLayoutEffect, type PropsWithChildren } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

import { cn } from "@/utils-ui-lib/classnames";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin);
}

interface ScrambleProps {
  duration?: number;
  className?: string;
}

const Scramble = (props: PropsWithChildren<ScrambleProps>) => {
  const [showChild, setShowChild] = useState(false);

    useEffect(() => {
      setShowChild(true);
    }, []);

    if (!showChild) {
      return (
        <span className={cn("overflow-hidden", props.className)}>
          <span className="block overflow-hidden break-all">{props.children}</span>
        </span>
      );
    }

    return <ScrambleChild {...props} />;
}

const ScrambleChild = ({ duration = 1, children, className }: PropsWithChildren<ScrambleProps>) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    timelineRef.current = gsap.timeline({ paused: true });
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useGSAP(() => {
    if (!spanRef.current || !timelineRef.current || !containerRef.current) return;

    const width = spanRef.current.getBoundingClientRect().width;
    const height = spanRef.current.getBoundingClientRect().height;

    gsap.set(containerRef.current, {
      width: Math.ceil(width),
      height: Math.ceil(height),
      display: "block",
    });

    timelineRef.current?.to(spanRef.current, {
      scrambleText: {
        text: "{original}",
        chars: "ラウケりもくイフツヰエォオカキ021zrotxinsmopsweknm",
        delimiter: "",
        speed: 0.25,
      },
      duration: duration,
    });
  }, [duration]);

  const handleMouseEnter = () => {
    timelineRef.current?.timeScale(1).play();
  };

  const handleMouseLeave = () => {
    timelineRef.current?.timeScale(1.5).reverse();
  };

  return (
    <span
      ref={containerRef}
      className={cn("overflow-hidden", className)}
    >
      <span
        ref={spanRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="block overflow-hidden break-all"
      >
        {children}
      </span>
    </span>
  );
};

export { Scramble };
