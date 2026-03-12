/**
 * ASilva Innovations Blog — Custom React Hooks
 */

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useAutoSave — Saves a callback on a set interval
 * Returns { lastSaved, isSaving, save }
 */
export function useAutoSave(saveFn, intervalMs = 30000) {
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const intervalRef = useRef(null);
  const saveFnRef = useRef(saveFn);
  saveFnRef.current = saveFn;

  const save = useCallback(async (isAuto = false) => {
    setIsSaving(true);
    try {
      await saveFnRef.current(isAuto);
      setLastSaved(new Date());
    } catch (err) {
      console.error("Auto-save failed:", err);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Start interval
  useEffect(() => {
    intervalRef.current = setInterval(() => save(true), intervalMs);
    return () => clearInterval(intervalRef.current);
  }, [save, intervalMs]);

  // Save on page unload
  useEffect(() => {
    const onUnload = () => saveFnRef.current(true);
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  return { lastSaved, isSaving, save };
}

/**
 * useReadingProgress — Tracks vertical scroll progress 0–100
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

/**
 * useDebounce — Delays value updates (useful for search)
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useLocalStorage — Synced state with localStorage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        console.error(`useLocalStorage error for key "${key}":`, err);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

/**
 * useIntersectionObserver — Fires when element enters viewport
 */
export function useIntersectionObserver(
  ref,
  options = { threshold: 0.1, rootMargin: "0px" }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}

/**
 * useKeyboard — Listen for keyboard shortcuts
 */
export function useKeyboard(keyMap) {
  useEffect(() => {
    const handler = (e) => {
      const key = [
        e.ctrlKey && "Ctrl",
        e.metaKey && "Meta",
        e.shiftKey && "Shift",
        e.altKey && "Alt",
        e.key,
      ]
        .filter(Boolean)
        .join("+");
      keyMap[key]?.(e);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keyMap]);
}

/**
 * useOnClickOutside — Fires callback when user clicks outside ref
 */
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

/**
 * usePageMeta — Set document title and meta description
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ASilva Innovations`;
    }
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
    return () => {
      document.title = "ASilva Innovations | Thought Leadership Blog";
    };
  }, [title, description]);
}

/**
 * usePrevious — Returns previous value of a state
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}

/**
 * useWindowSize — Returns current window dimensions
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handler = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);

  return { ...size, isMobile: size.width < 768, isTablet: size.width < 1024 };
}
