import Image from "@/components/ui/image";

export const CartProductImage = () => {
  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden">
      <Image
        src="/lovable-uploads/cf7eccbe-9b33-4e52-aadf-a9bf531ba57b.png"
        alt="MYSTIC - Das Kartenspiel"
        className="w-full h-full object-contain"
      />
    </div>
  );
};