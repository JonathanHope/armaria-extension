import { atom } from "jotai";
import {
  ErrorPayload,
  Kind,
  RequestPayload,
  SendMessageFn,
  getPayload,
} from "./services/messages";
import { GetTabInfoFn } from "./services/tab";

// Store for the extension wide state.
// The state is a set of Jotai atoms.

/** An atom to store the current error if any. */
export const errorAtom = atom<string | null>(null);

/**
 * Current state of the extension.
 */
export type State =
  | "GettingTabInfo"
  | "AddingBook"
  | "SendingMessage"
  | "ErrorOccurred"
  | "BookAdded";

/** An atom to store the current state. */
export const stateAtom = atom<State>("GettingTabInfo");

/**
 * Atom to hold the measured height of the popup.
 * This is to preven the height of the popup from jumping around.
 */
export const heightAtom = atom<string>("100%");

/** The URL of the currently selected tab. */
export const urlAtom = atom<string>("");

/** The title of the currently selected tab. */
export const titleAtom = atom<string>("");

/**
 * Atom to add a bookmark to to the bookmarks database.
 * This will also coordinate the state changes around this operation.
 */
export const addBookmarkAtom = atom(
  null,
  async (
    _,
    set,
    args: { kind: Kind; payload: RequestPayload; sendMessage: SendMessageFn },
  ) => {
    set(stateAtom, "SendingMessage");

    const response = await args.sendMessage(args.kind, args.payload);

    if (response.kind === "error") {
      const responsePayload = getPayload<ErrorPayload>(response);
      set(errorAtom, responsePayload.error);
      set(stateAtom, "ErrorOccurred");
    } else if (response.kind === "book") {
      set(stateAtom, "BookAdded");
    }
  },
);

/** Atom to set information about the current tab. */
export const setTabInfoAtom = atom(
  null,
  async (_, set, args: { getTabInfo: GetTabInfoFn }) => {
    const info = await args.getTabInfo();

    if (info != null) {
      set(urlAtom, info.url);
      set(titleAtom, info.title);
    }

    set(stateAtom, "AddingBook");
  },
);
