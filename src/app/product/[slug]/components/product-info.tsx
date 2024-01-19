"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "discountPercentage" | "description" | "totalPrice" | "name"
  >;
}

const ProductInfo = ({
  product: { basePrice, totalPrice, description, discountPercentage, name },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-lg">{name}</h2>
      <div className="flex items-center gap-2">
        <h1>R$ {totalPrice.toFixed(2)}</h1>
        {discountPercentage > 0 && (
          <Badge className="px-2 py-[2px] ">
            <ArrowDownIcon size={14} /> {discountPercentage}%
          </Badge>
        )}
      </div>

      {discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(basePrice).toFixed(2)}
        </p>
      )}

      <div className="mb-4 mt-4 flex items-center gap-2">
        <Button size="icon" variant="outlined" onClick={handleDecreaseQuantity}>
          <ArrowLeftIcon size={16} />
        </Button>
        <span className="mx-2">{quantity}</span>
        <Button size="icon" variant="outlined" onClick={handleIncreaseQuantity}>
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <p className="mt-2 text-sm font-light">{description}</p>
    </div>
  );
};

export default ProductInfo;
