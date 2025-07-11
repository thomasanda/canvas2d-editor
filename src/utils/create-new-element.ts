export type TElementType = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
};

export const getRandomColor = () => {
  const randColor = ((Math.random() * 0x1000000) | 0)
    .toString(16)
    .padStart(6, "0");
  return `#${randColor}`;
};

export const createNewElement = (
  canvasWidth: number,
  canvasHeight: number,
): TElementType => {
  const random = (min: number, max: number) =>
    ((Math.random() * (max - min + 1)) | 0) + min;

  const width = random(20, Math.max(20, Math.floor(canvasWidth / 2)));
  const height = random(20, Math.max(20, Math.floor(canvasHeight / 2)));
  const x = random(0, canvasWidth - width);
  const y = random(0, canvasHeight - height);
  const rotation = ((Math.random() * 360 - 180) * Math.PI) / 180;

  return {
    id: crypto.randomUUID(),
    x,
    y,
    width,
    height,
    color: getRandomColor(),
    rotation,
  };
};
