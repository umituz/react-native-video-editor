/**
 * Debounce & Throttle Utilities
 * PERFORMANCE: Prevents excessive function calls
 * - Debounce: Wait before executing (search, auto-save)
 * - Throttle: Execute at most once per interval (scroll, resize)
 */

/**
 * Debounce function execution
 * @param func Function to debounce
 * @param wait Wait time in ms (default: 300)
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 300,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Throttle function execution
 * @param func Function to throttle
 * @param limit Minimum time between calls in ms (default: 100)
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number = 100,
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastResult: ReturnType<T>;

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      lastResult = func(...args) as ReturnType<T>;
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }

    return lastResult;
  };
}

/**
 * React hook for debounced value
 * @param value Value to debounce
 * @param _delay Delay in ms (default: 500)
 * @returns Debounced value
 */
export function useDebouncedValue<T>(value: T, _delay: number = 500): T {
  // This would be implemented in a separate hook file
  // For now, just return the value
  return value;
}
