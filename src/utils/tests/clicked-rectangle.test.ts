import { describe, it, expect } from "vitest";
import { getRandomColor, type TElementType } from "../create-new-element";
import { getHitElement } from "../clicked-rectangle";

const makeElement = (props: Partial<TElementType> = {}): TElementType => ({
  id: crypto.randomUUID(),
  x: 10,
  y: 20,
  width: 100,
  height: 50,
  rotation: 0,
  color: getRandomColor(),
  ...props,
});

describe("getHitElement", () => {
  it("returns the topmost element hit by the coordinates", () => {
    const elements = [
      makeElement({ x: 0, y: 0, width: 50, height: 50 }),
      makeElement({ x: 0, y: 0, width: 50, height: 50 }),
    ];
    const hit = getHitElement(elements, 45, 45);
    expect(hit).toBe(elements[1]);
  });

  it("returns undefined if no element is hit", () => {
    const elements = [makeElement({ x: 0, y: 0, width: 50, height: 50 })];
    const hit = getHitElement(elements, 100, 100);
    expect(hit).toBeUndefined();
  });

  it("hits edge of rotated rectangle", () => {
    const element = {
      id: "611553aa-0ec3-48b5-ae6c-ab1832806f9a",
      x: 767,
      y: 567,
      width: 148,
      height: 673,
      color: "#8582fc",
      rotation: 0.9386567035396925,
    };
    const hit = getHitElement([element], 979.28125, 758.1875);
    expect(hit).toBe(element);
  });
});
