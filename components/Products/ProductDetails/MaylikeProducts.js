import ProductItem from "../ProductItem";

const MaylikeProducts = (props) => {
  const { products, product } = props;
  const filteredProducts = products.filter(
    (prod) => prod.slug.current !== product.slug.current
  );
  return (
    <div className="maylike-products-wrapper">
      <h2>You may also like</h2>
      <div className="marquee">
        <div className="maylike-products-container track">
          {filteredProducts.map((item) => (
            <ProductItem key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaylikeProducts;
