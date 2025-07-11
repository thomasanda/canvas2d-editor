// import { sceneCoordsToViewportCoords } from "./utils/coords";
import { getHitElement } from "./utils/clicked-rectangle";
import {
  createNewElement,
  getRandomColor,
  type TElementType,
} from "./utils/create-new-element";
import { drawBorder, drawRect } from "./utils/draw";

class Scene {
  #elements: TElementType[];
  #canvas: HTMLCanvasElement;
  #hoveredElement: TElementType | null = null;
  #redrawScheduled = false;

  constructor(canvas: HTMLCanvasElement) {
    this.#elements = [];
    this.#canvas = canvas;
  }

  #scheduleRedraw() {
    if (!this.#redrawScheduled) {
      this.#redrawScheduled = true;
      requestAnimationFrame(() => {
        this.redraw();
        this.#redrawScheduled = false;
      });
    }
  }

  addElement(width: number, height: number) {
    const element = createNewElement(width, height);
    this.#elements.push(element);
    this.#scheduleRedraw();
  }

  #getAllElements() {
    return this.#elements;
  }

  #clearCanvas() {
    const ctx = this.#canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
  }

  updateElement(clientX: number, clientY: number) {
    const elements = this.#getAllElements();
    const hitElement = getHitElement(elements, clientX, clientY);
    if (hitElement) {
      const index = this.#elements.findIndex((el) => el.id === hitElement.id);
      this.#elements[index] = {
        ...this.#elements[index],
        color: getRandomColor(),
      };
      this.redraw();
    }
  }

  setHoveredElement(clientX: number, clientY: number) {
    const elements = this.#getAllElements();
    const hitElement = getHitElement(elements, clientX, clientY);

    if (hitElement && this.#hoveredElement !== hitElement) {
      this.#hoveredElement = hitElement;
      this.redraw();
    } else if (!hitElement && this.#hoveredElement !== null) {
      this.#hoveredElement = null;
      this.redraw();
    }
  }

  redraw() {
    this.#clearCanvas();
    this.#elements.forEach((element) => {
      drawRect(
        this.#canvas,
        element.x,
        element.y,
        element.width,
        element.height,
        element.color,
        element.rotation,
      );
    });
    if (this.#hoveredElement) {
      drawBorder(this.#canvas, this.#hoveredElement);
    }
    console.log(this.#elements);
  }
}

export default Scene;
