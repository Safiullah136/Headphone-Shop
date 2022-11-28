import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const Products = (props) => {
  return (
    <>
      <div className={styles.title}>
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>

      <div className={styles["products-container"]}>
        {props.products.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default Products;
