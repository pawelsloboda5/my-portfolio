import React, { useEffect, useRef, useState, Suspense } from 'react';

/**
 * LazyLoad component
 * Props:
 *   loader: () => Promise<{ default: React.ComponentType<any> }>
 *   fallback?: React.ReactNode
 *
 * Example:
 *   <LazyLoad loader={() => import('./Projects')} fallback={<div className="h-40" />} />
 */
export default function LazyLoad({ loader, fallback = null }) {
  const ref = useRef(null);
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const observeTarget = ref.current;
    if (!observeTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Dynamically import the component when first in view
            loader().then((mod) => {
              setComponent(() => mod.default || mod);
            });
            observer.unobserve(observeTarget);
          }
        });
      },
      {
        rootMargin: '200px', // Start loading a bit before it actually shows
      }
    );

    observer.observe(observeTarget);
    return () => observer.disconnect();
  }, [loader]);

  if (Component) {
    return (
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    );
  }

  // Placeholder until the component is in view
  return <div ref={ref} style={{ minHeight: '1px' }} />;
} 