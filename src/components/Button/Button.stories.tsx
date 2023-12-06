import { ArchiveBox, Hourglass } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TestProvider } from "../../utils";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => (
    <TestProvider initialValues={[]}>
      <Button text="Save">
        <ArchiveBox size={22} weight="bold" />
      </Button>
    </TestProvider>
  ),
};

export const Disabled: Story = {
  render: () => (
    <TestProvider initialValues={[]}>
      <Button text="Save" disabled={true}>
        <Hourglass size={22} weight="bold" />
      </Button>
    </TestProvider>
  ),
};
