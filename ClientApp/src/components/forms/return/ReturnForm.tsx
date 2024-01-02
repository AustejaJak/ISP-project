import React, { ChangeEvent, useState } from "react";
import ProductRow from "../../product-row/ProductRow";
import { t } from "i18next";
import { OrderProps } from "../../order-history-ui/OrderHistoryUI";
import { Loader } from "../../Loader/Loader";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { returnApi } from "../../../clients/api/returnApi";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ReturnFormProps {
  order?: OrderProps | null;
  isLoading: boolean;
}

const ReturnForm: React.FC<ReturnFormProps> = ({ order, isLoading }) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  const returnOrder = useMutation({
    mutationKey: [QueryKey.MAKE_ORDER_RETURN, order as any],
    mutationFn: returnApi.makeOrderReturn,
  });

  const handleItemCheck = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const { checked } = e.target;
    if (!checked) {
      return setCheckedItems((prevState) =>
        prevState.filter((orderId) => orderId !== id)
      );
    }
    return setCheckedItems((prevState) => [...prevState, id]);
  };

  const handleOrderReturn = () => {
    returnOrder.mutate(
      {
        orderId: order as any,
        items: checkedItems,
      },
      {
        onSuccess: (res) => {
          console.log(res);
          navigate(-1);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };
  console.log(!!order);
  return (
    <div>
      {!order ? (
        <>
          <Loader isLoading={isLoading} />
          {!isLoading && <p>{t("Errors.OrderNotExist")}</p>}
        </>
      ) : (
        <>
          {/* {order!.products.map((product) => (
            <div className='flex items-center gap-3'>
              <input
                type='checkbox'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleItemCheck(e, product.id)
                }
              />
              <ProductRow product={product} />
            </div>
          ))} */}
          <div>
            <Button
              disabled={returnOrder.isPending}
              className='w-full'
              variant='outlined'
              onClick={handleOrderReturn}
            >
              {t("Return.ReturnButtonText")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReturnForm;
