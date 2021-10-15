import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { confirmOrder, getCart } from "../actions";
import { useHistory } from "react-router";
const Checkout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const history = useHistory();

  const cartProducts = useSelector((state) => state.cartProducts);
  const handleSubmit = () => {
    dispatch(confirmOrder());
    history.push("/");
  };

  const List = () => {
    if (cartProducts?.products.length > 0) {
      return (
        <ListGroup as="ul">
          {cartProducts?.products?.map((e) => {
            const { name, price, order_products } = e;
            console.log(e);
            return (
              <ListGroup.Item as="li" style={{ display: "flex" }}>
                <h1>{name}</h1>
                <h2>{`${price} x${order_products.quantity}`}</h2>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    }
  };
  return (
    <div>
      {cartProducts.products.length > 0 ? (
        <div>
          <List />
          <Button variant="success" onClick={handleSubmit}>
            {" "}
            Confirmar{" "}
          </Button>
        </div>
      ) : (
        <h1>No hay ningun producto en el carrito</h1>
      )}
    </div>
  );
};

export default Checkout;
