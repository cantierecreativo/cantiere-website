import { useEffect, useState, useRef, useCallback } from "react";

function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouchDevice();
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouchDevice, isVisible]);

  // Handle hover on interactive elements
  useEffect(() => {
    if (isTouchDevice) return;

    const handleElementMouseEnter = () => setIsHovering(true);
    const handleElementMouseLeave = () => setIsHovering(false);

    const trackedElements = new Set();

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-hover'
      );
      interactiveElements.forEach((el) => {
        if (!trackedElements.has(el)) {
          trackedElements.add(el);
          el.addEventListener("mouseenter", handleElementMouseEnter);
          el.addEventListener("mouseleave", handleElementMouseLeave);
        }
      });
    };

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      trackedElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementMouseEnter);
        el.removeEventListener("mouseleave", handleElementMouseLeave);
      });
      trackedElements.clear();
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? "is-hovering" : ""} ${
        isVisible ? "is-visible" : ""
      }`}
      aria-hidden="true"
    />
  );
}

export default CustomCursor;
