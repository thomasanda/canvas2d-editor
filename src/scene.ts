import { validateSceneData } from "./utils/basic-validation";
import { getHitElement } from "./utils/clicked-rectangle";
import {
  createNewElement,
  getRandomColor,
  type TElementType,
} from "./utils/create-new-element";
import { drawBorder, drawRectsBatch } from "./utils/draw";

class Scene {
  #elements: TElementType[];
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #hoveredElement: TElementType | null = null;
  #animationFrameId: number | null = null;
  duration: number = 1000;
  #speed: number = 0.03;

  constructor(canvas: HTMLCanvasElement) {
    this.#elements = [];
    this.#canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    this.#ctx = ctx;
    this.#ctx.imageSmoothingEnabled = false;
  }

  addElement(width: number, height: number) {
    const element = createNewElement(width, height);
    this.#elements.push(element);
    this.redraw();
  }

  #getAllElements() {
    return this.#elements;
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

  clearHoveredElement() {
    this.#hoveredElement = null;
    this.redraw();
  }

  redraw() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    drawRectsBatch(this.#ctx, this.#elements);
    if (this.#hoveredElement) {
      drawBorder(this.#ctx, this.#hoveredElement);
    }
  }

  startRotationAnimation() {
    const startTime = performance.now();
    const initialSpeed = this.#speed;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / this.duration, 1);

      // Slowdown only during the last second
      let easedSpeed = initialSpeed;
      const slowdownStart = this.duration - 1000;
      if (elapsed > slowdownStart) {
        const easeT = (elapsed - slowdownStart) / 1000;
        easedSpeed = initialSpeed * (1 - easeT);
      }

      this.#elements.forEach((element) => {
        element.rotation += easedSpeed;
      });
      this.redraw();

      if (t < 1) {
        this.#animationFrameId = requestAnimationFrame(animate);
      } else {
        this.#animationFrameId = null;
      }
    };

    if (!this.#animationFrameId) {
      this.#animationFrameId = requestAnimationFrame(animate);
    }
  }

  updateDuration(duration: number) {
    this.duration = duration;
  }

  downloadFile = () => {
    const data = { elements: this.#elements, duration: this.duration };
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.download = "scene.json";
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  uploadFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        if (validateSceneData(data)) {
          this.#elements = data.elements;
          this.duration = data.duration;
          this.redraw();
        }
      } catch (e) {
        console.error(e);
      }
    };
    input.click();
  };
}

export default Scene;
