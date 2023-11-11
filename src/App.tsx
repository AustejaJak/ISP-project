import "./App.css";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18next from "./i18n/config";
import { I18nextProvider } from "react-i18next";
import { UserContextProvider } from "./context/userContext";

const queryClient = new QueryClient();

function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </UserContextProvider>
    </I18nextProvider>
  );
}

export default App;
