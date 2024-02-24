import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import { Badge } from "./badge";
import { ShoppingCartIcon } from "lucide-react";
import CartItem from "./cart-item";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({ sessionId: checkout.id });
  };
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={24} />
        carrinho
      </Badge>
      <div className="flex h-full flex-col gap-5">
        <ScrollArea className="h-[600px]">
          <div className="fkex h-full flex-col">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))
            ) : (
              <p className="font-semibold">
                Você ainda não tem nenhum produto no carrinho!
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-3">
        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R$ {subtotal.toFixed(2)}</p>
        </div>
        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p className="text-xs font-semibold">Entrega</p>
          <p className="text-xs">Grátis</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Desconto</p>
          <p>-R$ {totalDiscount.toFixed(2)}</p>
        </div>
        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
        <Button
          className="text-xs font-semibold uppercase"
          onClick={handleFinishPurchaseClick}
        >
          finalizar compra
        </Button>
      </div>
    </div>
  );
};

export default Cart;
