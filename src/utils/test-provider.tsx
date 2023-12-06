import { Provider, WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import React from "react";

// These are helpers that allow injecting values into Jotai atoms for unit tests.
// It also provides isolation of the atoms which is useful for tests.

/** Typing for the input to `useHydrateAtoms` */
type AtomsWithValues = (readonly [
  WritableAtom<unknown, any[], any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  unknown,
])[];

/** Typing for props for HydrateAtoms/TestProvider */
type HydratePropsAtoms<T extends AtomsWithValues> = {
  initialValues: T;
  children: React.JSX.Element;
};

/** Initializes one or more atoms with data. */
const HydrateAtoms = <T extends AtomsWithValues>({
  initialValues,
  children,
}: HydratePropsAtoms<T>) => {
  useHydrateAtoms(initialValues);
  return children;
};

/** Wraps the subtree in a `Provider` and initializes its atoms with data. */
export const TestProvider = <T extends AtomsWithValues>({
  initialValues,
  children,
}: HydratePropsAtoms<T>) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);
