import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { useUserContext } from "../../../context/userContext";
import { wishlistApi } from "../../../clients/api/wishlistApi";
import ProductsList from "../../../components/products-list/ProductsList";

export const WishlistPage: React.FC = () => {
  const { userInformation } = useUserContext();
  const { data: wishlistedProducts } = useQuery({
    queryKey: [QueryKey.GET_WISHLISTED_PRODUCTS, userInformation.userId],
    queryFn: () =>
      wishlistApi.getWishlistProducts({ userId: userInformation.userId }),
  });

  return <ProductsList products={wishlistedProducts?.products || []} />;
};
