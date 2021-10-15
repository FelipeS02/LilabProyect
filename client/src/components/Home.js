import React, { useEffect } from "react";
import { getProducts, getCart } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import ProductCard from "./ProductCard";
import NavBar from "./NavBar";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch]);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  return (
    <div>
      <NavBar />
      <div className="home-cards">
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((e) => {
            return <ProductCard product={e} />;
          })
        ) : (
          <h1>Aun no hay ningun producto!</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
