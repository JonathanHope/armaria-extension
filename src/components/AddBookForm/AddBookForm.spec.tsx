import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import React from "react";
import { test } from "tap";
import { SendMessageFn } from "../../services/messages";
import { titleAtom, urlAtom } from "../../store";
import { TestProvider } from "../../utils";
import AddBookForm from "./AddBookForm";

const receiveSuccessMessage: SendMessageFn = async () => ({
  kind: "book",
  payload: "",
});

test("AddBookForm", async ({ test }) => {
  test("URL is required", async ({ equal }) => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <AddBookForm sendMessage={receiveSuccessMessage} />,
    );

    const button = getByRole("button");
    await user.click(button);

    const alert = getByRole("alert");
    equal(alert.textContent, "URL must be valid");

    cleanup();
  });

  test("URL must be URL", async ({ equal }) => {
    const user = userEvent.setup();
    const { getByRole, getByLabelText } = render(
      <AddBookForm sendMessage={receiveSuccessMessage} />,
    );

    const input = getByLabelText("URL");
    await user.type(input, "test");

    const button = getByRole("button");
    await user.click(button);

    await waitFor(() => {
      const alert = getByRole("alert");
      equal(alert.textContent, "URL must be valid");
    });

    cleanup();
  });

  test("URL must be no more than 2048 chars", async ({ equal }) => {
    const user = userEvent.setup();
    const { getByRole, getByLabelText } = render(
      <AddBookForm sendMessage={receiveSuccessMessage} />,
    );

    // userEvent is too slow here
    const input = getByLabelText("URL");
    fireEvent.change(input, {
      target: { value: `https://${"x".repeat(2038)}.com` },
    });

    const button = getByRole("button");
    await user.click(button);

    await waitFor(() => {
      const alert = getByRole("alert");
      equal(alert.textContent, "URL must be at most 2048 chars");
    });

    cleanup();
  });

  test("name must be no more than 2048 chars", async ({ equal }) => {
    const user = userEvent.setup();
    const { getByRole, getByLabelText } = render(
      <AddBookForm sendMessage={receiveSuccessMessage} />,
    );

    const url = getByLabelText("URL");
    await user.type(url, "https://jho.pe");

    // userEvent is too slow here
    const name = getByLabelText("Name");
    fireEvent.change(name, {
      target: { value: `https://${"x".repeat(2038)}.com` },
    });

    const button = getByRole("button");
    await user.click(button);

    await waitFor(() => {
      const alert = getByRole("alert");
      equal(alert.textContent, "Name must be at most 2048 chars");
    });

    cleanup();
  });

  test("URL filled in from tab info", async ({ equal }) => {
    const { getByLabelText } = render(
      <TestProvider initialValues={[[urlAtom, "https://jho.pe"]]}>
        <AddBookForm sendMessage={receiveSuccessMessage} />
      </TestProvider>,
    );

    await waitFor(() => {
      const input = getByLabelText("URL") as HTMLInputElement;
      equal(input.value, "https://jho.pe");
    });

    cleanup();
  });

  test("Title filled in from tab info", async ({ equal }) => {
    const { getByLabelText } = render(
      <TestProvider initialValues={[[titleAtom, "The Flat Field"]]}>
        <AddBookForm sendMessage={receiveSuccessMessage} />
      </TestProvider>,
    );

    await waitFor(() => {
      const input = getByLabelText("Name") as HTMLInputElement;
      equal(input.value, "The Flat Field");
    });

    cleanup();
  });
});
