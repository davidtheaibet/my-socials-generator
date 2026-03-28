import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_EDITOR_STATE,
  applyFieldUpdate,
  initialsFromName,
  sanitizeEditorState,
} from "../src/state.js";

test("sanitizeEditorState falls back to defaults for empty values", () => {
  const sanitized = sanitizeEditorState({
    name: "  ",
    avatar: " https://example.com/avatar.png ",
    message: "",
    timestamp: "   ",
    status: "  ",
  });

  assert.equal(sanitized.name, DEFAULT_EDITOR_STATE.name);
  assert.equal(sanitized.avatar, "https://example.com/avatar.png");
  assert.equal(sanitized.message, DEFAULT_EDITOR_STATE.message);
  assert.equal(sanitized.timestamp, DEFAULT_EDITOR_STATE.timestamp);
  assert.equal(sanitized.status, DEFAULT_EDITOR_STATE.status);
});

test("applyFieldUpdate updates one field without mutating previous state", () => {
  const initial = { ...DEFAULT_EDITOR_STATE };
  const next = applyFieldUpdate(initial, "message", "Edited");

  assert.equal(next.message, "Edited");
  assert.equal(initial.message, DEFAULT_EDITOR_STATE.message);
});

test("initialsFromName returns two-letter initials", () => {
  assert.equal(initialsFromName("Jessie Parker"), "JP");
  assert.equal(initialsFromName("Single"), "S");
  assert.equal(initialsFromName("   "), "?");
});
