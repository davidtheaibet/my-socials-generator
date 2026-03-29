export const DEFAULT_EDITOR_STATE = {
  name: "Alex Carter",
  avatar: "",
  message: "Can we lock this launch for tomorrow morning?",
  timestamp: "9:41",
  status: "online",
};

export function sanitizeEditorState(state) {
  return {
    name: (state.name || "").trim() || DEFAULT_EDITOR_STATE.name,
    avatar: (state.avatar || "").trim(),
    message: (state.message || "").trim() || DEFAULT_EDITOR_STATE.message,
    timestamp: (state.timestamp || "").trim() || DEFAULT_EDITOR_STATE.timestamp,
    status: (state.status || "").trim() || DEFAULT_EDITOR_STATE.status,
  };
}

export function applyFieldUpdate(currentState, field, value) {
  return {
    ...currentState,
    [field]: value,
  };
}

export function initialsFromName(name) {
  const tokens = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (!tokens.length) {
    return "?";
  }

  return tokens.map((token) => token[0].toUpperCase()).join("");
}
