import {
  CheckCircle,
  PenNibStraight,
  Prohibit,
  XCircle,
} from "@phosphor-icons/react";
import React from "react";
import {
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { classNames } from "../../utils";

/** Props for `TextInput`. */
interface TextInputPropsShape<T extends FieldValues> {
  /** Name of the field on the form. */
  name: FieldPath<T>;
  /** Label for the field. */
  label: string;
  /** Placeholder value for the field. */
  placeholder: string;
  /** If true allow multline text. */
  multiline?: boolean;
  /** If true disable the input. */
  disabled?: boolean;
  /** Function to register field with `React Hook Form`. */
  register: UseFormRegister<T>;
  /** Any errors return by ` React From Hook` validation. */
  errors: FieldErrors<T>;
  /** If true the form has been submitted. */
  isSubmitted: boolean;
  /** If true autofocus the text input. */
  autofocus?: boolean;
  /** Additional class names to add. */
  className?: string;
}

/**
 * A text field on a form.
 *
 * @param props - Props for `TextInput`.
 * @returns A React node.
 */
export default function TextInput<T extends FieldValues>({
  name,
  label,
  register,
  placeholder,
  multiline,
  disabled,
  className,
  isSubmitted,
  autofocus,
  errors,
}: TextInputPropsShape<T>) {
  const GetIcon = () => {
    const className = "absolute top-0 right-2 translate-y-1/2 bg-white";
    const size = 24;

    if (errors[name]?.message !== undefined) {
      return (
        <div className={className} role="presentation" data-testid="invalid">
          <XCircle className={className} size={size} weight="bold" />
        </div>
      );
    } else if (disabled === true) {
      return (
        <div className={className} role="presentation" data-testid="valid">
          <Prohibit className={className} size={size} weight="bold" />
        </div>
      );
    } else if (isSubmitted == true) {
      return (
        <div className={className} role="presentation" data-testid="valid">
          <CheckCircle className={className} size={size} weight="bold" />
        </div>
      );
    }

    return (
      <div className={className} role="presentation" data-testid="editable">
        <PenNibStraight size={size} weight="bold" />
      </div>
    );
  };

  let inputClasses = classNames(
    "block",
    "text-md font-['Bitter']",
    "border-2 border-black",
    "rounded-lg",
    `focus:ring-2 focus:ring-black focus:outline-none`,
    "w-full",
    "p-2.5 pr-8",
    "disabled:cursor-not-allowed",
  );

  if (multiline) {
    // TODO: Should this be configurable?button
    inputClasses += " resize-none h-32";
  }

  return (
    <div className={classNames("relative", className ?? false)}>
      <label
        htmlFor={name}
        className={classNames(
          "absolute top-0 left-3 -translate-y-3",
          "block",
          "px-1",
          "text-base font-['Alegreya-Bold']",
          "bg-white",
        )}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          data-testid="multiline"
          placeholder={placeholder}
          {...register(name)}
          className={inputClasses}
          disabled={disabled ?? false}
          autoFocus={autofocus ?? false}
        />
      ) : (
        <input
          id={name}
          data-testid="singleline"
          placeholder={placeholder}
          type="text"
          {...register(name)}
          className={inputClasses}
          disabled={disabled ?? false}
          autoFocus={autofocus ?? false}
        />
      )}
      {GetIcon()}
      {errors[name]?.message && (
        <p
          role="alert"
          className={classNames("font-['Bitter'] text-md text-black")}
        >
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
