import Link from "next/link";
import { urlFor } from "../../lib/client";

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
    product
  } = props.bannerData;

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/products/${product}`}>
            <button>{buttonText}</button>
          </Link>
        </div>

        <img src={urlFor(image)} className="footer-banner-image" />
      </div>
    </div>
  );
};

export default FooterBanner;
