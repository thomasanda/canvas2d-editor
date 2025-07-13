import Animator from "./animator";
import ElementManager from "./element-manager";
import FileManager from "./file-manager";
import Renderer from "./renderer";
import SceneStorage from "./scene-storage";

interface SceneDependencies {
  elementManager?: ElementManager;
  sceneStorage?: SceneStorage;
  renderer?: Renderer;
  animator?: Animator;
  fileManager?: FileManager;
}

class Scene {
  #elementManager!: ElementManager;
  #sceneStorage!: SceneStorage;
  #renderer!: Renderer;
  #animator!: Animator;
  #fileManager!: FileManager;
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;

  duration: number = 1000;
  #listeners: Set<() => void> = new Set();

  constructor(canvas: HTMLCanvasElement, dependencies: SceneDependencies = {}) {
    this.#canvas = canvas;
    this.#ctx = this.#getContext(canvas);
    this.#initializeDependencies(dependencies);
  }

  redraw(): void {
    this.#renderer.redraw();
  }

  startRotationAnimation(): void {
    this.#animator.startRotationAnimation(this.duration);
  }

  addElement(width: number, height: number): void {
    this.#elementManager.addElement(width, height);
    this.#saveAndRedraw();
  }

  updateElement(clientX: number, clientY: number): void {
    this.#elementManager.updateElement(clientX, clientY);
    this.#saveAndRedraw();
  }

  setHoveredElement(clientX: number, clientY: number): void {
    this.#elementManager.setHoveredElement(clientX, clientY);
    this.redraw();
  }

  clearHoveredElement(): void {
    this.#elementManager.clearHoveredElement();
    this.redraw();
  }

  updateDuration(duration: number = 1000): void {
    this.duration = duration;
    this.notifyListeners();
    this.#saveState();
  }

  addListener(listener: () => void): () => void {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  notifyListeners(): void {
    this.#listeners.forEach((listener) => listener());
  }

  clearCanvas(): void {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#elementManager.clearElements();
    this.#animator.cancelAnimation();
    this.#saveState();
  }

  loadFromLocalStorage(): void {
    this.#sceneStorage.loadFromLocalStorage(
      this.#elementManager,
      (duration) => {
        this.duration = duration;
      },
    );
  }

  downloadFile = (): void => {
    this.#fileManager.downloadFile();
  };

  uploadFile = (): void => {
    this.#fileManager.uploadFile();
  };

  #getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    return ctx;
  }

  #initializeDependencies(deps: SceneDependencies): void {
    this.#elementManager = deps.elementManager ?? new ElementManager([]);
    this.#sceneStorage = deps.sceneStorage ?? new SceneStorage();
    this.#renderer =
      deps.renderer ??
      new Renderer(this.#canvas, this.#ctx, this.#elementManager);
    this.#animator =
      deps.animator ??
      new Animator(this.#elementManager, this.#sceneStorage, this.#renderer);
    this.#fileManager =
      deps.fileManager ??
      new FileManager(
        this.#elementManager,
        this.#renderer,
        this.#sceneStorage,
        this,
      );
  }

  #saveAndRedraw(): void {
    this.#saveState();
    this.redraw();
  }

  #saveState(): void {
    this.#sceneStorage.saveToLocalStorage(
      this.#elementManager.getElements(),
      this.duration,
    );
  }
}

export default Scene;
