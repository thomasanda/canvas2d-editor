import type { TElementType } from "./create-new-element";

export const drawRectsBatch = (
  ctx: CanvasRenderingContext2D,
  elements: TElementType[],
) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const { x, y, width, height, rotation, color } = element;

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.restore();
  }
};

export const drawBorder = (
  ctx: CanvasRenderingContext2D,
  element: TElementType,
) => {
  const { x, y, width, height, rotation } = element;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);
  ctx.strokeStyle = "#7048e8";
  ctx.lineWidth = 3;
  ctx.strokeRect(-width / 2, -height / 2, width, height);
  ctx.restore();
};
