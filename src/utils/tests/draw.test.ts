import { describe, it, expect, vi, beforeEach } from "vitest";
import type { TElementType } from "../create-new-element";
import { drawBorder, drawRect } from "../draw";

// Mock Canvas Context
const createMockContext = () => ({
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  fillRect: vi.fn(),
  strokeRect: vi.fn(),
  fillStyle: "",
  strokeStyle: "",
  lineWidth: 0,
});

describe("Drawing Functions", () => {
  let mockCtx: ReturnType<typeof createMockContext>;
  let mockElement: TElementType;

  beforeEach(() => {
    mockCtx = createMockContext();
    mockElement = {
      id: "38b6f0c4-2e6c-435d-b3d3-03cdac4a9146",
      x: 100,
      y: 50,
      width: 200,
      height: 100,
      color: "#ff0000",
      rotation: Math.PI / 4,
    };
  });

  describe("drawRect", () => {
    it("should save and restore canvas state", () => {
      drawRect(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.save).toHaveBeenCalledOnce();
      expect(mockCtx.restore).toHaveBeenCalledOnce();
    });

    it("should translate to element center", () => {
      drawRect(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      const expectedCenterX = (mockElement.x + mockElement.width / 2) | 0;
      const expectedCenterY = (mockElement.y + mockElement.height / 2) | 0;

      expect(mockCtx.translate).toHaveBeenCalledWith(
        expectedCenterX,
        expectedCenterY,
      );
    });

    it("should rotate by the specified angle", () => {
      drawRect(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.rotate).toHaveBeenCalledWith(mockElement.rotation);
    });

    it("should set fill style to element color", () => {
      drawRect(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.fillStyle).toBe(mockElement.color);
    });

    it("should draw rectangle with correct dimensions from center", () => {
      drawRect(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      const expectedX = (-mockElement.width / 2) | 0;
      const expectedY = (-mockElement.height / 2) | 0;

      expect(mockCtx.fillRect).toHaveBeenCalledWith(
        expectedX,
        expectedY,
        mockElement.width,
        mockElement.height,
      );
    });

    it("should handle zero rotation", () => {
      mockElement.rotation = 0;
      drawRect(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.rotate).toHaveBeenCalledWith(0);
    });

    it("should handle negative rotation", () => {
      mockElement.rotation = -Math.PI / 2;
      drawRect(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.rotate).toHaveBeenCalledWith(-Math.PI / 2);
    });

    it("should handle elements with odd dimensions correctly", () => {
      mockElement.width = 101;
      mockElement.height = 51;
      mockElement.x = 99;
      mockElement.y = 49;

      drawRect(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      // Test that bitwise OR truncation works correctly
      const expectedCenterX = (99 + 101 / 2) | 0; // 149.5 -> 149
      const expectedCenterY = (49 + 51 / 2) | 0; // 74.5 -> 74
      const expectedRectX = (-101 / 2) | 0; // -50.5 -> -50
      const expectedRectY = (-51 / 2) | 0; // -25.5 -> -25

      expect(mockCtx.translate).toHaveBeenCalledWith(
        expectedCenterX,
        expectedCenterY,
      );
      expect(mockCtx.fillRect).toHaveBeenCalledWith(
        expectedRectX,
        expectedRectY,
        101,
        51,
      );
    });

    it("should call methods in correct order", () => {
      const callOrder: string[] = [];
      mockCtx.save = vi.fn(() => callOrder.push("save"));
      mockCtx.translate = vi.fn(() => callOrder.push("translate"));
      mockCtx.rotate = vi.fn(() => callOrder.push("rotate"));
      mockCtx.fillRect = vi.fn(() => callOrder.push("fillRect"));
      mockCtx.restore = vi.fn(() => callOrder.push("restore"));

      drawRect(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(callOrder).toEqual([
        "save",
        "translate",
        "rotate",
        "fillRect",
        "restore",
      ]);
    });
  });

  describe("drawBorder", () => {
    it("should save and restore canvas state", () => {
      drawBorder(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.save).toHaveBeenCalledOnce();
      expect(mockCtx.restore).toHaveBeenCalledOnce();
    });

    it("should translate to element center", () => {
      drawBorder(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      const expectedCenterX = (mockElement.x + mockElement.width / 2) | 0;
      const expectedCenterY = (mockElement.y + mockElement.height / 2) | 0;

      expect(mockCtx.translate).toHaveBeenCalledWith(
        expectedCenterX,
        expectedCenterY,
      );
    });

    it("should rotate by the specified angle", () => {
      drawBorder(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.rotate).toHaveBeenCalledWith(mockElement.rotation);
    });

    it("should set stroke style to purple", () => {
      drawBorder(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.strokeStyle).toBe("#7048e8");
    });

    it("should set line width to 3", () => {
      drawBorder(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.lineWidth).toBe(3);
    });

    it("should draw stroke rectangle with correct dimensions from center", () => {
      drawBorder(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      const expectedX = (-mockElement.width / 2) | 0;
      const expectedY = (-mockElement.height / 2) | 0;

      expect(mockCtx.strokeRect).toHaveBeenCalledWith(
        expectedX,
        expectedY,
        mockElement.width,
        mockElement.height,
      );
    });

    it("should handle zero dimensions", () => {
      mockElement.width = 0;
      mockElement.height = 0;

      drawBorder(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(mockCtx.strokeRect).toHaveBeenCalledWith(0, 0, 0, 0);
    });

    it("should call methods in correct order", () => {
      const callOrder: string[] = [];
      mockCtx.save = vi.fn(() => callOrder.push("save"));
      mockCtx.translate = vi.fn(() => callOrder.push("translate"));
      mockCtx.rotate = vi.fn(() => callOrder.push("rotate"));
      mockCtx.strokeRect = vi.fn(() => callOrder.push("strokeRect"));
      mockCtx.restore = vi.fn(() => callOrder.push("restore"));

      drawBorder(mockCtx as unknown as CanvasRenderingContext2D, mockElement);

      expect(callOrder).toEqual([
        "save",
        "translate",
        "rotate",
        "strokeRect",
        "restore",
      ]);
    });
  });
});
