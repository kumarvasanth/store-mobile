import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "./Context";

class ProductList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="Our" title="Products"></Title>
            <div className="row">
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                    return (
                      <Product key={product.id} product={product}></Product>
                    );
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ProductList;
