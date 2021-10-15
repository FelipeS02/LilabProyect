import axios from "axios";
import {
  GET_PRODUCTS,
  PRODUCTS_BY_CATEGORY,
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  ORDER_CONFIRM,
} from "./actions";

export const getProducts = () => async (dispatch) => {
  try {
    const json = await axios.get("http://localhost:3001/all-products");
    const response = json.data.data;
    dispatch({
      type: GET_PRODUCTS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
};

export const confirmOrder = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:3001/order-confirm");
    dispatch({
      type: ORDER_CONFIRM,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCart = () => async (dispatch) => {
  try {
    const json = await axios.get(
      "http://localhost:3001/get-orders?status=CARRITO"
    );
    const { data } = json.data;
    dispatch({
      type: GET_CART,
      payload: data[0],
    });
  } catch (err) {
    console.log(err);
  }
};

export const filterByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTS_BY_CATEGORY,
      payload: category,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    await axios.post("http://localhost:3001/order-add", {
      productId,
      quantity,
    });
    dispatch({
      type: ADD_TO_CART,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromCart = (orderId, productId) => async (dispatch) => {
  try {
    await axios.put("http://localhost:3001/order-delete", {
      productId,
      orderId,
    });
    dispatch({
      type: DELETE_FROM_CART,
    });
  } catch (err) {
    console.log(err);
  }
};
