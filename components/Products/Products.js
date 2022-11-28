import ProductItem from "./ProductItem";

const Products = (props) => {
  return (
    <>
      <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>

    <div className="products-container">
      {props.products?.map((product) => <ProductItem key={product._id} product={product} />)}
    </div>
    </>
  );
};

export default Products;
