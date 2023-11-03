import React from 'react';
import products from "../../../products.json";
import ProductsFilter from "../../../components/products-filter/ProductsFilter";
import ProductsList from "../../../components/products-list/ProductsList";
import Footer from "../../../components/footer/Footer";

const NewPage = () => {
    const items = products.watches.items;
    const watchItems = items.map(({ id, name, images, price }) => ({
        id,
        name,
        imageSrc: images[0]?.imageUrl,
        imageAlt: images[0]?.alt,
        price,
    }));

    const category = {
        title: "Naujienos",
        description: "Nauji rubai",
    };

    return (
        <>
            <ProductsFilter category={category}>
                <ProductsList products={watchItems} />
            </ProductsFilter>
            <Footer />
        </>
    );
};

export default NewPage;
