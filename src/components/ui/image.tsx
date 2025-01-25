import React from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, sizes = "100vw", ...props }, ref) => {
    // Generate WebP version URL
    const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
    
    // Generate different size URLs
    const largeSrc = src.replace(/\.(png|jpg|jpeg)$/, '-800.$1');
    const mediumSrc = src.replace(/\.(png|jpg|jpeg)$/, '-400.$1');
    const smallSrc = src.replace(/\.(png|jpg|jpeg)$/, '-200.$1');

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn("object-contain", className)}
        srcSet={`
          ${smallSrc} 200w,
          ${mediumSrc} 400w,
          ${largeSrc} 800w
        `}
        sizes={sizes}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;