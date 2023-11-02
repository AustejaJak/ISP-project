import { useParams } from "react-router-dom";
import ProductsList from "../../../components/products-list/ProductsList";
import ProductsFilter from "../../../components/products-filter/ProductsFilter";
import products from "../../../products.json";
import { useMemo } from "react";

export type categoryProps = {
  title: string;
  description: string;
};

export type informationByCategoryValues = keyof typeof products;

const CategoryPage = () => {
  const { category } = useParams();

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

  return (
    <>
      <ProductsFilter category={clothingCategory}>
        <ProductsList products={clothingItems} />
      </ProductsFilter>
    </>
  );
};

export default CategoryPage;
