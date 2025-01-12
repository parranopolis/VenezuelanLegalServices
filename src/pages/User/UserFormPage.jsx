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
                <Link to='/accesCode' state={{ link: 'newDocument' }}>
                    <Button>
                        Crear un Nuevo Documento
                    </Button>
                </Link>


                <Link>
                    <Button onClick={onProcess}>
                        Actualizar documento existente
                    </Button>
                </Link>


                <Link>
                    <Button onClick={onProcess}>
                        Obtener una copia
                    </Button>
                </Link>
            </section>

        </>
    )
}