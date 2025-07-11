import type { TElementType } from "./create-new-element";

export const drawRect = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  rotation: number,
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);
  ctx.fillStyle = color;
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.restore();
};

export const drawBorder = (
  canvas: HTMLCanvasElement,
  element: TElementType,
) => {
  const { x, y, width, height, rotation } = element;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
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
