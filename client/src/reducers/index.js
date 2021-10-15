import {
  GET_PRODUCTS,
  PRODUCTS_BY_CATEGORY,
  GET_CART,
} from "../actions/actions";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  cartProducts: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
      };
    case PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        filteredProducts: [...state.allProducts].filter(
          (e) => e.category === action.payload
        ),
      };
    case GET_CART:
      return {
        ...state,
        cartProducts: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
