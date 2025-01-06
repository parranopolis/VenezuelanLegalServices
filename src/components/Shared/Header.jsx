import { Button } from "@chakra-ui/react"
import { handleLogout } from "../../utils/firebaseUtils"
import './Shared.css'
import { useContext } from "react"
import { useAuthContext } from "../../contexts/AuthContext"
export function Header({ title }) {

    const { userInfo } = useAuthContext()

    return (<section className="header">
        <span className="h2">{title}</span>
        {userInfo.user == null ? '' : <Button onClick={handleLogout}>Cerrar sesion</Button>}
    </section>)
}