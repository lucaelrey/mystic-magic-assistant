import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { SEO } from "@/components/SEO";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { t } = useTranslation();

  const { data: cartProducts = [], isLoading } = useQuery({
    queryKey: ["cart-products"],
    queryFn: async () => {
      if (!cart.items || cart.items.length === 0) return [];
      
      try {
        const productIds = cart.items.map((item) => item.productId);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .in("id", productIds);

        if (error) throw error;

        return data.map((product) => {
          const cartItem = cart.items.find((item) => item.productId === product.id);
          return {
            ...product,
            quantity: cartItem?.quantity || 1,
          };
        });
      } catch (error) {
        console.error("Error fetching cart products:", error);
        return [];
      }
    },
  });

  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const title = t('shop.cart.title');
  const description = t('shop.cart.description');

  return (
    <div className="container mx-auto py-12">
      <SEO title={title} description={description} />
      <h1 className="text-3xl font-bold mb-6">{t('shop.cart.title')}</h1>
      {isLoading ? (
        <div className="text-center">{t('loading')}...</div>
      ) : cartProducts.length === 0 ? (
        <Card className="glass">
          <CardContent className="p-6 text-center">
            <p className="text-lg">{t('shop.cart.empty')}</p>
            <Link to="/shop" className="text-blue-500 hover:underline">
              {t('shop.cart.continueShopping')}
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="glass">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {cartProducts.map((product: any) => (
                    <li key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <h2 className="text-lg font-semibold">{product.name}</h2>
                          <p className="text-gray-500">{formatCurrency(product.price)}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                              disabled={product.quantity <= 1}
                            >
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => handleRemove(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          {t('shop.cart.remove')}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="glass">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t('shop.cart.summary')}</h2>
                <div className="flex justify-between mb-2">
                  <span>{t('shop.cart.total')}</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <Separator className="mb-4" />
                <Link to="/checkout">
                  <Button className="w-full">
                    {t('shop.cart.checkout')}
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
