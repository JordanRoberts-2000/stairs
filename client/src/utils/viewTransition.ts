type ViewTransitionLike = {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
};

type ViewTransitionConfig = {
  start: () => void;
  finished?: () => void;
};

export function viewTransition(start: () => void): Promise<void>;
export function viewTransition(config: ViewTransitionConfig): Promise<void>;

export function viewTransition(
  arg: (() => void) | ViewTransitionConfig,
): Promise<void> {
  const startFn = typeof arg === "function" ? arg : arg.start;
  const finishedFn = typeof arg === "function" ? undefined : arg.finished;

  const hasVT = "startViewTransition" in document;

  if (!hasVT) {
    startFn();
    if (finishedFn) {
      finishedFn();
    }
    return Promise.resolve();
  }

  // Only synchronous DOM updates go in the callback
  const vt = document.startViewTransition(() => {
    startFn();
  }) as ViewTransitionLike;

  // Async work happens AFTER the transition finishes
  return vt.finished
    .catch(() => {
      // Silently handle aborted transitions
    })
    .then(async () => {
      if (finishedFn) {
        await finishedFn();
      }
    });
}
