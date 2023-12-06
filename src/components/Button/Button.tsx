import React from "react";
import { classNames } from "../../utils";

/** Props for `Button`. */
interface ButtonPropsShape {
  /** Text to show in button. */
  text: string;
  /** If true disable the button. */
  disabled?: boolean;
  /** Additional class names to add. */
  className?: string;
  /** Icon to show in button. */
  children: React.JSX.Element;
}

/**
 * A button used to submit a form.
 *
 * @param props - Props for `Button`.
 * @returns A React node.
 */
export default function Button({
  text,
  disabled,
  className,
  children,
}: ButtonPropsShape) {
  return (
    <button
      className={classNames(
        "text-black text-lg font-['Alegreya-Bold']",
        "bg-gray-300 hover:bg-gray-400",
        "focus:outline-none focus:ring-2 focus:ring-black",
        "rounded-lg",
        "px-5 py-2.5",
        "flex justify-center items-center",
        "disabled:bg-gray-300 disabled:cursor-not-allowed",
        className || false,
      )}
      type="submit"
      disabled={disabled ?? false}
    >
      <span role="presentation" className={classNames("inline-block", "mr-2")}>
        {children}
      </span>
      <span className="inline-block">{text}</span>
    </button>
  );
}
