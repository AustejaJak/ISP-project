import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import Product from "../../../components/product/Product";
import { useParams } from "react-router-dom";
import { productApi } from "../../../clients/api/productApi";
import { reviewsApi } from "../../../clients/api/reviewsApi";
import { useMemo } from "react";

export type ProductProp = {
  sku: string;
  name: string;
  pictureUrl: string;
  quantityInStorage: number;
  type: string;
  countryOfOrigin: string;
  measurements: string;
  quantityInPackage: number;
  weight: number;
  cost: number;
  rating: number;
  description: string;
  isConfirmed: boolean;
  brand: string;
};

const ProductPage = () => {
  const { productId } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: [QueryKey.FIND_PRODUCT_BY_ID, productId],
    queryFn: () => productApi.findProductById({ productId: productId! }),
    enabled: !!productId,
  });

  const { data: reviews, refetch } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_REVIEWS, productId],
    queryFn: () => reviewsApi.getProductReviews({ productId: productId! }),
    enabled: !!productId,
  });

  const reviewsAverage = useMemo(() => {
    if (!reviews) return;
    return (
      (reviews?.reduce((acc, { rating }) => acc + rating, 0) || 0) /
      reviews?.length
    );
  }, [reviews]);

  return (
    <Product
      isLoading={isLoading}
      reviews={reviews || []}
      product={product || ({} as ProductProp)}
      reviewAvg={reviewsAverage || 0}
      reviewsRefetch={() => refetch()}
    />
  );
};

export default ProductPage;
