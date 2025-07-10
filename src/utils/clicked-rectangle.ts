import type { TElementType } from "./create-new-element";

const elementHit = (el: TElementType, xCoord: number, yCoord: number) => {
  return (
    xCoord >= el.x &&
    xCoord <= el.x + el.width &&
    yCoord >= el.y &&
    yCoord <= el.y + el.height
  );
};

export const getClickedRectangle = (
  elements: TElementType[],
  xCoord: number,
  yCoord: number,
) => {
  return [...elements].reverse().find((el) => elementHit(el, xCoord, yCoord));
};
