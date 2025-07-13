import { validateSceneData } from "./utils/basic-validation";
import { getHitElement } from "./utils/clicked-rectangle";
import { FILE_NAME, InputType, MimeType } from "./utils/constants";
import {
  createNewElement,
  getRandomColor,
  type TElementType,
} from "./utils/create-new-element";
import { drawBorder, drawRect } from "./utils/draw";

class Scene {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #elements: TElementType[] = [];
  #hoveredElement: TElementType | null = null;
  #animationFrameId: number | null = null;
  duration: number = 1000;
  #speed: number = 0.03;
  #listeners: Set<() => void> = new Set();

  #debounce = <T extends unknown[]>(
    callback: (...args: T) => void,
    wait: number,
  ) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return (...args: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  };

  #saveToLocalStorage = this.#debounce(() => {
    try {
      const data = { elements: this.#elements, duration: this.duration };
      localStorage.setItem("canvasData", JSON.stringify(data));
    } catch (error) {
      console.warn(`Failed to store in local storage: ${error}`);
    }
  }, 500);

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    this.#ctx = ctx;
  }

  addElement(width: number, height: number) {
    const element = createNewElement(width, height);
    this.#elements.push(element);
    this.redraw();
  }

  updateElement(clientX: number, clientY: number) {
    const hitElement = getHitElement(this.#elements, clientX, clientY);
    if (hitElement) {
      const index = this.#elements.findIndex((el) => el.id === hitElement.id);
      if (index !== -1) {
        this.#elements[index] = {
          ...this.#elements[index],
          color: getRandomColor(),
        };
        this.#saveToLocalStorage();
      }
      this.redraw();
    }
  }

  setHoveredElement(clientX: number, clientY: number) {
    const hitElement = getHitElement(this.#elements, clientX, clientY);

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
    this.#elements.forEach((element) => {
      drawRect(this.#ctx, element);
    });

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
        this.#saveToLocalStorage();
      }
    };

    if (!this.#animationFrameId) {
      this.#animationFrameId = requestAnimationFrame(animate);
    }
  }

  downloadFile = () => {
    try {
      const data = { elements: this.#elements, duration: this.duration };
      const blob = new Blob([JSON.stringify(data)], {
        type: MimeType.Json,
      });
      const a = document.createElement("a");
      a.download = FILE_NAME;
      a.href = URL.createObjectURL(blob);
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (error) {
      console.error(`Failed to download file: ${error}`);
    }
  };

  uploadFile = () => {
    const input = document.createElement("input");
    input.type = InputType.File;
    input.accept = MimeType.Json;
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
          this.#notifyListeners();
        } else {
          console.error("Invalid scene format");
        }
      } catch (e) {
        console.error(e);
      }
    };
    input.click();
  };

  addListener(listener: () => void) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  #notifyListeners() {
    this.#listeners.forEach((listener) => listener());
  }

  updateDuration(duration: number) {
    this.duration = duration;
    this.#notifyListeners();
    this.#saveToLocalStorage();
  }

  clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#elements = [];
    localStorage.clear();
    if (this.#animationFrameId) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#animationFrameId = null;
    }
  }

  loadFromLocalStorage() {
    try {
      const data = JSON.parse(localStorage.getItem("canvasData") ?? "{}");
      this.#elements = data.elements || [];
      this.duration = data.duration || 1000;
    } catch (error) {
      console.warn("Failed to load from storage:", error);
      this.#elements = [];
      this.duration = 1000;
    }
  }
}

export default Scene;
