import { useParams } from "react-router-dom";
import ProductsList from "../../../components/products-list/ProductsList";
import ProductsFilter from "../../../components/products-filter/ProductsFilter";
import products from "../../../products.json";
import { useEffect, useMemo, useState } from "react";
import { filters } from "./model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { productsApi } from "../../../clients/api/productsApi";
import { backofficeProductApi } from "../../../clients/api/backoffice/productApi";

export type categoryProps = {
  title: string;
  description: string;
};

export type informationByCategoryValues = keyof typeof products;

const CategoryPage = () => {
  const { category } = useParams();
  const [queryFilters, setQueryFilters] = useState<string>("");

  // const clothingCategory = useMemo(() => {
  //   const categoryInformation =
  //     products[category as informationByCategoryValues];
  //   if (!categoryInformation) return;
  //   const { title, description } = categoryInformation;
  //   return {
  //     title,
  //     description,
  //   };
  // }, [category]);

  const { data: products } = useQuery({
    queryKey: [QueryKey.GET_PRODUCTS_BY_FILTER_QUERY, category],
    queryFn: () =>
      backofficeProductApi.getProductsByCategory({ category: category! }),
    enabled: !!category,
  });

  console.log(products);

  if (!products) return null;

  // const clothingItems = useMemo(() => {
  //   const items = products[category as informationByCategoryValues]?.items;
  //   return items.map(({ id, name, images, price }) => ({
  //     id,
  //     name,
  //     imageSrc: images[0]?.imageUrl,
  //     imageAlt: images[0]?.alt,
  //     price,
  //   }));
  // }, [category]);

  // useEffect(() => {
  //   console.log(queryFilters);
  //   getProducts.mutate({
  //     query: queryFilters,
  //     category: category as informationByCategoryValues,
  //   });
  // }, [queryFilters]);

  return (
    <>
      <ProductsList products={products} />
    </>
  );
};

export default CategoryPage;
