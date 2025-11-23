import { flushSync } from "react-dom";

export function viewTransition(cb: () => void): Promise<void> {
  const hasVT = "startViewTransition" in document;

  if (!hasVT) {
    cb();
    return Promise.resolve();
  }

  const vt = document.startViewTransition(() => {
    flushSync(cb);
  });

  return vt.finished;
}
