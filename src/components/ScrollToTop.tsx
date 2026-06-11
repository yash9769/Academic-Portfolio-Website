import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scrolls to the top of the page on every route change.
 * Place this inside the router tree (inside Root).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
