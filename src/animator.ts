import type ElementManager from "./element-manager";
import type Renderer from "./renderer";
import type SceneStorage from "./scene-storage";

class Animator {
  #speed: number = 0.03;
  #elementManager: ElementManager;
  #animationFrameId: number | null = null;
  #sceneStorage: SceneStorage;
  #renderer: Renderer;

  constructor(
    elementManager: ElementManager,
    sceneStorage: SceneStorage,
    renderer: Renderer,
  ) {
    this.#elementManager = elementManager;
    this.#sceneStorage = sceneStorage;
    this.#renderer = renderer;
  }

  startRotationAnimation(duration: number) {
    const elements = this.#elementManager.getElements();
    if (elements.length === 0) return;
    const startTime = performance.now();
    const initialSpeed = this.#speed;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      let easedSpeed = initialSpeed;
      const slowdownStart = duration - 1000;
      if (elapsed > slowdownStart) {
        const easeT = (elapsed - slowdownStart) / 1000;
        easedSpeed = initialSpeed * (1 - easeT);
      }

      elements.forEach((element) => {
        element.rotation += easedSpeed;
      });
      this.#renderer.redraw();

      if (t < 1) {
        this.#animationFrameId = requestAnimationFrame(animate);
      } else {
        this.#animationFrameId = null;
        this.#sceneStorage.saveToLocalStorage(
          this.#elementManager.getElements(),
          duration,
        );
      }
    };

    if (!this.#animationFrameId) {
      this.#animationFrameId = requestAnimationFrame(animate);
    }
  }

  cancelAnimation() {
    if (this.#animationFrameId) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#animationFrameId = null;
    }
  }
}

export default Animator;
