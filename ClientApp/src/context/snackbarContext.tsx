import React, { useEffect, useState } from "react";
import { useContext } from "react";

interface SnackbarProps {
  message: string | null;
  setMessage: (message: string) => void;
  clearMessage: () => void;
}

const SnackbarContext = React.createContext<SnackbarProps>({} as SnackbarProps);

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarContextProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const timerToken = setTimeout(() => {
      setMessage(null);
    }, 4000);
    return () => {
      clearTimeout(timerToken);
    };
  }, [message]);

  const clearMessage = () => setMessage(null);

  return (
    <SnackbarContext.Provider value={{ message, setMessage, clearMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = (): SnackbarProps =>
  useContext(SnackbarContext);
