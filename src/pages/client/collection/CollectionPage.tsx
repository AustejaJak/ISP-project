import React from "react";
import products from "../../../products.json";
import ProductsFilter from "../../../components/products-filter/ProductsFilter";
import ProductsList from "../../../components/products-list/ProductsList";
import { defaultFilters } from "../../../filters/DefaultFilters";

const CollectionPage = () => {
  const items = products.watches.items;
  const watchItems = items.map(({ id, name, images, price }) => ({
    id,
    name,
    imageSrc: images[0]?.imageUrl,
    imageAlt: images[0]?.alt,
    price,
  }));

  const category = {
    title: "Dizainerio rubai",
    description: "fancy rubai",
  };

  return (
    <>
      <ProductsFilter category={category} filters={defaultFilters}>
        <ProductsList products={watchItems} />
      </ProductsFilter>
    </>
  );
};

export default CollectionPage;
