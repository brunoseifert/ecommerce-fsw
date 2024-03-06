import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { Package2 } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";

export const dynamic = "force-dynamic";

async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Acesso Negado!</h2>
        <p className="text-sm opacity-60">Faça login para ver seus pedidos</p>
      </div>
    );
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!orders.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Nenhum pedido encontrado!</h2>
        <p className="text-sm opacity-60">
          Faça uma compra para ver seus pedidos
        </p>
      </div>
    );
  }
  return (
    <div className="container p-5">
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <Package2 size={24} />
        Meus pedidos
      </Badge>
      <div className="mt-5 flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
