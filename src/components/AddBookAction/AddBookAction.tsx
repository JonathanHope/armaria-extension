import { CheckCircle, Hourglass, XCircle } from "@phosphor-icons/react";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { SendMessageFn } from "../../services/messages";
import { GetTabInfoFn } from "../../services/tab";
import { errorAtom, heightAtom, setTabInfoAtom, stateAtom } from "../../store";
import AddBookForm from "../AddBookForm";
import Status from "../Status";

/** Props for `AddBookAction`. */
interface AddBookActionPropsShape {
  /** Function to send a message to a native host. */
  sendMessage: SendMessageFn;
  /** Function to get information about the current tab. */
  getTabInfo: GetTabInfoFn;
}

/**
 * An action to add bookmarks.
 *
 * @param props - Props for `AddBookAction`.
 * @returns A React node.
 */
export default function AddBookAction({
  sendMessage,
  getTabInfo,
}: AddBookActionPropsShape) {
  const state = useAtomValue(stateAtom);
  const error = useAtomValue(errorAtom);
  const setHeight = useSetAtom(heightAtom);
  const setTabInfo = useSetAtom(setTabInfoAtom);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      setHeight(`${ref.current?.clientHeight}px`);
    }

    setTabInfo({ getTabInfo });
  }, [ref.current?.clientHeight, setHeight, setTabInfo, getTabInfo]);

  switch (state) {
    case "GettingTabInfo":
      return (
        <Status text="Working...">
          <Hourglass size={48} weight="bold" />
        </Status>
      );
    case "AddingBook":
    case "SendingMessage":
      return <AddBookForm sendMessage={sendMessage} ref={ref} />;
    case "ErrorOccurred":
      return (
        <Status text={`Error: ${error}`}>
          <XCircle size={48} weight="bold" />
        </Status>
      );
    case "BookAdded":
      return (
        <Status text="Book Added to Armaria">
          <CheckCircle size={48} weight="bold" />
        </Status>
      );
    default:
      throw new Error("Unknown state");
  }
}
