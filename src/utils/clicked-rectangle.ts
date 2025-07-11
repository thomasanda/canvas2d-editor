import type { TElementType } from "./create-new-element";

const elementHit = (el: TElementType, xCoord: number, yCoord: number) => {
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;

  const dx = xCoord - cx;
  const dy = yCoord - cy;

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
