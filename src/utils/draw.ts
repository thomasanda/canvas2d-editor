import type { TElementType } from "./create-new-element";

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  element: TElementType,
) => {
  const { x, y, width, height, color, rotation } = element;

  const centerX = Math.floor(x + width / 2);
  const centerY = Math.floor(y + height / 2);
  const flooredWidth = Math.floor(width);
  const flooredHeight = Math.floor(height);

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);
  ctx.fillStyle = color;
  ctx.fillRect(
    Math.floor(-flooredWidth / 2),
    Math.floor(-flooredHeight / 2),
    flooredWidth,
    flooredHeight,
  );
  ctx.restore();
};

export const drawBorder = (
  ctx: CanvasRenderingContext2D,
  element: TElementType,
) => {
  const { x, y, width, height, rotation } = element;
  const centerX = Math.floor(x + width / 2);
  const centerY = Math.floor(y + height / 2);
  const flooredWidth = Math.floor(width);
  const flooredHeight = Math.floor(height);

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);
  ctx.strokeStyle = "#7048e8";
  ctx.lineWidth = 3;
  ctx.strokeRect(
    Math.floor(-flooredWidth / 2),
    Math.floor(-flooredHeight / 2),
    flooredWidth,
    flooredHeight,
  );
  ctx.restore();
};
