import PrivateRoute from "../../routes/company/PrivateRoute";
import { Routes as DomRoutes, Route } from "react-router-dom";
import Routes from "../../routes/routes";
import ActivePage from "./active/ActivePage";
import PendingPage from "./pending/PendingPage";
import Header from "./header/Header";
import IndexPage from "./index/IndexPage";

const Company = () => {
  return (
    <>
      <Header />
      <DomRoutes>
        <Route
          path={Routes.company.base}
          element={
            <PrivateRoute>
              <IndexPage />
            </PrivateRoute>
          }
        />
        <Route
          path={Routes.company.active}
          element={
            <PrivateRoute>
              <ActivePage />
            </PrivateRoute>
          }
        />
        <Route
          path={Routes.company.pending}
          element={
            <PrivateRoute>
              <PendingPage />
            </PrivateRoute>
          }
        />
      </DomRoutes>
    </>
  );
};

export default Company;
