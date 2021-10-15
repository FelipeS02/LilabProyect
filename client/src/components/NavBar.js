import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { filterByCategory } from "../actions";
import { Link } from "react-router-dom";
const NavBar = () => {
  const dispatch = useDispatch();
  const handleValue = (e) => {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Verduleria</Navbar.Brand>
          <Nav className="me-auto">
            <Button variant="dark" value="FRUTA" onClick={handleValue}>
              Frutas
            </Button>
            <Button variant="dark" value="VERDURA" onClick={handleValue}>
              Frutas
            </Button>
            <Button variant="dark" as={Link} to="/checkout">
              Checkout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
