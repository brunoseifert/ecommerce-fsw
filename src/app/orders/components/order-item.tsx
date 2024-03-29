import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Order, Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./order-produtcs";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { getOrderStatus } from "../helpers/status";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const desconto = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc +
        ((Number(orderProduct.product.basePrice) *
          orderProduct.discountPercentage) /
          100) *
          orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return subtotal - desconto;
  }, [subtotal, desconto]);

  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex w-full text-left">
              <div className="flex flex-1 flex-col gap-1 text-left">
                <p className="text-sm font-bold uppercase lg:text-base">
                  Pedido com {order.orderProducts.length} produto(s)
                </p>
                <span className="text-xs opacity-60">
                  Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}
                </span>
              </div>

              <div className="hidden flex-1 font-bold lg:block">
                <p className="text-xs lg:text-sm">Status</p>
                <p className="text-xs text-[#8162FF] lg:text-sm">
                  {getOrderStatus(order.status)}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm ">Data</p>
                <p className="text-xs opacity-60 lg:text-sm">
                  {format(order.createdAt, "d/MM/y")}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className=" font-semibold lg:hidden">
                  <p>Status</p>
                  <p className="text-[#8162FF]">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div className="lg:hidden">
                  <p className="font-bold">Data</p>
                  <p className="opacity-70">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>

                <div className="lg:hidden">
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-70">Cartão</p>
                </div>
              </div>
              {order.orderProducts.map((orderProducts) => (
                <OrderProductItem
                  key={orderProducts.id}
                  orderProducts={orderProducts}
                />
              ))}
            </div>

            <div className="flex w-full flex-col">
              <Separator />

              <div className="flex w-full justify-between py-3 text-xs">
                <p>Subtotal</p>
                <p>R$ {subtotal.toFixed(2)}</p>
              </div>
              <Separator />

              <div className="flex w-full justify-between py-3 text-xs">
                <p>Entrega</p>
                <p>Grátis</p>
              </div>
              <Separator />

              <div className="flex w-full justify-between py-3 text-xs">
                <p>Descontos</p>
                <p>-R$ {desconto.toFixed(2)}</p>
              </div>
              <Separator />

              <div className="flex w-full justify-between py-3 text-sm font-bold">
                <p>Total</p>
                <p>R$ {total.toFixed(2)}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
