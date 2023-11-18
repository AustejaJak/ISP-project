import React from "react";
import { Routes, Route } from "react-router-dom";
import Backoffice from "./pages/backoffice";
import Client from "./pages/client";
import Company from "./pages/company";
import { Snackbar } from "./components/snackbar/Snackbar";

const AppRoutes = () => {
  return (
    <div className='relative'>
      <Routes>
        <Route path={`/company/*`} element={<Company />} />
        <Route path={`/backoffice/*`} element={<Backoffice />} />
        <Route path={`/*`} element={<Client />} />
      </Routes>
      <Snackbar />
    </div>
  );
};

export default AppRoutes;
