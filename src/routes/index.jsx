import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from './AdminRoutes'
import { UserRoutes } from './UserRoutes'
import { UserFormPage } from '../pages/User/UserFormPage'
import { HomePage } from "../pages/Shared/HomePage";
import { AdminDashBoard } from '../pages/Admin/AdminDashBoard'
import { Filed } from '../pages/EndProces/Filed'
import { AccessCode } from "../pages/User/AccessCode";
import { AdminLogin } from "../pages/Admin/AdminLogin";
import { CreateAccessCode } from "../pages/Admin/CreateAccessCode";
import { EditDocument } from "../pages/Edit Document/EditDocument";
export const router = createBrowserRouter([
    // public Routes
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: '/accesCode',
        element: <AccessCode />
    },
    {
        path: '/adminlogin',
        element: <AdminLogin />
    },
    {
        element: <AdminRoutes />,
        children: [
            {
                path: '/dashboard',
                element: <AdminDashBoard />
            }
        ]
    },
    {
        element: <UserRoutes />,
        children: [
            {
                path: '/form',
                element: <UserFormPage />
            },
            {
                path: '/form/filed',
                element: <Filed />
            },
            {
                path: '/createaccesscode',
                element: <CreateAccessCode />
            },
            {
                path: '/newdocument',
                element: <EditDocument />
            }
        ]
    }
],
    {
        future: {
            v7_skipActionErrorRevalidation: true,
            v7_fetcherPersist: true,
            v7_relativeSplatPath: true,
            v7_normalizeFormMethod: true,
            v7_skipActionStatusRevalidation: true,
            v7_partialHydration: true,
        }
    },
)
