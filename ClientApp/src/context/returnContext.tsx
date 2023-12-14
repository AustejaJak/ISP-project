import React, { useState } from "react";
import { useContext } from "react";
import { OrderProps } from "../components/order-history-ui/OrderHistoryUI";

interface ReturnContextProps {
  order: OrderProps | null;
  setOrderInformation: (data: OrderProps) => void;
  clearOrderInformation: () => void;
}

const ReturnContext = React.createContext<ReturnContextProps>(
  {} as ReturnContextProps
);

interface ReturnContextProviderProps {
  children: React.ReactNode;
}

export const ReturnContextProvider: React.FC<ReturnContextProviderProps> = ({
  children,
}) => {
  const [order, setOrder] = useState<OrderProps | null>(null);

  const clearOrder = () => {
    setOrder(null);
  };

  const setOrderToReturn = (data: OrderProps) => {
    setOrder(data);
  };

  return (
    <ReturnContext.Provider
      value={{
        order,
        setOrderInformation: setOrderToReturn,
        clearOrderInformation: clearOrder,
      }}
    >
      {children}
    </ReturnContext.Provider>
  );
};

export const useReturnContext = (): ReturnContextProps =>
  useContext(ReturnContext);
