import { zodResolver } from "@hookform/resolvers/zod";
import { cleanup, render, waitFor } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { test } from "tap";
import { z } from "zod";
import TextInput from "./TextInput";

const name = "url";
const label = "URL";
const placeholder = "https://example.com";

const schema = z.object({
  url: z.string().url(),
});

type Inputs = z.infer<typeof schema>;

const TextInputWithFormFactory = (multiline: boolean, disabled: boolean) =>
  function TextInputWithForm() {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitted },
    } = useForm<Inputs>({
      resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async () => {};

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name={name}
          label={label}
          placeholder={placeholder}
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          disabled={disabled}
          multiline={multiline}
        />
        <button type="submit">Save</button>
      </form>
    );
  };

test("TextInput", async ({ test }) => {
  test("shows a label from prop", async ({ equal }) => {
    const TextInputWithForm = TextInputWithFormFactory(false, false);
    const { getByText } = render(<TextInputWithForm />);

    const lbl = getByText(label);
    equal(lbl.textContent, label);

    cleanup();
  });

  test("shows a placeholder from prop", async ({ equal }) => {
    const TextInputWithForm = TextInputWithFormFactory(false, false);
    const { getByRole } = render(<TextInputWithForm />);

    const input = getByRole("textbox");
    equal(input.getAttribute("placeholder"), placeholder);

    cleanup();
  });

  test("shows validation errors", async ({ equal }) => {
    const user = userEvent.setup();
    const TextInputWithForm = TextInputWithFormFactory(false, false);
    const { getByRole } = render(<TextInputWithForm />);

    const button = getByRole("button");
    await user.click(button);

    await waitFor(() => {
      const alert = getByRole("alert");
      equal(alert.textContent, "Invalid url");
    });

    cleanup();
  });

  test("shows an editable icon by default", async () => {
    const TextInputWithForm = TextInputWithFormFactory(false, false);
    const { getByTestId } = render(<TextInputWithForm />);

    getByTestId("editable");

    cleanup();
  });

  test("shows an invalid icon if validation failed", async () => {
    const user = userEvent.setup();
    const TextInputWithForm = TextInputWithFormFactory(false, false);
    const { getByRole, getByTestId } = render(<TextInputWithForm />);

    const button = getByRole("button");
    await user.click(button);

    await waitFor(() => {
      getByTestId("invalid");
    });

    cleanup();
  });

  test("shows a valid icon if validation succeeds", async () => {
    const user = userEvent.setup();
    const TextInputWithForm = TextInputWithFormFactory(false, false);
    const { getByRole, getByTestId } = render(<TextInputWithForm />);

    const input = getByRole("textbox");
    await user.type(input, "https://jho.pe");

    const button = getByRole("button");
    await user.click(button);

    await waitFor(() => {
      getByTestId("valid");
    });

    cleanup();
  });

  test("scan show a multiline input", async () => {
    const TextInputWithForm = TextInputWithFormFactory(true, false);
    const { getByTestId } = render(<TextInputWithForm />);

    getByTestId("multiline");

    cleanup();
  });

  test("can be disabled", async ({ ok }) => {
    const TextInputWithForm = TextInputWithFormFactory(false, true);
    const { getByRole } = render(<TextInputWithForm />);

    const input = getByRole("textbox");
    ok(input.hasAttribute("disabled"));

    cleanup();
  });

  test("can be disabled (multiline)", async ({ ok }) => {
    const TextInputWithForm = TextInputWithFormFactory(true, true);
    const { getByRole } = render(<TextInputWithForm />);

    const input = getByRole("textbox");
    ok(input.hasAttribute("disabled"));

    cleanup();
  });
});
