import MaylikeProducts from "../../components/Products/ProductDetails/MaylikeProducts";
import ProductDetails from "../../components/Products/ProductDetails/ProductDetails";
import { client } from "../../lib/client";

const Product = (props) => {
  return (
    <div>
      <ProductDetails product={props.product} />
      <MaylikeProducts products={props.products} product={props.product} />
    </div>
  );
};

export default Product;

export async function getStaticPaths() {
  const query = `*[_type == "product"]`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(productQuery);

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return {
    props: {
      products,
      product,
    },
    revalidate: 1800,
  };
}
