import { createChatTemplate } from "./templateEngine.js";

export const whatsappTemplate = createChatTemplate({
  id: "whatsapp",
  label: "WhatsApp",
  phoneClass: "phone--whatsapp",
  innerClass: "phone__inner--whatsapp",
  topbarClass: "chat-topbar--whatsapp",
  bodyClass: "chat-body--whatsapp",
  bubbleClass: "message-bubble--whatsapp",
  messagePlacement: "right",
  composerText: "",
});
