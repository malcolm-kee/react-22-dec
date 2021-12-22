export const callAll = (...fns) => {
  return function (...args) {
    fns.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(...args);
      }
    });
  };
};
