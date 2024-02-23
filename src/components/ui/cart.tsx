import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import { Badge } from "./badge";
import { ShoppingCartIcon } from "lucide-react";
import CartItem from "./cart-item";
import { Separator } from "./separator";

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
  return (
    <div className="flex w-full flex-col gap-4">
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={24} />
        carrinho
      </Badge>
      <div>
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
      </div>
    </div>
  );
};

export default Cart;
