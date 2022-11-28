import { createContext } from "react";

const CartContext = createContext({
  cartItems: [],
  totalAmount: 0,
  onAddToCart: (item) => {},
  onRemoveFromCart: (id) => {},
  increaseQuantityHandler: (item) => {},
  showCart: null,
});

export default CartContext;
