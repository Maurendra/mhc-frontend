import React, { Fragment } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import CompanyDashboard from "../pages/CompanyDashboard";
import VendorDashboard from "../pages/VendorDashboard";
import Login from "../pages/Login";
import AuthContext from "../AuthContext";
import Provider from "../config/data/Provider";

export default function App(props) {
  const { auth } = React.useContext(AuthContext);
  Provider.init();

  function RequireAuth({ children }) {
    let location = useLocation();
    if (!auth) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
  }

  function CheckAuth({ children }) {
    let location = useLocation();
    if (auth) {
      if (auth.role == "vendor") {
        return (
          <Navigate to="/vendor-dashboard" state={{ from: location }} replace />
        );
      } else {
        return (
          <Navigate
            to="/company-dashboard"
            state={{ from: location }}
            replace
          />
        );
      }
    }

    return children;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth>
              <Login />
            </CheckAuth>
          }
        />

        <Route
          path="/company-dashboard"
          element={
            <RequireAuth>
              <CompanyDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/vendor-dashboard"
          element={
            <RequireAuth>
              <VendorDashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}
