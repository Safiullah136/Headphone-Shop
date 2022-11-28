import Link from "next/link";
import { urlFor } from "../../lib/client";
import styles from "./FooterBanner.module.css";

const FooterBanner = (props) => {
  const {
    discount,
    saleTime,
    smallText,
    midText,
    largeText1,
    largeText2,
    buttonText,
    image,
    desc,
  } = props.bannerData;

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <div className={styles.left}>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className={styles.right}>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product`}>
            <button>{buttonText}</button>
          </Link>
        </div>

        <img src={urlFor(image)} />
      </div>
    </div>
  );
};

export default FooterBanner;
