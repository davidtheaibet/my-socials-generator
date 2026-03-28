// Jaxon (BUC-50): Implement PNG export + watermark toggle.
//
// Requirements:
// - Client-side PNG export via html2canvas (install: npm i html2canvas).
// - Watermark rendered on canvas by default (isPaidUser = false).
// - isPaidUser flag is the only gate — no payment integration tonight.
//
// Acceptance:
// - exportPreview(rootElement) downloads the chat preview as 'screenshot.png'.
// - Watermark text composited onto the canvas when isPaidUser === false.
// - Works for both WhatsApp and Instagram DM outputs (template-agnostic).
// - Wire the #export-btn click in main.js once implemented.

export const isPaidUser = false;

const WATERMARK_TEXT = 'my-socials-generator.app';

export function exportPreview(_rootElement) {
  // TODO: implement
  // 1. const canvas = await html2canvas(rootElement, { useCORS: true, scale: 2 })
  // 2. if (!isPaidUser) draw WATERMARK_TEXT onto canvas.getContext('2d')
  // 3. canvas.toBlob(blob => { const url = URL.createObjectURL(blob); ... }, 'image/png')
  console.warn('exportPreview: stub — implement in BUC-50 (feat/jaxon-export)');
  alert('Export coming soon.');
}
