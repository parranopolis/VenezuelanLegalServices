import { Button } from "@chakra-ui/react"
import { handleLogout } from "../../utils/firebaseUtils"
import './Shared.css'
import { useContext, useState } from "react"
import { useAuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

export function Header({ title }) {

    const { userInfo } = useAuthContext()

    return (<section className="header">
        <span className="h2">{title}</span>
        {userInfo.user == null ? '' : <Button onClick={handleLogout}>Cerrar sesion</Button>}
    </section>)
}

export function HomeHeader() {
    const [isMenuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

    return (
        <header className="shadow">
            <div className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="logo">Logo</div>
            <nav className="nav">
                {/* class -> active */}
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><a href="#">Misión</a></li>
                    <li><a href="#">Visión</a></li>
                    <li><a href="#">Productos</a></li>
                </ul>
            </nav>
            <div className="auth"><Link to={'/adminlogin'}>Iniciar Sesión</Link></div>
        </header>
    )
}