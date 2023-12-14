import { useParams } from "react-router-dom";
import ProductsList from "../../../components/products-list/ProductsList";
import ProductsFilter from "../../../components/products-filter/ProductsFilter";
import products from "../../../products.json";
import { useEffect, useMemo, useState } from "react";
import Footer from "../../../components/footer/Footer";
import { filters } from "./model";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { productsApi } from "../../../clients/api/productsApi";

export type categoryProps = {
  title: string;
  description: string;
};

export type informationByCategoryValues = keyof typeof products;

const CategoryPage = () => {
  const { category } = useParams();
  const [queryFilters, setQueryFilters] = useState<string>("");

  const clothingCategory = useMemo(() => {
    const categoryInformation =
      products[category as informationByCategoryValues];
    if (!categoryInformation) return;
    const { title, description } = categoryInformation;
    return {
      title,
      description,
    };
  }, [category]);

  const getProducts = useMutation({
    mutationKey: [
      QueryKey.GET_PRODUCTS_BY_FILTER_QUERY,
      category,
      queryFilters,
    ],
    mutationFn: productsApi.getProducts,
  });

  const clothingItems = useMemo(() => {
    const items = products[category as informationByCategoryValues]?.items;
    return items.map(({ id, name, images, price }) => ({
      id,
      name,
      imageSrc: images[0]?.imageUrl,
      imageAlt: images[0]?.alt,
      price,
    }));
  }, [category]);

  useEffect(() => {
    console.log(queryFilters);
    getProducts.mutate({
      query: queryFilters,
      category: category as informationByCategoryValues,
    });
  }, [queryFilters]);

  return (
    <>
      <ProductsFilter
        setQueryFilters={setQueryFilters}
        category={clothingCategory}
        filters={filters[category as informationByCategoryValues]}
      >
        <ProductsList products={clothingItems} />
      </ProductsFilter>
      <Footer />
    </>
  );
};

export default CategoryPage;
