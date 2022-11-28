import FooterBanner from "../components/FooterBanner/FooterBanner";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import MainHeader from "../components/Layout/MainHeader";
import Products from "../components/Products/Products";
import { client } from "../lib/client";

const HomePage = (props) => {
  const { bannerData, products } = props;
  return (
    <>
      <HeroBanner bannerData={bannerData && bannerData[0]} />
      <Products products={products} />
      <FooterBanner bannerData={bannerData && bannerData[0]} />
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return {
    props: {
      bannerData,
      products,
    },
  };
}
