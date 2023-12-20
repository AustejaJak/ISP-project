import "./App.css";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18next from "./i18n/config";
import { I18nextProvider } from "react-i18next";
import { UserContextProvider } from "./context/userContext";
import { CartContextProvider } from "./context/cartContext";
import { ReturnContextProvider } from "./context/returnContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "date-fns/locale/lt";
import { SnackbarContextProvider } from "./context/snackbarContext";
import { useEffect } from "react";
import cookie from "cookiejs";

const queryClient = new QueryClient();

export const App = () => {
  useEffect(() => {
    const token = cookie.get("token")
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UserContextProvider>
          <CartContextProvider>
            <SnackbarContextProvider>
              <ReturnContextProvider>
                <QueryClientProvider client={queryClient}>
                  <BrowserRouter>
                    <AppRoutes />
                  </BrowserRouter>
                </QueryClientProvider>
              </ReturnContextProvider>
            </SnackbarContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </LocalizationProvider>
    </I18nextProvider>
  );
};

export default App;
