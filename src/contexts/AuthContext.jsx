import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getUserRole } from "../utils/firebaseUtils";
import { auth } from "../firebase/firebase-config";
import { resolvePath } from "react-router-dom";

const AuthContext = createContext()
const UID = auth

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [access, setAccess] = useState(sessionStorage.getItem('access') || 'deny')

    useEffect(() => {
        sessionStorage.setItem('access', access)
    }, [access])


    const login = () => setAccess('allow')
    const logout = () => setAccess('deny')

    const [userInfo, setUserInfo] = useState({
        user: null,
        userId: null,
        userName: null,
        role: null
    })

    const authMethod = getAuth()

    const actualUser = auth.currentUser
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            let role

            if (user) {
                try {
                    const getRole = await getUserRole()
                    role = getRole
                } catch (error) {
                    console.log(error)
                }
                setUserInfo({
                    user,
                    userId: user.uid,
                    userName: user.displayName || "Usuario Anónimo",
                    role
                });
            } else {
                // console.log("No hay usuario autenticado");
                setUserInfo({
                    user: null,
                    userId: null,
                    userName: null,
                });
            }
        });

        // Limpieza del listener al desmontar el componente
        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={{ userInfo, access, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)