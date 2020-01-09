import React from "react";
import { storeProducts, detailProduct } from "../data";

const ProductContext = React.createContext();

class ProductProvider extends React.Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    openModal: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getDetail = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const detail = this.getDetail(id);
    this.setState(() => {
      return { detailProduct: detail };
    });
  };

  modalOpen = id => {
    const product = this.getDetail(id);
    this.setState(() => {
      return {
        modalProduct: product,
        openModal: true
      };
    });
  };

  closeModal = id => {
    this.setState(() => {
      return { openModal: false };
    });
  };

  addtoCart = id => {
    let tempProduct = [...this.state.products];
    const index = tempProduct.indexOf(this.getDetail(id));
    const product = tempProduct[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      () => {
        return {
          products: tempProduct,
          cart: [...this.state.cart, product]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  increment = id => {
    const tempCart = [...this.state.cart];
    const selectedproduct = tempCart.find(item => item.id === id);

    console.log(selectedproduct);

    const index = tempCart.indexOf(selectedproduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.price * product.count;

    console.log(product);

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = id => {
    const tempCart = [...this.state.cart];
    const selectedproduct = tempCart.find(item => item.id === id);

    console.log(selectedproduct);

    const index = tempCart.indexOf(selectedproduct);
    const product = tempCart[index];

    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.price * product.count;

      console.log(product);

      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = id => {
    let tempProduct = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    let index = tempProduct.indexOf(this.getDetail(id));
    let removedProduct = tempProduct[index];

    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(() => {
      return {
        cart: tempCart,
        products: tempProduct
      };
    }, this.addTotals());
  };

  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: []
        };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals() {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  }

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addtoCart: this.addtoCart,
          modalOpen: this.modalOpen,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
