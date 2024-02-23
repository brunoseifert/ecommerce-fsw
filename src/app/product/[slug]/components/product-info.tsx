"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCartClick = () => {
    addProductToCart({ ...product, quantity });
  };
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-lg">{product.name}</h2>
      <div className="flex items-center gap-2">
        <h1>R$ {product.totalPrice.toFixed(2)}</h1>
        {product.discountPercentage > 0 && (
          <Badge className="px-2 py-[2px] ">
            <ArrowDownIcon size={14} /> {product.discountPercentage}%
          </Badge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      <div className="mb-4 mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantity}
          className="border-2"
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span className="mx-2">{quantity}</span>
        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantity}
          className="border-2"
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>
      <div className="mb-5">
        <h3 className="text-base font-bold ">Descrição</h3>
        <p className="mt-2 text-sm font-light">{product.description}</p>
      </div>

      <Button className="mt-auto" onClick={handleAddToCartClick}>
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-3">
          <TruckIcon size={24} />
          <div className=" flex flex-col">
            <p className="text-sm">
              Entrega via <span className="font-semibold">FSPacket®</span>
            </p>
            <p className="text-xs font-light text-blue-500">
              Envio para todo o{" "}
              <span className="font-semibold text-blue-700">Brasil</span>
            </p>
          </div>
        </div>
        <p className="text-sm font-semibold">Frete grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
