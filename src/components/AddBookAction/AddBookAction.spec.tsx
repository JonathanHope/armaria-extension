import { cleanup, render, waitFor } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import React from "react";
import { test } from "tap";
import { errorAtom, stateAtom } from "../../store";
import { TestProvider } from "../../utils";
import AddBookAction from "./AddBookAction";

const validUrl = "https://jho.pe";

test("AddBookAction", async ({ test }) => {
  test("shows loading message if tab info is getting retrieved", async ({
    equal,
  }) => {
    const { getByRole } = render(
      <TestProvider
        initialValues={[
          [stateAtom, "GettingTabInfo"],
          [errorAtom, null],
        ]}
      >
        <AddBookAction
          getTabInfo={async () => null}
          sendMessage={async () => ({
            kind: "book",
            payload: "",
          })}
        />
      </TestProvider>,
    );

    await waitFor(() => {
      const heading = getByRole("heading");
      equal(heading.textContent, "Working...");
    });

    cleanup();
  });

  test("shows form to add bookmark if tab info has been retrieved", async ({
    equal,
  }) => {
    const { getByRole } = render(
      <TestProvider
        initialValues={[
          [stateAtom, "AddingBook"],
          [errorAtom, null],
        ]}
      >
        <AddBookAction
          getTabInfo={async () => null}
          sendMessage={async () => ({
            kind: "book",
            payload: "",
          })}
        />
      </TestProvider>,
    );

    await waitFor(() => {
      const heading = getByRole("heading");
      equal(heading.textContent, "Add Book to Armaria");
    });

    cleanup();
  });

  test("shows success message if bookmark added successfully", async ({
    equal,
  }) => {
    const user = userEvent.setup();
    const { getByLabelText, getByRole } = render(
      <TestProvider
        initialValues={[
          [stateAtom, "AddingBook"],
          [errorAtom, null],
        ]}
      >
        <AddBookAction
          getTabInfo={async () => null}
          sendMessage={async () => ({
            kind: "book",
            payload: "",
          })}
        />
      </TestProvider>,
    );

    const input = getByLabelText("URL");
    await user.type(input, validUrl);

    const button = getByRole("button");
    await user.click(button);

    await waitFor(() => {
      const heading = getByRole("heading");
      equal(heading.textContent, "Book Added to Armaria");
    });

    cleanup();
  });

  test("shows error message if error occurred", async ({ equal }) => {
    const user = userEvent.setup();
    const { getByLabelText, getByRole } = render(
      <TestProvider
        initialValues={[
          [stateAtom, "AddingBook"],
          [errorAtom, null],
        ]}
      >
        <AddBookAction
          getTabInfo={async () => null}
          sendMessage={async () => ({
            kind: "error",
            payload: `{"error": "something bad happened"}`,
          })}
        />
      </TestProvider>,
    );

    const input = getByLabelText("URL");
    await user.type(input, validUrl);

    const button = getByRole("button");
    await user.click(button);

    await waitFor(() => {
      const heading = getByRole("heading");
      equal(heading.textContent, "Error: something bad happened");
    });

    cleanup();
  });
});
