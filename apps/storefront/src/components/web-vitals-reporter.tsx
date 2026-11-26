'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';

function reportMetric(metric: Metric) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug(`[WebVitals] ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})`);
  }
}

export function WebVitalsReporter() {
  useEffect(() => {
    onLCP(reportMetric);
    onINP(reportMetric);
    onCLS(reportMetric);
  }, []);

  return null;
}
