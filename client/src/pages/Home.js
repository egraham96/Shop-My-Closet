import React from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="homebox">
      <br></br>
    <div className="container">
      <ProductList />
      <Cart />
    </div>
    </div>
  );
};

export default Home;
