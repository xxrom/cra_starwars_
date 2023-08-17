export const mockTimeout = (timeout = 1000) =>
  new Promise((res) => {
    setTimeout(() => res(''), timeout);
  });
