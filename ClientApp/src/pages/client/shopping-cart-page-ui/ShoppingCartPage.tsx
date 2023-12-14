import React from "react";
import { ShoppingCart } from "../../../components/shopping-cart-ui/ShoppingCartUi";
import Footer from "../../../components/footer/Footer";
import { useCartContext } from "../../../context/cartContext";

const ShoppingCartPage = () => {
  const { cart } = useCartContext();

  return (
    <>
      <ShoppingCart products={cart.products} total={cart.total} />
      <Footer />
    </>
  );
};

export default ShoppingCartPage;
