import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase/firebase-config";

export const AdminRoutes = () => {
    const { userInfo, role, userId } = useAuthContext()

    console.log(userInfo.role)

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user === null) {
                navigate('/adminlogin')
            }
        })
    })
    return <Outlet />
}