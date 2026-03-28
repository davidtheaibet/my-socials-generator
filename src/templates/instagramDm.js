import { createChatTemplate } from "./templateEngine.js";

export const instagramDmTemplate = createChatTemplate({
  id: "instagram",
  label: "Instagram DM",
  phoneClass: "phone--instagram",
  innerClass: "phone__inner--instagram",
  topbarClass: "chat-topbar--instagram",
  bodyClass: "chat-body--instagram",
  bubbleClass: "message-bubble--instagram",
  messagePlacement: "left",
  composerText: "Message...",
});
