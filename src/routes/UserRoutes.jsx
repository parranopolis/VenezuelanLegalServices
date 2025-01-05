import React from "react";

import { Navigate, Outlet } from "react-router-dom";
// import {useAuthContext} from 

export const UserRoutes = () => {
    // const {user, role}= useAuthContext()
    // if(!user || role !== 'admin'){
    //     return <Navigate to=''/>
    // }

    return <Outlet />
}