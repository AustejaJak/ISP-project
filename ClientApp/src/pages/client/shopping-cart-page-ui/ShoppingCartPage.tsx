import React from "react";
import { ShoppingCart } from "../../../components/shopping-cart-ui/ShoppingCartUi";
import { useCartContext } from "../../../context/cartContext";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { basketApi } from "../../../clients/api/basketApi";

const ShoppingCartPage = () => {
  const { cart } = useCartContext();

  const { data } = useQuery({
    queryKey: [QueryKey.GET_BASKET],
    queryFn: basketApi.getClientBasket,
  });

  return (
    <>
      <ShoppingCart products={data?.items || []} total={data?.totalSum || 0} />
    </>
  );
};

export default ShoppingCartPage;
