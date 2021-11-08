export const VERSION_POPUP_MSG = (currentAppVersion: string, latestVersion: string) =>
  [
    `This is version ${currentAppVersion}.`,
    `A newer version of the Vehicle Testing app has been released, ${latestVersion}.`,
    `You must update using Company Portal`
  ].join(' ');
