import { Routes as DomRoutes, Route } from "react-router-dom";
import PrivateRoute from "../../routes/backoffice/PrivateRoute";

import BackOfficeBasePage from "../backoffice/backoffice-base-order/BackOfficeBasePage";
import Routes from "../../routes/routes";
import InventoryPage from "./inventory/InventoryPage";
import UserPage from "./users/UserPage";
import ProductAdd from "../../components/product-add-ui/ProductAddUI";
import Header from "../../components/header/Header";

const navigation = [
  {
    name: "Užsakymai",
    href: `${Routes.backoffice.prefix}${Routes.backoffice.base}`,
    current: true,
  },
  {
    name: "Inventorius",
    href: `${Routes.backoffice.prefix}${Routes.backoffice.inventory}`,
    current: false,
  },
  {
    name: "Vartotojai",
    href: `${Routes.backoffice.prefix}${Routes.backoffice.users}`,
    current: false,
  },
];
const userNavigation = [{ name: "Atsijungti", href: Routes.client.base }];

const Backoffice = () => {
  return (
    <>
      <Header
        isCompany
        profileNavigation={userNavigation}
        navigation={navigation}
      />
      <DomRoutes>
        <Route
          path={Routes.backoffice.base}
          element={
            <PrivateRoute>
              <BackOfficeBasePage />
            </PrivateRoute>
          }
        />
        <Route
          path={Routes.backoffice.inventory}
          element={
            <PrivateRoute>
              <InventoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path={Routes.backoffice.users}
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route
          path={Routes.backoffice.productsAdd}
          element={
            <PrivateRoute>
              <ProductAdd />
            </PrivateRoute>
          }
        />
      </DomRoutes>
    </>
  );
};

export default Backoffice;
