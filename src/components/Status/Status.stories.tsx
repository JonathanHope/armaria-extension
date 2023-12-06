import { CheckCircle } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TestProvider } from "../../utils";
import Status from "./Status";

const meta: Meta<typeof Status> = {
  component: Status,
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = {
  render: () => (
    <TestProvider initialValues={[]}>
      <Status text="Book Added to Armaria">
        <CheckCircle size={48} weight="bold" />
      </Status>
    </TestProvider>
  ),
};
