import { Routes as DomRoutes, Route } from "react-router-dom";
import PrivateRoute from "../../routes/backoffice/PrivateRoute";

import BackOfficeBasePage from "../backoffice/backoffice-base-order/BackOfficeBasePage";
import Routes from "../../routes/routes";
import InventoryPage from "./inventory/InventoryPage";
import UserPage from "./users/UserPage";
import ProductAdd from "../../components/product-add-ui/ProductAddUI";
import Header from "../../components/header/Header";
import { t } from "i18next";
import { DiscountPage } from "./discount/DiscountPage";

const userNavigation = [{ name: "Atsijungti", href: Routes.client.base }];

const Backoffice = () => {
  const navigation = [
    {
      name: t("BackofficeBasePage.OrdersTitle"),
      href: `${Routes.backoffice.prefix}`,
      current: true,
    },
    {
      name: t("BackofficeInventoryPage.TitleText"),
      href: `${Routes.backoffice.prefix}${Routes.backoffice.inventory}`,
      current: false,
    },
    {
      name: t("BackofficeEmployersPage.TitleText"),
      href: `${Routes.backoffice.prefix}${Routes.backoffice.users}`,
      current: false,
    },
    {
      name: t("BackofficeBasePage.DiscountNavigationTitle"),
      href: `${Routes.backoffice.prefix}${Routes.backoffice.discount}`,
      current: false,
    },
  ];
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
        <Route
          path={Routes.backoffice.discount}
          element={
            <PrivateRoute>
              <DiscountPage />
            </PrivateRoute>
          }
        />
      </DomRoutes>
    </>
  );
};

export default Backoffice;
