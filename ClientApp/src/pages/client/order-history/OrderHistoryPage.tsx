import { useQuery } from "@tanstack/react-query";
import {
  OrderProps,
  OrdersHistory,
} from "../../../components/order-history-ui/OrderHistoryUI";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { ordersApi } from "../../../clients/api/ordersApi";

const OrderHistoryPage = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: [QueryKey.GET_CLIENT_ORDERS_HISTORY],
    queryFn: ordersApi.getOrdersHistory,
  });

  return (
    <>
      <OrdersHistory
        isLoading={isLoading}
        orders={orders || ([] as OrderProps[])}
      />
    </>
  );
};

export default OrderHistoryPage;
