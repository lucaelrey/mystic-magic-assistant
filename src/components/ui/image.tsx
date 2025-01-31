import React from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, loading = "lazy", ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loading}
        className={cn("object-contain", className)}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;