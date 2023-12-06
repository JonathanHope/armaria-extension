import { ArchiveBox } from "@phosphor-icons/react";
import { cleanup, render } from "@testing-library/react/pure";
import React from "react";
import { test } from "tap";
import Button from "./Button";

test("Button", async ({ test }) => {
  test("shows text from prop", async ({ equal }) => {
    const { getByRole } = render(
      <Button text="Save">
        <ArchiveBox size={22} weight="bold" />
      </Button>,
    );

    const button = getByRole("button");
    equal(button.textContent, "Save");

    cleanup();
  });

  test("can be disabled", async ({ ok }) => {
    const { getByRole } = render(
      <Button text="Save" disabled={true}>
        <ArchiveBox size={22} weight="bold" />
      </Button>,
    );

    const button = getByRole("button");
    ok(button.hasAttribute("disabled"));

    cleanup();
  });
});
