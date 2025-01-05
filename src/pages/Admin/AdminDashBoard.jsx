import { Button } from "@chakra-ui/react";
import { handleLogout } from "../../utils/firebaseUtils";
import { auth } from "../../firebase/firebase-config";
import { getAuth, signOut } from 'firebase/auth'

export function AdminDashBoard() {
    const closeSession = async () => {
        const user = getAuth()
        console.log(user)
        const q = handleLogout()

        // const q = async () => {
        //     try {
        //         await signOut(user)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // q()
    }
    return (
        <>
            <div>
                <Button onClick={handleLogout}>Cerrar sesion</Button>
            </div>
            <span className="h2">Admin DashBoard</span>
        </>
    )
}