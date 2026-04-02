import {
  DEFAULT_EDITOR_STATE,
  applyFieldUpdate,
  sanitizeEditorState,
} from "./state.js";
import { instagramDmTemplate } from "./templates/instagramDm.js";
import { whatsappTemplate } from "./templates/whatsapp.js";
import { snapchatTemplate } from "./templates/snapchat.js";
import { messengerTemplate } from "./templates/messenger.js";
import { tiktokTemplate } from "./templates/tiktok.js";
import { exportPreview, isPaidUser } from "./export.js";

const WATERMARK_TEXT = "my-socials-generator.app";

const form = document.querySelector("#editor-form");
const previewRoot = document.querySelector("#preview-root");
const laneInputs = Array.from(
  document.querySelectorAll('input[name="lane"]'),
);

const templateRegistry = {
  instagram: instagramDmTemplate,
  whatsapp: whatsappTemplate,
  snapchat: snapchatTemplate,
  messenger: messengerTemplate,
  tiktok: tiktokTemplate,
};

const laneStatusDefaults = {
  instagram: "Active now",
  whatsapp: "online",
  snapchat: "Snap Map",
  messenger: "Active now",
  tiktok: "Following you",
};

let activeTemplateId = "whatsapp";
let editorState = { ...DEFAULT_EDITOR_STATE };

const requestedLane = new URLSearchParams(window.location.search).get("lane");
if (requestedLane && templateRegistry[requestedLane]) {
  activeTemplateId = requestedLane;
  const defaultStatus = laneStatusDefaults[requestedLane];
  if (defaultStatus) {
    editorState = applyFieldUpdate(editorState, "status", defaultStatus);
  }
}

function render() {
  const activeTemplate = templateRegistry[activeTemplateId];
  const safeState = sanitizeEditorState(editorState);
  activeTemplate.render(previewRoot, safeState);

  if (!isPaidUser) {
    const wm = document.createElement("div");
    wm.className = "preview-watermark";
    wm.setAttribute("data-html2canvas-ignore", "true");
    wm.textContent = WATERMARK_TEXT;
    previewRoot.appendChild(wm);
  }
}

function syncFormWithState() {
  const formElements = ["name", "avatar", "message", "timestamp", "status"];
  formElements.forEach((fieldName) => {
    const field = form.elements.namedItem(fieldName);
    if (field) {
      field.value = editorState[fieldName];
    }
  });
}

laneInputs.forEach((input) => {
  input.checked = input.value === activeTemplateId;
  input.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    activeTemplateId = target.value;

    const defaultStatus = laneStatusDefaults[activeTemplateId];
    if (defaultStatus) {
      editorState = applyFieldUpdate(editorState, "status", defaultStatus);
    }

    syncFormWithState();
    render();
  });
});

form.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
    return;
  }

  editorState = applyFieldUpdate(editorState, target.name, target.value);
  render();
});

syncFormWithState();
render();

document.getElementById("export-btn")?.addEventListener("click", async () => {
  await exportPreview(previewRoot);
});
