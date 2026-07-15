// Debounce utility function
// Returns a function that delays invoking func until after wait milliseconds have elapsed since the last time it was invoked.

export function debounce(func, wait) {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}