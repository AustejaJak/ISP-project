import React, { useState } from "react";
import { useContext } from "react";
import { ProductProp } from "../pages/client/product/ProductPage";

interface CartProps {
  products: ProductProp[];
  total: number;
}

interface CartContextProps {
  cart: CartProps;
  AddItemToCart: (data: ProductProp) => void;
  RemoveItemFromCart: (data: ProductProp) => void;
}

const CartContext = React.createContext<CartContextProps>(
  {} as CartContextProps
);

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useState<ProductProp[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);

  return (
    <CartContext.Provider
      value={{
        cart: { products: cart, total: totalCartPrice },
        AddItemToCart: () => {},
        RemoveItemFromCart: () => {},
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useUserContext = (): CartContextProps => useContext(CartContext);
