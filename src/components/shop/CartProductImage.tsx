import Image from "next/image";

export const CartProductImage = () => {
  return (
    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden">
      <img
        src="/lovable-uploads/4f1166a6-f569-4660-8359-62ca221f471c.png"
        alt="MYSTIC - Das Kartenspiel"
        className="w-full h-full object-cover"
      />
    </div>
  );
};