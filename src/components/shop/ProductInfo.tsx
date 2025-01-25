import { Link } from "react-router-dom";

interface ProductInfoProps {
  title: string;
  price: string;
  shippingInfo: string;
}

export const ProductInfo = ({ title, price, shippingInfo }: ProductInfoProps) => {
  return (
    <div className="space-y-2 md:space-y-4 text-center md:text-left">
      <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-white to-white/70">
        {title}
      </h1>
      <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-white/90 to-white/70">
        {price}
      </div>
      <p className="text-sm md:text-base text-white/70">
        {shippingInfo}
      </p>
    </div>
  );
};