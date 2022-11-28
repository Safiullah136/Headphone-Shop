import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import CartContext from "./cart-context";
import cartReducer, { defaultCartState } from "./CartReducer";

const CartContextProvider = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  // const [cartItems, setCartItems] = useState(null);
  // let cart;
  // useEffect(() => {
  //   cart = localStorage.getItem("cartItems");
  //   if (cart) {
  //     const parsedCart = JSON.parse(cart);
  //     setCartItems(parsedCart);
  //   } else {
  //     setCartItems([]);
  //   }
  // }, [cart]);
  // console.log(cartItems);

  //   const increaseQuantityHandler = () => {
  //     setQty((prevState) => prevState + 1);
  //   };

  //   const decreaseQuantityHandler = () => {
  //     setQty((prevState) => (prevState === 1 ? 1 : prevState - 1));
  //   };

  const changeQuantityInCartHandler = (item, value) => {
    dispatchCartAction({ type: "CHANGE_QUANTITY", item, value });
  };

  const showCartHandler = () => {
    setShowCart((prevState) => !prevState);
  };

  const onAddToCart = (item, qty) => {
    toast.success(`${qty} ${item.name} added to the cart.`);
    dispatchCartAction({ type: "ADD", item, qty });
  };

  const onRemoveFromCart = (item) => {
    dispatchCartAction({ type: "REMOVE", item });
  };

  const reset = () => {
    dispatchCartAction({ type: "RESET" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.cartItems,
        showCart,
        totalAmount: cartState.totalAmount,
        showCartHandler,
        onAddToCart,
        changeQuantityInCartHandler,
        onRemoveFromCart,
        reset,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
