import ProductItem from "../ProductItem";
import styles from "./MaylikeProducts.module.css";

const MaylikeProducts = (props) => {
  const { products, product } = props;
  const filteredProducts = products.filter(prod => prod.slug.current !== product.slug.current)
  return (
    <div className={styles.wrapper}>
      <h2>You may also like</h2>
      <div className={styles.marquee}>
        <div
          className={`${styles['maylike-products-container']} ${styles.track}`}
        >
          {filteredProducts.map((item) => (
            <ProductItem key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaylikeProducts;
