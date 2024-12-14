import React from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
    children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const user = localStorage.getItem("user");

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
