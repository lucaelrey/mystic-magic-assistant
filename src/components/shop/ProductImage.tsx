import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage = ({ src, alt, className }: ProductImageProps) => {
  return (
    <div className={cn("relative aspect-square order-first group", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain rounded-xl md:rounded-2xl 
            transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
};