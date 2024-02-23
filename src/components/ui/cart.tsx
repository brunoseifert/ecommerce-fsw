import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import { Badge } from "./badge";
import { ShoppingCartIcon } from "lucide-react";
import CartItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="flex flex-col gap-4">
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={24} />
        catalágo
      </Badge>
      {products.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Cart;
