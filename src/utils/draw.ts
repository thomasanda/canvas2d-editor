import type { TElementType } from "./create-new-element";

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  element: TElementType,
) => {
  const { x, y, width, height, color, rotation } = element;

  const centerX = (x + width / 2) | 0;
  const centerY = (y + height / 2) | 0;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);
  ctx.fillStyle = color;
  ctx.fillRect((-width / 2) | 0, (-height / 2) | 0, width, height);
  ctx.restore();
};

export const drawBorder = (
  ctx: CanvasRenderingContext2D,
  element: TElementType,
) => {
  const { x, y, width, height, rotation } = element;
  const centerX = (x + width / 2) | 0;
  const centerY = (y + height / 2) | 0;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);
  ctx.strokeStyle = "#7048e8";
  ctx.lineWidth = 3;
  ctx.strokeRect((-width / 2) | 0, (-height / 2) | 0, width, height);
  ctx.restore();
};
