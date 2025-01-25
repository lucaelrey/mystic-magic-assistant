import { Link } from "react-router-dom";

interface ProductInfoProps {
  title: string;
  price: string;
  shippingInfo: string;
}

export const ProductInfo = ({ title, price, shippingInfo }: ProductInfoProps) => {
  return (
    <div className="space-y-2 md:space-y-4">
      <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-white to-white/70 text-center">
        {title}
      </h1>
      <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-white/90 to-white/70 text-left">
        {price}
      </div>
      <p className="text-sm md:text-base text-white/70 text-left">
        {shippingInfo}
      </p>
    </div>
  );
};