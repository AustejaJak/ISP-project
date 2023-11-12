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
import NewPage from "./new/NewPage";
import CollectionPage from "./collection/CollectionPage";
import CheckoutPage from "./checkout/CheckoutPage";
import ShoppingCartPage from "./shopping-cart-page-ui/ShoppingCartPage";
import OrderHistoryPage from "./order-history/OrderHistoryPage";
import ReturnPage from "./return/ReturnPage";

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
        <Route path={Routes.client.new} element={<NewPage />} />
        <Route path={Routes.client.newProducts} element={<ProductPage />} />
        <Route path={Routes.client.collection} element={<CollectionPage />} />
        <Route
          path={Routes.client.collectionProduct}
          element={<ProductPage />}
        />
        <Route path={Routes.client.product} element={<ProductPage />} />
        <Route
          path={Routes.client.individualProduct}
          element={<ProductPage />}
        />
        <Route path={Routes.client.profile} element={<ProfilePage />} />
        <Route path={Routes.client.checkout} element={<CheckoutPage />} />
        <Route
          path={Routes.client.shoppingBag}
          element={<ShoppingCartPage />}
        />
        <Route
          path={Routes.client.orderHistory}
          element={<OrderHistoryPage />}
        />
        <Route
          path={Routes.client.return}
          element={
            <PrivateRoute>
              <ReturnPage />
            </PrivateRoute>
          }
        />
      </DomRoutes>
    </>
  );
};

export default Client;
