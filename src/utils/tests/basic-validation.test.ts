import { describe, it, expect } from "vitest";
import { validateSceneData } from "../basic-validation";
import type { TElementType } from "../create-new-element";

type TValidationData = {
  elements: TElementType[];
  duration: number;
};

// Test basic validation function

describe("validateSceneData", () => {
  it("returns true for valid data", () => {
    const valid = {
      elements: [],
      duration: 100,
    };
    expect(validateSceneData(valid)).toBe(true);
  });

  it("returns false for missing elements", () => {
    const invalid = {
      duration: 100,
    };
    expect(validateSceneData(invalid as TValidationData)).toBe(false);
  });

  it("returns false for missing duration", () => {
    const invalid = {
      elements: [] as TElementType[],
    };
    expect(validateSceneData(invalid as TValidationData)).toBe(false);
  });

  it("returns false for non-object", () => {
    expect(validateSceneData(null as unknown as TValidationData)).toBe(false);
    expect(validateSceneData(42 as unknown as TValidationData)).toBe(false);
    expect(validateSceneData("string" as unknown as TValidationData)).toBe(
      false,
    );
  });

  it("returns false for wrong types", () => {
    expect(
      validateSceneData({
        elements: "not array",
        duration: "not number",
      } as unknown as TValidationData),
    ).toBe(false);
  });
});
