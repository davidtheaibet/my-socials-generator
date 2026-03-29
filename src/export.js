import html2canvas from 'html2canvas';

export const isPaidUser = false;

const WATERMARK_TEXT = 'my-socials-generator.app';

function drawWatermark(canvas) {
  const ctx = canvas.getContext('2d');
  const padding = 12;
  const fontSize = Math.max(12, Math.round(canvas.width * 0.03));

  ctx.save();
  ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.textBaseline = 'bottom';

  const textWidth = ctx.measureText(WATERMARK_TEXT).width;
  const x = canvas.width - textWidth - padding;
  const y = canvas.height - padding;

  // subtle shadow for legibility on any background
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 3;
  ctx.fillText(WATERMARK_TEXT, x, y);
  ctx.restore();
}

export async function exportPreview(rootElement) {
  try {
    const canvas = await html2canvas(rootElement, {
      useCORS: true,
      scale: 2,
      backgroundColor: null,
      logging: false,
    });

    if (!isPaidUser) {
      drawWatermark(canvas);
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'screenshot.png';
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  } catch (err) {
    console.error('exportPreview failed:', err);
    alert('Export failed. Please try again.');
  }
}
