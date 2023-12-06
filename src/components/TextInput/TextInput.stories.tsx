import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { TestProvider } from "../../utils";
import TextInput from "./TextInput";

const meta: Meta<typeof TextInput> = {
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

const schema = z.object({
  url: z.string().url(),
});

type Inputs = z.infer<typeof schema>;

const TextInputWithHooksFactory = (
  multiline: boolean,
  isSubmitted: boolean,
  disabled: boolean,
  errors: FieldErrors<Inputs>,
) =>
  function TextInputWithHooks() {
    const { register } = useForm<Inputs>({
      resolver: zodResolver(schema),
    });

    return (
      <TestProvider initialValues={[]}>
        <TextInput
          name="url"
          label="URL"
          placeholder="https://example.com"
          multiline={multiline}
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          disabled={disabled}
        />
      </TestProvider>
    );
  };

export const Editable: Story = {
  render: () => {
    const TextInputWithHooks = TextInputWithHooksFactory(
      false,
      false,
      false,
      {},
    );
    return <TextInputWithHooks />;
  },
};

export const EditableMultline: Story = {
  render: () => {
    const TextInputWithHooks = TextInputWithHooksFactory(
      true,
      false,
      false,
      {},
    );
    return <TextInputWithHooks />;
  },
};

export const Invalid: Story = {
  render: () => {
    const TextInputWithHooks = TextInputWithHooksFactory(false, false, false, {
      url: { message: "Invalid url", type: "" },
    });

    return <TextInputWithHooks />;
  },
};

export const InvalidMultline: Story = {
  render: () => {
    const TextInputWithHooks = TextInputWithHooksFactory(true, false, false, {
      url: { message: "Invalid url", type: "" },
    });

    return <TextInputWithHooks />;
  },
};

export const Submitted: Story = {
  render: () => {
    const TextInputWithHooks = TextInputWithHooksFactory(
      false,
      true,
      false,
      {},
    );
    return <TextInputWithHooks />;
  },
};

export const SubmittedMultiline: Story = {
  render: () => {
    const TextInputWithHooks = TextInputWithHooksFactory(true, true, false, {});
    return <TextInputWithHooks />;
  },
};

export const Disabled: Story = {
  render: () => {
    const TextInputWithHooks = TextInputWithHooksFactory(
      false,
      false,
      true,
      {},
    );
    return <TextInputWithHooks />;
  },
};

export const DisabledMultiline: Story = {
  render: () => {
    const TextInputWithHooks = TextInputWithHooksFactory(true, false, true, {});
    return <TextInputWithHooks />;
  },
};
