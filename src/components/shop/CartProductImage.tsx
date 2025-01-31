import Image from "@/components/ui/image";

export const CartProductImage = () => {
  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden">
      <picture>
        <source srcSet="/lovable-uploads/mystic-game.webp" type="image/webp" />
        <Image
          src="/lovable-uploads/mystic-game.png"
          alt="MYSTIC - Das Kartenspiel"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </picture>
    </div>
  );
};