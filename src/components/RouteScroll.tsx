import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const RouteScroll = () => {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    let interrupted = false;
    let correctionFrame: number;
    const interrupt = () => { interrupted = true; };
    const intentEvents = ["wheel", "touchstart", "pointerdown", "keydown"];
    const removeListeners = () => intentEvents.forEach((event) => window.removeEventListener(event, interrupt));
    const frame = requestAnimationFrame(() => {
      if (!hash) {
        if (navigationType !== "POP") window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        return;
      }

      let id = hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Keep malformed fragments harmless. */ }
      const target = document.getElementById(id);
      if (!target) return;
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
      const align = (scrollBehavior: ScrollBehavior) => {
        if (id === "accueil") window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior });
        else target.scrollIntoView({ block: "start", behavior: scrollBehavior });
      };
      align(behavior);

      if (document.fonts.status === "loading") {
        intentEvents.forEach((event) => window.addEventListener(event, interrupt, { passive: true }));
        void document.fonts.ready.then(() => {
          if (!interrupted) correctionFrame = requestAnimationFrame(() => {
            if (!interrupted) align("instant");
          });
          removeListeners();
        });
      }
    });

    return () => {
      interrupted = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(correctionFrame);
      removeListeners();
    };
  }, [pathname, hash, key, navigationType]);

  return null;
};

export default RouteScroll;
