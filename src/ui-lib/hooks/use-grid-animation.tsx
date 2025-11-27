import { useEffect, type RefObject } from "react";

export const useGridAnimation = <T extends HTMLElement | null>(target: RefObject<T> | T | null) => {
  useEffect(() => {
    const grid = target && "current" in target ? target.current : target;
    if (!grid) return;

    let animationFrameId: number;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isUpdating = false;

    const updateCardProperties = () => {
      const cards = Array.from(grid.children) as HTMLElement[];

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = Math.round(lastMouseX - rect.left);
        const y = Math.round(lastMouseY - rect.top);

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });

      isUpdating = false;
    };

    const handleHover = (event: MouseEvent) => {
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;

      if (!isUpdating) {
        isUpdating = true;
        animationFrameId = requestAnimationFrame(updateCardProperties);
      }
    };

    grid.addEventListener("mousemove", handleHover);

    return () => {
      grid.removeEventListener("mousemove", handleHover);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target]);
};
