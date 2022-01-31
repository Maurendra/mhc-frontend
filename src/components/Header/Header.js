import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../AuthContext";

export default () => {
  const { deleteAuth, auth } = React.useContext(AuthContext);
  const logout = () => {
    deleteAuth();
  };

  return (
    <div className="py-4 bg-white border-b">
      <div className="flex items-center max-w-6xl mx-auto justify-between px-4">
        <Link
          to={
            auth.role == "vendor" ? "/vendor-dashboard" : "/company-dashboard"
          }
        >
          <p className="text-primary cursor-pointer text-base font-semibold">
            {auth.name ? `${auth.name} - ${auth.role}` : "MHC"}
          </p>
        </Link>
        <div className="flex space-x-4 items-center">
          <NavLink
            to={
              auth.role == "vendor" ? "/vendor-dashboard" : "/company-dashboard"
            }
          >
            <div className="py-2">
              <p className="text-neutral-600 cursor-pointer text-xs">EVENTS</p>
            </div>
          </NavLink>
          <div className="py-2">
            <p
              className="text-neutral-600 cursor-pointer text-xs"
              onClick={logout}
            >
              LOGOUT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
