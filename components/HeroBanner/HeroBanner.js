import styles from "./HeroBanner.module.css";
import { urlFor } from "../../lib/client";
import Link from "next/link";

const HeroBanner = (props) => {
  const { smallText, midText, largeText1, product, buttonText, image, desc } =
    props.bannerData;

  return (
    <div className={styles.banner}>
      <div>
        <p className={styles["beats-solo"]}>{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img
          src={urlFor(image)}
          alt="headphones"
          className={styles["hero-banner-image"]}
        />

        <div>
          <Link href={`/products/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className={styles.desc}>
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
