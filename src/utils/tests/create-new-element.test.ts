import { describe, it, expect } from "vitest";
import { createNewElement, getRandomColor } from "../create-new-element";

describe("getRandomColor", () => {
  it("returns a valid hex color string", () => {
    const color = getRandomColor();
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("returns different colors on multiple calls", () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    expect(color1).not.toBe(color2);
  });
});

describe("createNewElement", () => {
  it("creates an element within canvas bounds", () => {
    const canvasWidth = 400;
    const canvasHeight = 300;
    const el = createNewElement(canvasWidth, canvasHeight);
    expect(el.x).toBeGreaterThanOrEqual(0);
    expect(el.y).toBeGreaterThanOrEqual(0);
    expect(el.x + el.width).toBeLessThanOrEqual(canvasWidth);
    expect(el.y + el.height).toBeLessThanOrEqual(canvasHeight);
  });

  it("creates an element with valid properties", () => {
    const el = createNewElement(500, 500);
    expect(typeof el.id).toBe("string");
    expect(typeof el.x).toBe("number");
    expect(typeof el.y).toBe("number");
    expect(typeof el.width).toBe("number");
    expect(typeof el.height).toBe("number");
    expect(typeof el.color).toBe("string");
    expect(typeof el.rotation).toBe("number");
  });
});
