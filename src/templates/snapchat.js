import { createChatTemplate } from "./templateEngine.js";

export const snapchatTemplate = createChatTemplate({
  id: "snapchat",
  label: "Snapchat",
  phoneClass: "phone--snapchat",
  innerClass: "phone__inner--snapchat",
  topbarClass: "chat-topbar--snapchat",
  bodyClass: "chat-body--snapchat",
  bubbleClass: "message-bubble--snapchat",
  messagePlacement: "right",
  composerText: "Send a chat",
});
