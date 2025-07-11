import { clampCenter, getRotatedBoundingBox } from "./calcs";
import type { TElementType } from "./create-new-element";

const elementHit = (el: TElementType, xCoord: number, yCoord: number) => {
  const centerX = el.x + el.width / 2;
  const centerY = el.y + el.height / 2;

  const dx = xCoord - centerX;
  const dy = yCoord - centerY;

  const cos = Math.cos(-el.rotation);
  const sin = Math.sin(-el.rotation);
  const localX = dx * cos - dy * sin;
  const localY = dx * sin + dy * cos;

  return Math.abs(localX) <= el.width / 2 && Math.abs(localY) <= el.height / 2;
};

export const getHitElement = (
  elements: TElementType[],
  xCoord: number,
  yCoord: number,
) => {
  return [...elements].reverse().find((el) => elementHit(el, xCoord, yCoord));
};
