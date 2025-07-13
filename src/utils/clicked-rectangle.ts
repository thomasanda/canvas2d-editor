import { DPR } from "./constants";
import type { TElementType } from "./create-new-element";

const elementHit = (el: TElementType, xCoord: number, yCoord: number) => {
  const { x, y, width, height, rotation } = el;
  const centerX = (x + width / 2) | 0;
  const centerY = (y + height / 2) | 0;

  const dx = xCoord - centerX;
  const dy = yCoord - centerY;

  const cos = Math.cos(-rotation);
  const sin = Math.sin(-rotation);
  const localX = dx * cos - dy * sin;
  const localY = dx * sin + dy * cos;

  return Math.abs(localX) <= width / 2 && Math.abs(localY) <= height / 2;
};

export const getHitElement = (
  elements: TElementType[],
  xCoord: number,
  yCoord: number,
) => {
  return [...elements]
    .reverse()
    .find((el) => elementHit(el, xCoord * DPR, yCoord * DPR));
};
