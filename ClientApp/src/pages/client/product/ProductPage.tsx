import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import Product from "../../../components/product/Product";
import { useParams } from "react-router-dom";
import { productApi } from "../../../clients/api/productApi";

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
  return (
    <Product isLoading={isLoading} product={product || ({} as ProductProp)} />
  );
};

export default ProductPage;
