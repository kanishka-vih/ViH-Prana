import { useEffect } from "react";

export const useScrollReveal = (selector: string): void => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(selector).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
};
