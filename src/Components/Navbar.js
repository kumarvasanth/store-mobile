import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";

class Navbar extends React.Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark bg-primary px-sm-5">
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-brand"></img>
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              products
            </Link>
          </li>
        </ul>

        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <i className="fas fa-cart-plus" />
            my cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}
export default Navbar;

const NavWrapper = styled.nav`
  background: var(--mainBlue) !important;
  .nav-link {
    color: var(--mainWhite) !important;
    text-transform: capitalize;
    font-size: 1.3rem;
  }
`;
