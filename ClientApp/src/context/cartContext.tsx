import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ProductProp } from "../pages/client/product/ProductPage";

export interface CartProductsProps {
  product: ProductProp;
  count: number;
}

interface CartProps {
  products: CartProductsProps[];
  total: number;
  count: number;
}

interface CartContextProps {
  cart: CartProps;
  AddItemToCart: (data: ProductProp) => void;
  RemoveItemFromCart: (data: ProductProp) => void;
  ClearItemFromCart: (id: string) => void;
  ChangeProductCount: (id: number, count: number) => void;
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
  const [cart, setCart] = useState<CartProductsProps[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [totalCartItems, setTotalCartItems] = useState<number>(0);

  const AddItemToCart = (product: ProductProp) => {
    const found = cart.find(
      (item: CartProductsProps) => item.product.sku === product.sku
    );
    if (found) {
      return setCart((prevState) =>
        prevState.map((item) => ({ ...item, count: item.count + 1 }))
      );
    }
    return setCart((prevState) => [
      ...prevState,
      { product: product, count: 1 },
    ]);
  };

  const ClearItemFromCart = (id: string) => {
    setCart((prevState) => prevState.filter((item) => item.product.sku !== id));
  };

  const ChangeProductCount = (id: number, count: number) => {
    setCart((prevState) =>
      prevState.map((item) =>
        item.product.sku === id.toString() ? { ...item, count } : { ...item }
      )
    );
  };

  const recalculateTotalPrice = () => {
    return cart.reduce((acc, item) => {
      return acc + item.product.cost * item.count;
    }, 0);
  };

  const calculateTotalCartItems = () => {
    return cart.reduce((acc, item) => {
      return acc + item.count;
    }, 0);
  };

  useEffect(() => {
    setTotalCartPrice(recalculateTotalPrice());
    setTotalCartItems(calculateTotalCartItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart: { products: cart, total: totalCartPrice, count: totalCartItems },
        AddItemToCart,
        RemoveItemFromCart: () => {},
        ClearItemFromCart,
        ChangeProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextProps => useContext(CartContext);
