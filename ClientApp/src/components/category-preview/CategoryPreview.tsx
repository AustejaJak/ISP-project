import Anchor from "../anchor/Anchor";
import products from "../../products.json";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { productApi } from "../../clients/api/productApi";
import { backofficeProductApi } from "../../clients/api/backoffice/productApi";

type CategoryProp = {
  name: string;
  href: string;
  imageSrc: string;
};

const categoryDetails = {
  Watches: {
    title: "Laikrodžiai",
    id: 1,
    href: "watches",
    imageUrl:
      "https://www.chapelle.co.uk/Images/Components/TwoColumn/Chapelle%20Gents%20Watches%20700x500_2023299-143139.jpg",
  },
  Clotches: {
    title: "Drabužiai",
    href: "clothes",
    id: 2,
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/RSVpaW37_wie2_Ch_jPJE6MmN40=/0x0:6016x4016/1200x675/filters:focal(2527x1527:3489x2489)/cdn.vox-cdn.com/uploads/chorus_image/image/68832785/GettyImages_1177471633.0.jpg",
  },
  Decorations: {
    title: "Dekoracijos",
    href: "decorations",
    id: 3,
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/autumn-decorations-1661869057.jpg",
  },
  Electronics: {
    title: "Elekronikos prekės",
    id: 4,
    href: "electronics",
    imageUrl:
      "https://www.parkerpawn.com/wp-content/uploads/2023/08/electronic-gadgets.jpeg",
  },
  Books: {
    title: "Knygos",
    id: 5,
    href: "books",
    imageUrl:
      "https://celadonbooks.com/wp-content/uploads/2019/09/memoir-definition.jpg",
  },
};

type CategoryDetails = {
  title: String;
  href: string;
  id: number;
  imageUrl: string;
};

const CategoryPreview = () => {
  const { data: categories } = useQuery({
    queryKey: [QueryKey.FIND_PRODUCT_BY_ID],
    queryFn: backofficeProductApi.getProductCategories,
  });

  console.log(categories);

  return (
    <div className='bg-white'>
      <div className='py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8'>
        <div className='px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Shop by Category
          </h2>
          <a
            href='#'
            className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
          >
            Browse all categories
            <span aria-hidden='true'> &rarr;</span>
          </a>
          {categories?.map((category) => {
            const detailedCategory = (categoryDetails as any)[category.type];
            return (
              <Anchor
                key={detailedCategory.id}
                href={detailedCategory.href}
                className='relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto'
              >
                <span aria-hidden='true' className='absolute inset-0'>
                  <img
                    src={detailedCategory.imageUrl}
                    alt=''
                    className='h-full w-full object-cover object-center'
                  />
                </span>
                <span
                  aria-hidden='true'
                  className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50'
                />
                <span className='relative mt-auto text-center text-xl font-bold text-white'>
                  {detailedCategory.title}
                </span>
              </Anchor>
            );
          })}
        </div>

        <div className='mt-4 flow-root'>
          <div className='-my-2'>
            <div className='relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible'>
              <div className='min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0'></div>
            </div>
          </div>
        </div>
        <div className='mt-6 px-4 sm:hidden'>
          <a
            href='#'
            className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Browse all categories
            <span aria-hidden='true'> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryPreview;
