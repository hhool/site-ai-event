'use client';

import { useCallback, useState } from 'react';

const STORAGE_KEY = 'ai-event-favorites-v1';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          return new Set(JSON.parse(raw) as string[]);
        }
      }
    } catch {
      // ignore parse / security errors
    }
    return new Set<string>();
  });

  const toggle = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore write errors
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setFavorites(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { favorites, toggle, clear };
}
