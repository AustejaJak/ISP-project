import { useQuery } from "@tanstack/react-query";
import { CheckoutUi } from "../../../components/checkout-ui/CheckoutUi";
import { basketApi } from "../../../clients/api/basketApi";
import { QueryKey } from "../../../clients/react-query/queryKeys";

const CheckoutPage = () => {
  const { data: basket, refetch } = useQuery({
    queryKey: [QueryKey.GET_BASKET],
    queryFn: basketApi.getClientBasket,
  });

  return (
    <>
      <CheckoutUi
        handleRefetch={() => refetch()}
        products={basket?.items}
        total={basket?.totalSum || 0}
      />
    </>
  );
};

export default CheckoutPage;
