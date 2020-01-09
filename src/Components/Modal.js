import React from "react";
import { ProductConsumer } from "./Context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";

class Modal extends React.Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { openModal, closeModal } = value;
          const { img, title, price } = value.modalProduct;

          if (!openModal) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                    >
                      <h5>Item Added to Cart</h5>
                      <img src={img} className="img-fluid" alt="product"></img>
                      <h5>{title}</h5>
                      <h5 className="text-muted">price:${price}</h5>
                      <Link to="/">
                        <ButtonContainer
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          Store
                        </ButtonContainer>
                      </Link>

                      <Link to="/cart">
                        <ButtonContainer
                          onClick={() => {
                            closeModal();
                          }}
                          cart
                        >
                          go to cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}
export default Modal;
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
