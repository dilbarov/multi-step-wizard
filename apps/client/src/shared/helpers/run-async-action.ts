export const runAsyncAction = (action: () => Promise<void>): void => {
  void action().then();
};
