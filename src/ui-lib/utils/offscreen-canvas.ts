const createOffscreenCanvas = () => {
  const fragment: DocumentFragment = document.createDocumentFragment();
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  fragment.appendChild(canvas);
  return canvas;
};

let currentOffscreenCanvas: ReturnType<typeof createOffscreenCanvas>;

const getOffscreenCanvasContext = () => {
  if (!currentOffscreenCanvas) {
    currentOffscreenCanvas = createOffscreenCanvas();
  }

  return currentOffscreenCanvas.getContext("2d") as CanvasRenderingContext2D;
};

export { getOffscreenCanvasContext };
