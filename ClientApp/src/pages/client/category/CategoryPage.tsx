import { useParams } from "react-router-dom";
import ProductsList from "../../../components/products-list/ProductsList";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { backofficeProductApi } from "../../../clients/api/backoffice/productApi";
import { productApi } from "../../../clients/api/productApi";
import { useQuery } from "@tanstack/react-query";
import ProductsFilter from "../../../components/products-filter/ProductsFilter";

export type categoryProps = {
  title: string;
  description: string;
};

const CategoryPage = () => {
  const { category } = useParams();

  const { data: categories } = useQuery({
    queryKey: [QueryKey.GET_CATEGORIES],
    queryFn: () => backofficeProductApi.getProductCategories(),
  });

  const currentCategory = categories?.find(
    (shopCategory) => shopCategory.type.toLowerCase() === category
  )?.type;

  const { data: products } = useQuery({
    queryKey: [QueryKey.GET_PRODUCTS_BY_FILTER_QUERY, category],
    queryFn: () =>
      productApi.getProducts({
        query: { Types: `${currentCategory}` },
      }),
    enabled: !!category && !!currentCategory,
  });

  const { data: productBrands } = useQuery({
    queryKey: [QueryKey.GET_PRODUCTS_BRANDS, category],
    queryFn: productApi.getProductBrands,
    enabled: !!category && !!currentCategory,
  });

  const getCurrentProductBrands = () => {
    if (!productBrands) return;
    let brands: string[] = [];
    Object.entries(productBrands).forEach(([key, value]) => {
      if (key.toLowerCase() === category) brands = value;
    });
    return brands;
  };

  if (!products) return null;

  return (
    <>
      <ProductsFilter
        setQueryFilters={(query) => console.log(query)}
        filters={[
          {
            id: "brands",
            name: "Gamintojai",
            options:
              getCurrentProductBrands()?.map((brand) => ({
                label: brand,
                value: brand,
              })) || [],
          },
        ]}
      >
        <ProductsList products={products} />
      </ProductsFilter>
    </>
  );
};

export default CategoryPage;
