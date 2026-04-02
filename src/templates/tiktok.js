import { createChatTemplate } from "./templateEngine.js";

export const tiktokTemplate = createChatTemplate({
  id: "tiktok",
  label: "TikTok",
  phoneClass: "phone--tiktok",
  innerClass: "phone__inner--tiktok",
  topbarClass: "chat-topbar--tiktok",
  bodyClass: "chat-body--tiktok",
  bubbleClass: "message-bubble--tiktok",
  messagePlacement: "right",
  composerText: "Send a message...",
});
