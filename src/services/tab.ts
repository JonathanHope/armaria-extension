/** Information about the current tab. */
export interface TabInfo {
  title: string;
  url: string;
}

/**
 * Get information about the current tab.
 *
 * @returns - Information about the current tab.
 */
export async function getTabInfo(): Promise<TabInfo | null> {
  const browser = await import("webextension-polyfill");
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  if (tabs.length > 0) {
    const tab = tabs[0];
    return {
      url: tab.url ?? "",
      title: tab.title ?? "",
    };
  }

  return null;
}

/** Typing for getTabInfo. */
export type GetTabInfoFn = typeof getTabInfo;
