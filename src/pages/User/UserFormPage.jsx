import { Alert, Button } from "@chakra-ui/react"
import { Link, Navigate } from "react-router-dom"
import { EditDocument } from "../Edit Document/EditDocument"
import { Header } from "../../components/Shared/Header"
export function UserFormPage() {

    const onProcess = () => {
        alert('Lo siento, esta ruta no esta disponible en estos momentos')
    }

    return (
        <>
            <Header title='Escoge una Acción' />

            <section className="container userActions">
                <Button><Link to={'/newdocument'}>Crear un Nuevo Documento</Link></Button>


                <Button onClick={onProcess}><Link>Actualizar documento existente</Link></Button>


                <Button onClick={onProcess}><Link>Obtener una copia</Link></Button>
            </section>

        </>
    )
}