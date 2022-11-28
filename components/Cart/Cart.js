import { Close, Minus, Plus, RemoveItemButton, ShoppingBag } from "../Icons";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Link from "next/link";
import { urlFor } from "../../lib/client";
import getStripe from "../../lib/getStripe";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    showCartHandler,
    totalAmount,
    changeQuantityInCartHandler,
    onRemoveFromCart,
  } = useContext(CartContext);

  const totalItems = cartItems.reduce(
    (currQty, item) => currQty + item.quantity,
    0
  );

  const handleCheckout = async () => {
    const stripe = await getStripe();

    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const responseData = await response.json();

      toast.loading("Redirecting...");

      stripe.redirectToCheckout({ sessionId: responseData.id });
    } catch (error) {
      console.log(error.message);
    }
  };

  const emptyCart = cartItems.length < 1 && (
    <div className="empty-cart">
      <ShoppingBag />
      <h3>Your shopping bag is empty</h3>
      <Link href="/">
        <button onClick={showCartHandler} className="btn">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const itemsCart =
    cartItems.length >= 1 &&
    cartItems.map((item) => (
      <div className="product" key={item._id}>
        <img src={urlFor(item.image[0])} className="cart-product-image" />
        <div className="item-desc">
          <div className="flex top">
            <h5>{item.name}</h5>
            <h4>{item.price}</h4>
          </div>

          <div className="flex bottom">
            <div>
              <p className="quantity-desc">
                <span
                  className="minus"
                  onClick={changeQuantityInCartHandler.bind(null, item, "DEC")}
                >
                  <Minus />
                </span>
                <span className="num">{item.quantity}</span>
                <span
                  className="plus"
                  onClick={changeQuantityInCartHandler.bind(null, item, "INC")}
                >
                  <Plus />
                </span>
              </p>
            </div>

            <button
              className="remove-item"
              onClick={onRemoveFromCart.bind(null, item)}
            >
              <RemoveItemButton />
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button className="cart-heading" onClick={showCartHandler}>
          <Close />
          <span className="heading">Your Cart</span>
          <span className="cart-num__items">({totalItems} items)</span>
        </button>

        {emptyCart}

        <div className="product-container">{itemsCart}</div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalAmount}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
