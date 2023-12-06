import browser from "webextension-polyfill";
import { NativeMessage } from "../services/messages";

// The only way to communicate with native hosts is using a background script.

// The allows the background script to receive messages from the content script.
browser.runtime.onMessage.addListener(handleMessage);

/**
 * Handles a message received from a content script.
 * Passes it along to the native host.
 *
 * @param msg The message received from the content script.
 * @returns The response from the native host.
 *
 */
async function handleMessage(msg: NativeMessage): Promise<NativeMessage> {
  return browser.runtime.sendNativeMessage("armaria", msg);
}
