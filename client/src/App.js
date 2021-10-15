import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/checkout" component={Checkout} />
    </div>
  );
};

export default App;
