// This files contains types and functions used to interact with the native host.

/** A bookmark or folder. */
export interface Book {
  id: string;
  url: string | null;
  name: string;
  description: string | null;
  parentId: string | null;
  isFolder: boolean;
  parentName: string | null;
  tags: string[];
}

/** MessageKind denotes the kind of message that was sent to or received from a native host. */
export type Kind = "add-book" | "error" | "book" | "books";

/** A message that was sent to or received from a native host. */
export interface NativeMessage {
  kind: Kind;
  payload: string;
}

/** The payloads that can be sent to the native host. */
export type RequestPayload = AddBookPayload;

/** A payload for a request to add a bookmark */
export interface AddBookPayload {
  url: string;
  name: string | null;
  description: string | null;
}

/** The payloads that can be received from the native host. */
export type ResponsePayload = ErrorPayload | BookPayload;

/** A payload for a response with an error in it. */
export interface ErrorPayload {
  error: string;
}

/** A payload for a response with a bookmark/folder in it. */
export interface BookPayload {
  book: Book;
}

/**
 * Sends a message to the native host.
 *
 * @param kind The kind of message to send.
 * @param payload The payload to send in the message.
 * @returns The response from the native host.
 */
export async function sendMessage(
  kind: Kind,
  payload: RequestPayload,
): Promise<NativeMessage> {
  const msg: NativeMessage = {
    kind,
    payload: JSON.stringify(payload),
  };

  const browser = await import("webextension-polyfill");
  return await browser.runtime.sendMessage(msg);
}

/** Typing for sendMessage. */
export type SendMessageFn = typeof sendMessage;

/**
 * Get a payload from a native message.
 *
 * @param msg - A native message.
 * @typeParam T extends ResponsePayload - The expected type of the underlying payload.
 * @returns - The underlying payload.
 */
export function getPayload<T extends ResponsePayload>(msg: NativeMessage): T {
  return JSON.parse(msg.payload);
}
