import { useLocation } from "react-router-dom"
import { firestore } from "../../../firebase-config"
import { getDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from "react"
import { modifyPDF, downloadBlob, downloadURL } from "../../components/Forms/Forms"
import { Button } from "@chakra-ui/react"
export function Filed() {

    const [span, setSpan] = useState(null)
    const [storageData, setStorageData] = useState(null)
    const location = useLocation()
    const message = location.state.message
    const id = location.state.id
    const number = location.state.numericID

    useEffect(() => {

        const verifyDocument = async (docId) => {
            const docRef = doc(firestore, 'cases', docId)
            const docSnap = await getDoc(docRef)

            setStorageData(docSnap.data().jsonData)
            // console.log(docSnap.data().jsonData)
        }
        verifyDocument(id)
    }, [])

    const seeDocument = async () => {
        const pdfBytes = await modifyPDF(storageData)
        const pdfBlob = downloadBlob(pdfBytes, 'application/pdf')
        const PDFUrl = downloadURL(pdfBlob)
        // downloadURL(PDFUrl, '5-589.pdf')
        return setSpan(PDFUrl)
    }
    return (
        <>
            <h1>{message}</h1>
            <p>Sus datos y PDF ha sido guardados con exito</p>
            <span className="h3">Guarde este ID para futuras referencias: {number}</span>
            {/* <button onClick={seeDocument}>Ver Documento</button> */}
            <div>
                <Button onClick={seeDocument}>Ver Documento</Button>
            </div>
            {span ? (
                <div>
                    <h3>PDF Modificado</h3>
                    <a href={span} download="modified_form.pdf">Descarga una copia aqui</a>

                    <object data={span} type="application/pdf" width='100%' height='810vh' >

                    </object>
                </div>
            ) : null}
        </>
    )
}