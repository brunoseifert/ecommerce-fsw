import { computeProductTotalPrice } from "@/helpers/product";
import { OrderProduct, Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderProducts: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderProducts }: OrderProductItemProps) => {
  const productWithTotalPrice = computeProductTotalPrice(orderProducts.product);

  return (
    <div className="flex w-full items-center gap-4 py-2">
      <div className=" flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProducts.product.imageUrls[0]}
          alt={orderProducts.product.name}
          width={0}
          height={0}
          className=" h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="flex w-fit rounded-md bg-accent px-3 py-1">
          <p className=" text-[10px]">Vendido e entregue por: StorePacket</p>
        </div>

        <p className="text-xs">{orderProducts.product.name}</p>

        <div className=" flex w-full items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text text-sm font-bold">
              R$ {productWithTotalPrice.totalPrice.toFixed(2)}
            </p>

            {orderProducts.discountPercentage > 0 && (
              <p className="text-xs  line-through opacity-60 ">
                R$ {orderProducts.product.basePrice.toFixed(2)}
              </p>
            )}
          </div>
          <p className="text-xs opacity-60">Qtde: {orderProducts.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
