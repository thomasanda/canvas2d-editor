import type ElementManager from "./element-manager";
import { drawBorder, drawRect } from "./utils/draw";

class Renderer {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #elementManager: ElementManager;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    elementManager: ElementManager,
  ) {
    this.#canvas = canvas;
    this.#ctx = ctx;
    this.#elementManager = elementManager;
  }

  redraw() {
    const elements = this.#elementManager.getElements();
    const hoveredElement = this.#elementManager.getHoveredElement();

    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    elements.forEach((element) => {
      drawRect(this.#ctx, element);
    });

    if (hoveredElement) {
      drawBorder(this.#ctx, hoveredElement);
    }
  }
}

export default Renderer;
