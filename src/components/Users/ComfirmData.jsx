import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { CheckAccessCode } from "../../pages/User/AccessCode";

export function ConfirmData() {
    const [checkCodeUI, setCheckCodeUI] = useState(true)
    const toggleModal = (e) => {
        setCheckCodeUI(!checkCodeUI)
    }


    return (
        <section>
            <div>
                <span className="h2">Confirmar Datos</span>
                <span>Aqui se revisaran los datos antes de enviarlos </span>
            </div>
            <div>
                <Button onClick={(toggleModal)}>Crear PDF</Button>
            </div>

            {checkCodeUI ?
                <section className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CheckAccessCode />
                    </div>
                </section>
                : ''}
        </section>
    )
}
