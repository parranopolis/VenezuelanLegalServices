import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const UserRoutes = () => {
    const { access } = useAuthContext()
    if (access == 'allow') {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }

}