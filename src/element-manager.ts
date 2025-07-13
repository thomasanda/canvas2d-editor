import { getHitElement } from "./utils/clicked-rectangle";
import {
  createNewElement,
  getRandomColor,
  type TElementType,
} from "./utils/create-new-element";

class ElementManager {
  #elements: TElementType[];
  #hoveredElement: TElementType | null = null;

  constructor(initialElements: TElementType[] = []) {
    this.#elements = initialElements;
  }

  addElement(width: number, height: number) {
    const element = createNewElement(width, height);
    this.#elements.push(element);
  }

  updateElement(clientX: number, clientY: number) {
    const hitElement = getHitElement(this.#elements, clientX, clientY);
    if (hitElement) {
      hitElement.color = getRandomColor();
    }
  }

  setHoveredElement(clientX: number, clientY: number) {
    const hitElement = getHitElement(this.#elements, clientX, clientY);

    if (hitElement && this.#hoveredElement !== hitElement) {
      this.#hoveredElement = hitElement;
    } else if (!hitElement && this.#hoveredElement !== null) {
      this.#hoveredElement = null;
    }
  }

  clearHoveredElement() {
    this.#hoveredElement = null;
  }

  getElements() {
    return this.#elements;
  }

  getHoveredElement() {
    return this.#hoveredElement;
  }

  clearElements() {
    this.#elements = [];
    this.#hoveredElement = null;
  }

  addElementsFromData(elements: TElementType[]) {
    this.#elements = elements;
  }
}

export default ElementManager;
