/**
 * Enables better formatting and filtering for class names.
 *
 * @param classes Class names to apply to element; if not truthy they will not be applied.
 * @returns Combined and filtered class names.
 */
export const classNames = (...classes: Array<string | boolean>): string =>
  classes.filter(Boolean).join(" ");
