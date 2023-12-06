import { XCircle } from "@phosphor-icons/react";
import { cleanup, render } from "@testing-library/react/pure";
import React from "react";
import { test } from "tap";
import { heightAtom } from "../../store";
import { TestProvider } from "../../utils";
import Status from "./Status";

test("Status", async ({ test }) => {
  const BookAddedProvider = () => (
    <TestProvider initialValues={[[heightAtom, "100px"]]}>
      <Status text="Something happened">
        <XCircle size={48} weight="bold" />
      </Status>
    </TestProvider>
  );

  test("has dynamic height", async ({ equal }) => {
    const { getByTestId } = render(<BookAddedProvider />);

    const wrapper = getByTestId("wrapper");
    equal(wrapper.style.height, "100px");

    cleanup();
  });

  test("shows text from prop", async ({ equal }) => {
    const { getByRole } = render(<BookAddedProvider />);

    const heading = getByRole("heading");
    equal(heading.textContent, "Something happened");

    cleanup();
  });
});
