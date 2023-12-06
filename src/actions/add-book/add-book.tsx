import React from "react";
import { createRoot } from "react-dom/client";
import AddBookAction from "../../components/AddBookAction";
import { sendMessage } from "../../services/messages";
import { getTabInfo } from "../../services/tab";

// The entry point for the extension.

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <AddBookAction sendMessage={sendMessage} getTabInfo={getTabInfo} />,
);
