import { useAtomValue } from "jotai";
import React from "react";
import { heightAtom } from "../../store";
import { classNames } from "../../utils";

/** Props for `Status`. */
interface StatusProps {
  /** Text to show in header. */
  text: string;
  /** What to show below the header. */
  children: React.JSX.Element;
}

/**
 * Show a message about the bookmark being added successfully.
 *
 * @param props - Props for `Button`.
 * @returns A React node.
 */
export default function Status({ text, children }: StatusProps) {
  const height = useAtomValue(heightAtom);

  return (
    <div
      data-testid="wrapper"
      style={{ height: height }}
      className={classNames("flex flex-col justify-center items-center")}
    >
      <h1
        className={classNames(
          "text-black font-['Alegreya-Bold'] text-3xl mb-4",
        )}
      >
        {text}
      </h1>
      {children}
    </div>
  );
}
