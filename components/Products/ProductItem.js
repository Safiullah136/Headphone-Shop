import Link from "next/link";
import styles from "./ProductItem.module.css";
import { urlFor } from "../../lib/client";

const ProductItem = (props) => {
  const { slug, image, name, price } = props.product;

  return (
    <div>
      <Link href={`/products/${slug.current}`}>
        <div className={styles["product-card"]}>
          <img src={urlFor(image && image[0])} height={250} width={250} />
          <p className={styles["product-name"]}>{name}</p>
          <p className={styles["product-price"]}>{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
