import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { stateAtom } from "../../store";
import { TestProvider } from "../../utils";
import AddBookForm from "./AddBookForm";

const meta: Meta<typeof AddBookForm> = {
  component: AddBookForm,
};

export default meta;
type Story = StoryObj<typeof AddBookForm>;

export const Default: Story = {
  render: () => (
    <TestProvider initialValues={[]}>
      <AddBookForm
        sendMessage={async () => ({
          kind: "book",
          payload: "",
        })}
      />
    </TestProvider>
  ),
};

export const SendingMessage: Story = {
  render: () => (
    <TestProvider initialValues={[[stateAtom, "SendingMessage"]]}>
      <AddBookForm
        sendMessage={async () => ({
          kind: "book",
          payload: "",
        })}
      />
    </TestProvider>
  ),
};
