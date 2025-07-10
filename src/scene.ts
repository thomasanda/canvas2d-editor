// import { sceneCoordsToViewportCoords } from "./utils/coords";
import { getRandomColor, type TElementType } from "./utils/create-new-element";
import { drawRect } from "./utils/draw";

class Scene {
  #elements: TElementType[];
  #canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.#elements = [];
    this.#canvas = canvas;
  }

  addElement(element: TElementType) {
    this.#elements.push(element);
  }

  getAllElements() {
    return this.#elements;
  }

  clearCanvas() {
    const ctx = this.#canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
  }

  updateElement(id: string) {
    const index = this.#elements.findIndex((el) => el.id === id);
    this.#elements[index] = {
      ...this.#elements[index],
      color: getRandomColor(),
    };
  }

  redraw() {
    this.clearCanvas();
    this.#elements.forEach((element) => {
      drawRect(
        this.#canvas,
        element.x,
        element.y,
        element.width,
        element.height,
        element.color,
      );
    });
  }
}

export default Scene;
