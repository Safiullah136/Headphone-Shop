import styles from "./Cart.module.css";
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
    <div className={styles["empty-cart"]}>
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
      <div className={styles.product} key={item._id}>
        <img src={urlFor(item.image[0])} />
        <div className={styles.desc}>
          <div className={`${styles.flex} + ${styles.top}`}>
            <h5>{item.name}</h5>
            <h4>{item.price}</h4>
          </div>

          <div className={`${styles.flex} + ${styles.bottom}`}>
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
              className={styles["remove-item"]}
              onClick={onRemoveFromCart.bind(null, item)}
            >
              <RemoveItemButton />
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className={styles["cart-wrapper"]}>
      <div className={styles["cart-container"]}>
        <button className={styles["cart-heading"]} onClick={showCartHandler}>
          <Close />
          <span className={styles.heading}>Your Cart</span>
          <span className={styles["cart-num__items"]}>
            ({totalItems} items)
          </span>
        </button>

        {emptyCart}

        <div className={styles["product-container"]}>{itemsCart}</div>

        {cartItems.length >= 1 && (
          <div className={styles["cart-bottom"]}>
            <div className={styles.total}>
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
