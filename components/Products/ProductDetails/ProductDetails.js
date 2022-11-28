import { urlFor } from "../../../lib/client";
import { useContext, useState } from "react";
import Star from "./Stars";
import { Minus, Plus } from "../../Icons";
import CartContext from "../../../store/cart-context";

const ProductDetails = (props) => {
  const cartCtx = useContext(CartContext);
  const [index, setIndex] = useState(0);
  const { name, price, image, details, quantity } = props.product;
  const [itemQty, setItemQty] = useState(quantity);
  const { onAddToCart, showCartHandler } = cartCtx;

  const increaseQuantityHandler = () => {
    setItemQty((prevState) => prevState + 1);
  };

  const decreaseQuantityHandler = () => {
    setItemQty((prevState) => (prevState === 1 ? 1 : prevState - 1));
  };

  const buyNowHandler = (item, qty) => {
    onAddToCart(item, qty);

    showCartHandler();
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <Star />
            <p>(20)</p>
          </div>

          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>

          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantityHandler}>
                <Minus />
              </span>
              <span className="num">{itemQty}</span>
              <span className="plus" onClick={increaseQuantityHandler}>
                <Plus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              className="add-to-cart"
              onClick={onAddToCart.bind(null, props.product, itemQty)}
            >
              Add to Cart
            </button>
            <button
              className="buy-now"
              onClick={buyNowHandler.bind(null, props.product, itemQty)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
