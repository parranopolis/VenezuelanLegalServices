import { useLocation } from "react-router-dom";
import { Header } from "../../components/Shared/Header";

export function ErrorPage() {
    const location = useLocation()
    const error = location.state.message
    return (
        <>
            <Header title='Intente nuevamente' />
            <span className="h3" style={{ color: 'var(--secondary-color)' }}>{error}</span>
        </>
    )
}