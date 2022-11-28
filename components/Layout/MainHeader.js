import styles from "./MainHeader.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import Cart from "../Cart/Cart";

const MainHeader = () => {
  const cartCtx = useContext(CartContext);
  const { cartItems, showCart, showCartHandler } = cartCtx;

  let totalItems = 0; 
  if (cartItems) {
    totalItems = cartItems.reduce(
      (currQty, item) => currQty + item.quantity,
      0
    );
  }

  return (
    <>
      <header>
        <div className={styles.nav}>
          <p className={styles.logo}>
            <Link href="/">MS Headphones</Link>
          </p>
          <button className={styles["cart-icon"]} onClick={showCartHandler}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z"></path>
            </svg>
            <span className={styles["cart-item-qty"]}>{totalItems}</span>
          </button>

          {showCart && <Cart />}
        </div>
      </header>
    </>
  );
};

export default MainHeader;
