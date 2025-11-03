import { type FC, useEffect, useRef, useState } from "react";

interface useActiveSectionProps {
  ids: string[];
}

const useActiveId: FC<useActiveSectionProps> = ({ ids }) => {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = observerRef.current;
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!observer) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-50% 0% -50% 0%" },
      );
    }

    if (!observerRef.current) {
      return () => {};
    }

    observerRef.current.disconnect();
    elements.forEach((element) => observerRef.current?.observe(element!));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [ids]);

  return activeId;
};

export { useActiveId };
