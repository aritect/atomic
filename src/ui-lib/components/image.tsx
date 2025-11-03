import React, {
  type ComponentProps,
  forwardRef,
  useRef,
} from "react";

import placeholder from "@/assets-ui-lib/images/placeholder.svg?base64";

const Image = forwardRef<HTMLImageElement, ComponentProps<"img">>(({
  src,
  alt,
  width,
  height,
  ...props
}, ref) => {
  const imgRef = useRef<HTMLImageElement>();
  const handleImgRef = (node: HTMLImageElement) => {
    if (ref) {
      if (typeof ref === "function") {
        ref(node);
      }
    }

    imgRef.current = node;
  };

  return (
    <img
      src={src}
      alt={alt}
      ref={handleImgRef}
      width={width}
      height={height}
      onError={() => {
        if (imgRef.current) {
          imgRef.current.src = `data:image/svg+xml;base64,${placeholder}`;
        }
      }}
      {...props}
    />
  );
});

Image.displayName = "Image";

export { Image };
