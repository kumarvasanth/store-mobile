import React from "react";
import Title from "../Title";
import CartColumns from "./cartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../Context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
class Cart extends React.Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <React.Fragment>
                <Title name="your" title="products"></Title>
                <CartColumns></CartColumns>
                <CartList value={value}></CartList>
                <CartTotals value={value}></CartTotals>
              </React.Fragment>
            );
          } else {
            return <EmptyCart></EmptyCart>;
          }
        }}
      </ProductConsumer>
    );
  }
}
export default Cart;
