import {
  DEFAULT_EDITOR_STATE,
  applyFieldUpdate,
  sanitizeEditorState,
} from "./state.js";
import { instagramDmTemplate } from "./templates/instagramDm.js";
import { whatsappTemplate } from "./templates/whatsapp.js";
import { exportPreview } from "./export.js";

const form = document.querySelector("#editor-form");
const previewRoot = document.querySelector("#preview-root");
const laneInputs = Array.from(
  document.querySelectorAll('input[name="lane"]'),
);

const templateRegistry = {
  instagram: instagramDmTemplate,
  whatsapp: whatsappTemplate,
};

let activeTemplateId = "whatsapp";
let editorState = { ...DEFAULT_EDITOR_STATE };

const requestedLane = new URLSearchParams(window.location.search).get("lane");
if (requestedLane && templateRegistry[requestedLane]) {
  activeTemplateId = requestedLane;
  if (requestedLane === "instagram") {
    editorState = applyFieldUpdate(editorState, "status", "Active now");
  }
}

function render() {
  const activeTemplate = templateRegistry[activeTemplateId];
  const safeState = sanitizeEditorState(editorState);
  activeTemplate.render(previewRoot, safeState);
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

    // Lane-specific defaults keep previews realistic while sharing one state model.
    if (activeTemplateId === "instagram") {
      editorState = applyFieldUpdate(editorState, "status", "Active now");
    } else if (activeTemplateId === "whatsapp") {
      editorState = applyFieldUpdate(editorState, "status", "online");
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
