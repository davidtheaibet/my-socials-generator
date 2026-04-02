import { createChatTemplate } from "./templateEngine.js";

export const messengerTemplate = createChatTemplate({
  id: "messenger",
  label: "Messenger",
  phoneClass: "phone--messenger",
  innerClass: "phone__inner--messenger",
  topbarClass: "chat-topbar--messenger",
  bodyClass: "chat-body--messenger",
  bubbleClass: "message-bubble--messenger",
  messagePlacement: "right",
  composerText: "Aa",
});
