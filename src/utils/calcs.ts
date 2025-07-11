export const getRotatedBoundingBox = (
  rotation: number,
  width: number,
  height: number,
) => {
  const absCos = Math.abs(Math.cos(rotation));
  const absSin = Math.abs(Math.sin(rotation));
  const bboxWidth = width * absCos + height * absSin;
  const bboxHeight = width * absSin + height * absCos;
  return { bboxWidth, bboxHeight };
};

export const clampCenter = (
  bboxWidth: number,
  rectX: number,
  rectWidth: number,
  canvasWidth: number,
  rectY: number,
  rectHeight: number,
  bboxHeight: number,
  canvasHeight: number,
) => {
  const centerX = Math.max(
    bboxWidth / 2,
    Math.min(rectX + rectWidth / 2, canvasWidth - bboxWidth / 2),
  );
  const centerY = Math.max(
    bboxHeight / 2,
    Math.min(rectY + rectHeight / 2, canvasHeight - bboxHeight / 2),
  );

  return { centerX, centerY };
};
