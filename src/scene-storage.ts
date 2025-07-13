import type ElementManager from "./element-manager";
import type { TElementType } from "./utils/create-new-element";

class SceneStorage {
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

  saveToLocalStorage = this.#debounce(
    (elements: TElementType[], duration: number) => {
      try {
        const data = {
          elements,
          duration,
        };
        localStorage.setItem("canvasData", JSON.stringify(data));
      } catch (error) {
        console.warn(`Failed to store in local storage: ${error}`);
      }
    },
    300,
  );

  loadFromLocalStorage(
    elementManager: ElementManager,
    setDuration: (duration: number) => void,
  ) {
    try {
      const data = JSON.parse(localStorage.getItem("canvasData") ?? "{}");
      elementManager.clearElements();
      elementManager.addElementsFromData(data.elements);
      setDuration(data.duration || 1000);
    } catch (error) {
      console.warn("Failed to load from storage:", error);
      elementManager.clearElements();
      setDuration(1000);
    }
  }
}

export default SceneStorage;
