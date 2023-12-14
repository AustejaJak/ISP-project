import React from "react";
import { ShoppingCart } from "../../../components/shopping-cart-ui/ShoppingCartUi";
import { useCartContext } from "../../../context/cartContext";

const ShoppingCartPage = () => {
  const { cart } = useCartContext();

  return (
    <>
      <ShoppingCart products={cart.products} total={cart.total} />
    </>
  );
};

export default ShoppingCartPage;
