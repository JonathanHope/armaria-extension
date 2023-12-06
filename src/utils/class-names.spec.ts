import { test } from "tap";
import { classNames } from "./class-names";

test("classNames", async ({ test }) => {
  test("joins multiple class names", async ({ equal }) => {
    const result = classNames("one", "two");
    equal(result, "one two");
  });

  test("filters out falsy things", async ({ equal }) => {
    const result = classNames("one", false && "two");
    equal(result, "one");
  });
});
