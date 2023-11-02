import React from "react";
import { Routes, Route } from "react-router-dom";
import Backoffice from "./pages/backoffice";
import Client from "./pages/client";
import Company from "./pages/company";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={`/company/*`} element={<Company />} />
        <Route path={`/back-office/*`} element={<Backoffice />} />
        <Route path={`/*`} element={<Client />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
