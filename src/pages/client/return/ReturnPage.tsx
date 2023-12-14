import ReturnForm from "../../../components/forms/return/ReturnForm";
import BasePage from "../../../components/base-page/BasePage";
import { useNavigate, useParams } from "react-router-dom";
import closeIcon from "../../../images/close.svg";
import { useTranslation } from "react-i18next";
import { useReturnContext } from "../../../context/returnContext";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { ordersApi } from "../../../clients/api/ordersApi";
import { useUserContext } from "../../../context/userContext";

const ReturnPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { orderId } = useParams();
  const { clearOrderInformation, order } = useReturnContext();
  const { userInformation } = useUserContext();

  const handleCloseWindow = () => {
    clearOrderInformation();
    navigate(-1);
  };

  console.log(order);

  const { data: returnOrder, isLoading } = useQuery({
    queryKey: [QueryKey.FIND_ORDER_BY_ID],
    queryFn: () =>
      ordersApi.getOrderById({ userId: userInformation.id, orderId: orderId! }),
    enabled: !order && !!orderId && !!userInformation,
  });

  return (
    <BasePage>
      <div className='w-4/6 mx-auto'>
        <div className='flex flex-row items-center justify-between mb-6'>
          <h2 className='text-[28px] font-bold'>{t("Return.PageTitleText")}</h2>
          <img
            onClick={handleCloseWindow}
            src={closeIcon}
            alt='close icon'
            className='w-7 h-7 cursor-pointer'
          />
        </div>

        <div className='flex justify-center'>
          <ReturnForm order={order || returnOrder} isLoading={isLoading} />
        </div>
      </div>
    </BasePage>
  );
};

export default ReturnPage;
