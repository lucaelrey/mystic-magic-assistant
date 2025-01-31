import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage = ({ src, alt, className }: ProductImageProps) => {
  // Extract the filename without extension to use for WebP version
  const webpSrc = src.replace('.png', '.webp');
  
  return (
    <div className={cn(
      "relative aspect-square w-full max-w-[500px] mx-auto group", 
      className
    )}>
      <div className="absolute inset-0 flex items-center justify-center">
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
};