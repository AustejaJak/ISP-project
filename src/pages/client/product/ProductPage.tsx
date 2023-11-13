import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import Product from "../../../components/product/Product";
import { useParams } from "react-router-dom";
import { productApi } from "../../../clients/api/productApi";

export type ProductProp = {
  id: number;
  vendor: string;
  name: string;
  price: number;
  rating: number;
  images: {
    imageUrl: string;
    alt: string;
  }[];
  colors: {
    name: string;
    bgColor: string;
    selectedColor: string;
  }[];
  description: string;
  details: {
    name: string;
    items: string[];
  }[];
};

const product = {
  id: 1,
  vendor: "Casio",
  name: "Skaitmeninis laikrodis",
  price: 3995,
  rating: 4,
  images: [
    {
      imageUrl:
        "https://img01.ztat.net/article/spp-media-p1/550814c45dbb37b698230bbfc69e678c/1f2841c199c145e3a8336bb443f17afb.jpg?imwidth=1800",
      alt: "Casio - Skaitmeninis laikrodis - silber, Padidinti",
    },
    {
      imageUrl:
        "https://img01.ztat.net/article/spp-media-p1/6775dfc91ebe3f30a5a6d15f51df5e03/53dc38021df347c3a0a273daf64369de.jpg?imwidth=1800",
      alt: "Casio - Skaitmeninis laikrodis - silber, Padidinti",
    },
    {
      imageUrl:
        "https://img01.ztat.net/article/spp-media-p1/a3e14715ed9d3a388fa4fefd2065c173/58a885d1233e414b904588ad185ec833.jpg?imwidth=1800&filter=packshot",
      alt: "Casio - Skaitmeninis laikrodis - silber, Padidinti",
    },
    {
      imageUrl:
        "https://img01.ztat.net/article/spp-media-p1/6135b7e6ceac33489cd09a489f7bd888/33e3513e06c8476bb1b30e9063610907.jpg?imwidth=1800",
      alt: "Casio - Skaitmeninis laikrodis - silber, Padidinti",
    },
  ],
  colors: [
    {
      name: "silber",
      bgColor: "bg-silver-700",
      selectedColor: "ring-gray-700",
    },
  ],
  description:
    "<p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>",
  details: [
    {
      name: "Medžiaga ir priežiūra",
      items: ["Korpusas: Plastikinis", "Apyrankė: Nerūdijantysis plienas"],
    },
    {
      name: "Išsami informacija",
      items: [
        "Užsegimas: Užlenkiama sagtis",
        "Atsparus vandeniui: 3 atm",
        "Funkcija: Datos rodymas",
        "Laikrodžio mechanizmas: Kvarcinis",
        "Ciferblatas: Skaitmeninis",
        "Prekės numeris: C1554F003-D11",
      ],
    },
  ],
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
