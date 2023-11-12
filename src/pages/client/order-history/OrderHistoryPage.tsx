import { useQuery } from "@tanstack/react-query";
import Footer from "../../../components/footer/Footer";
import {
  OrderProps,
  OrdersHistory,
} from "../../../components/order-history-ui/OrderHistoryUI";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { ordersApi } from "../../../clients/api/ordersApi";
import { useUserContext } from "../../../context/userContext";

const orders = [
  {
    number: "WU88191111",
    date: "January 22, 2021",
    invoiceHref: "#",
    total: "$104.00",
    products: [
      {
        id: 1,
        name: "Men's 3D Glasses Artwork Tee",
        href: "#",
        price: "$36.00",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg",
        imageAlt:
          "Black tee with intersecting red, white, and green curved lines on front.",
      },
      {
        id: 1,
        name: "Men's 3D Glasses Artwork Tee",
        href: "#",
        price: "$36.00",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg",
        imageAlt:
          "Black tee with intersecting red, white, and green curved lines on front.",
      },
    ],
  },
  {
    number: "WU88191111",
    date: "January 22, 2021",
    datetime: "2021-01-22",
    invoiceHref: "#",
    total: "$104.00",
    products: [
      {
        id: 1,
        name: "Men's 3D Glasses Artwork Tee",
        href: "#",
        price: "$36.00",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg",
        imageAlt:
          "Black tee with intersecting red, white, and green curved lines on front.",
      },
    ],
  },
];

const OrderHistoryPage = () => {
  const { userInformation } = useUserContext();
  const { data: orders, isLoading } = useQuery({
    queryKey: [QueryKey.GET_CLIENT_ORDERS_HISTORY],
    queryFn: () => ordersApi.getOrdersHistory({ userId: userInformation.id }),
    enabled: !!userInformation,
  });

  return (
    <>
      <OrdersHistory
        isLoading={isLoading}
        orders={orders || ([] as OrderProps[])}
      />
      <Footer />
    </>
  );
};

export default OrderHistoryPage;
