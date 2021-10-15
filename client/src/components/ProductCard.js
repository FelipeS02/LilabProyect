import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import { addToCart } from "../actions";
const ProductCard = ({ product }) => {
  const { id, name, stock, price, media } = product;
  const dispatch = useDispatch();
  
  const handleAdd = async () => {
    await dispatch(addToCart(id, quantity));
  };
  
  const [quantity, setQuantity] = useState(0);
  
  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };
  return (
    <div>
      <Card style={{ width: "20rem", margin: "20px" }}>
        <Card.Img
          variant="top"
          src={`http://localhost:3001/uploads/${media[0].name}`}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price} xKg</Card.Text>
          {stock > 0 ? (
            <div>
              <Form.Control
                type="number"
                min="0"
                max={stock}
                value={quantity}
                onChange={handleQuantity}
              />
              <br />
              <Button
                variant="primary"
                onClick={handleAdd}
                disabled={quantity < 1 ? true : false}
              >
                Añadir al carrito
              </Button>
            </div>
          ) : (
            <Button variant="secondary" disabled={stock === 0 ? true : false}>
              Sin stock
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
