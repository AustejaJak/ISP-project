import Header from "../../components/header/Header";
import PrivateRoute from "../../routes/company/PrivateRoute";
import { Routes as DomRoutes, Route } from "react-router-dom";
import Routes from "../../routes/routes";
import SignInPage from "./sign-in/SignIn";
import SignUpPage from "./sign-up/SignUpPage";
import CategoryPreview from "../../components/category-preview/CategoryPreview";
import CategoryPage from "./category/CategoryPage";
import ProductPage from "./product/ProductPage";
import ProfilePage from "./profile/ProfilePage";
import InitialUiPage from "./initial-promo-section/InitialUiPage";

const Client = () => {
  return (
    <>
      <Header />
      <DomRoutes>
          <Route path={Routes.client.base} element={<InitialUiPage />} />
        <Route
          path={Routes.client.login}
          element={
            <PrivateRoute>
              <SignInPage />
            </PrivateRoute>
          }
        />
        <Route path={Routes.client.register} element={<SignUpPage />} />
        <Route path={Routes.client.shop} element={<CategoryPreview />} />
        <Route path={Routes.client.category} element={<CategoryPage />} />
        <Route path={Routes.client.product} element={<ProductPage />} />
        <Route path={Routes.client.profile} element={<ProfilePage />} />
      </DomRoutes>
    </>
  );
};

export default Client;
