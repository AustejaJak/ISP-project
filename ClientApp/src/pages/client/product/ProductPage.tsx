import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import Product from "../../../components/product/Product";
import { useParams } from "react-router-dom";
import { productApi } from "../../../clients/api/productApi";

export type ProductProp = {
  sku: string;
  vendor: string;
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
};

const product: ProductProp = {
  sku: "1",
  vendor: "Casio",
  name: "Skaitmeninis laikrodis",
  countryOfOrigin: "LIETUVA",
  measurements: "10x10x10",
  weight: 0.4,
  quantityInPackage: 2,
  quantityInStorage: 99,
  isConfirmed: false,
  type: "Laikrodis",
  pictureUrl: "",
  cost: 3995,
  rating: 4,
  description:
    "<p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>",
};

const ProductPage = () => {
  const { productId } = useParams();

  // const { data: product, isLoading } = useQuery({
  //   queryKey: [QueryKey.FIND_PRODUCT_BY_ID, productId],
  //   queryFn: () => productApi.findProductById({ productId: productId! }),
  //   enabled: !!productId,
  // });
  return <Product isLoading={false} product={product || ({} as ProductProp)} />;
};

export default ProductPage;
