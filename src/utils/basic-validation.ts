import type { TElementType } from "./create-new-element";

export const validateSceneData = (data: {
  elements: TElementType[];
  duration: number;
}): data is { elements: TElementType[]; duration: number } => {
  if (
    typeof data !== "object" ||
    data === null ||
    !Array.isArray(data.elements) ||
    typeof data.duration !== "number"
  ) {
    return false;
  }
  return true;
};
