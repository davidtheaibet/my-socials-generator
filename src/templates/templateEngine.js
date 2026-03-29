import { initialsFromName } from "../state.js";

export function createChatTemplate(config) {
  return {
    id: config.id,
    label: config.label,
    render(root, state) {
      root.innerHTML = "";

      const phone = document.createElement("div");
      phone.className = "phone";
      phone.classList.add(config.phoneClass);

      const inner = document.createElement("div");
      inner.className = "phone__inner";
      inner.classList.add(config.innerClass);

      const topbar = document.createElement("header");
      topbar.className = "chat-topbar";
      topbar.classList.add(config.topbarClass);

      const avatar = document.createElement("div");
      avatar.className = "chat-avatar";
      if (state.avatar) {
        const img = document.createElement("img");
        img.src = state.avatar;
        img.alt = `${state.name} profile image`;
        img.addEventListener("error", () => {
          avatar.textContent = initialsFromName(state.name);
        });
        avatar.appendChild(img);
      } else {
        avatar.textContent = initialsFromName(state.name);
      }

      const meta = document.createElement("div");
      meta.className = "chat-meta";
      const name = document.createElement("strong");
      name.textContent = state.name;
      const status = document.createElement("small");
      status.textContent = state.status;
      meta.append(name, status);

      topbar.append(avatar, meta);

      const body = document.createElement("section");
      body.className = "chat-body";
      body.classList.add(config.bodyClass);

      const bubble = document.createElement("article");
      bubble.className = "message-bubble";
      bubble.classList.add(config.bubbleClass);
      if (config.messagePlacement === "left") {
        bubble.classList.add("message-bubble--left");
      }
      const message = document.createElement("p");
      message.textContent = state.message;
      const timestamp = document.createElement("small");
      timestamp.className = "bubble-time";
      timestamp.textContent = state.timestamp;

      bubble.append(message, timestamp);
      body.appendChild(bubble);

      inner.append(topbar, body);

      if (config.composerText) {
        const composer = document.createElement("div");
        composer.className = "chat-composer";
        composer.textContent = config.composerText;
        inner.appendChild(composer);
      }

      phone.appendChild(inner);
      root.appendChild(phone);
    },
  };
}
