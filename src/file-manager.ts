import type ElementManager from "./element-manager";
import type Renderer from "./renderer";
import type Scene from "./scene";
import type SceneStorage from "./scene-storage";
import { validateSceneData } from "./utils/basic-validation";
import { FILE_NAME, InputType, MimeType } from "./utils/constants";

class FileManager {
  #elementManager: ElementManager;
  #renderer: Renderer;
  #sceneStorage: SceneStorage;
  #scene: Scene;

  constructor(
    elementManager: ElementManager,
    renderer: Renderer,
    sceneStorage: SceneStorage,
    scene: Scene,
  ) {
    this.#elementManager = elementManager;
    this.#renderer = renderer;
    this.#sceneStorage = sceneStorage;
    this.#scene = scene;
  }

  downloadFile() {
    try {
      const data = {
        elements: this.#elementManager.getElements(),
        duration: this.#scene.duration,
      };
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
  }

  uploadFile() {
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
          this.#elementManager.addElementsFromData(data.elements);
          this.#scene.duration = data.duration;
          this.#renderer.redraw();
          this.#scene.notifyListeners();
          this.#sceneStorage.saveToLocalStorage(
            this.#elementManager.getElements(),
            this.#scene.duration,
          );
        } else {
          console.error("Invalid scene format");
        }
      } catch (e) {
        console.error(e);
      }
    };
    input.click();
  }
}

export default FileManager;
