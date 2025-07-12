export const DPR =
  typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

export const MimeType = {
  Json: "application/json",
} as const;

export const FILE_NAME = "scene.json" as const;

export const InputType = {
  File: "file",
} as const;

export const SideBarStrings = {
  AddRectangle: "Add Rectangle",
  Play: "Play",
  DownloadJSON: "Download .json",
  UploadJSON: "Upload .json",
  ClearCanvas: "Clear Canvas",
} as const;
