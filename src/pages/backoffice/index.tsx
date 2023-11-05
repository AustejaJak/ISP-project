import React from "react";
import { Routes as DomRoutes, Route } from "react-router-dom";
import PrivateRoute from "../../routes/backoffice/PrivateRoute";

import BackOfficeBasePage from "../backoffice/backoffice-base-order/BackOfficeBasePage";
import Routes from "../../routes/routes";
import InventoryPage from "./inventory/InventoryPage";
import UserPage from "./users/UserPage";

const Backoffice = () => {
    return (
        <DomRoutes>
            <Route path={Routes.backoffice.base} element={<PrivateRoute><BackOfficeBasePage /></PrivateRoute>} />
            <Route path={Routes.backoffice.inventory} element={<PrivateRoute><InventoryPage /></PrivateRoute>} />
            <Route path={Routes.backoffice.users} element={<PrivateRoute><UserPage /></PrivateRoute>} />
        </DomRoutes>
    );
};

export default Backoffice;
