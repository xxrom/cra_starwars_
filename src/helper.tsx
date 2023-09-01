export const mockTimeout = (timeout = 500) =>
  new Promise((res) => {
    setTimeout(() => res(''), timeout);
  });

function sleep(timeout = 500) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export const waitFor = async (cb: () => void, timeout = 500) => {
  const step = 10;
  let timeSpent = 0;

  while (timeSpent < timeout) {
    try {
      await sleep(step);

      timeSpent += step;
      cb();

      break;
    } catch {
      console.warn('waitFor, catch');
    }
  }

  if (timeSpent >= timeout) {
    throw new Error('timeout');
  }
};
