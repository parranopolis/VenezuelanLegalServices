import { useLocation } from "react-router-dom"
import { db } from "../../firebase/firebase-config"
import { getDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from "react"
import { modifyPDF, downloadBlob, downloadURL } from "../../components/Users/Forms/Forms"
import { Button } from "@chakra-ui/react"
import { Header } from "../../components/Shared/Header"
import './Filed.css'
export function Filed() {

    const [span, setSpan] = useState(null)
    const [storageData, setStorageData] = useState(null)
    const location = useLocation()
    const message = location.state.message
    const id = location.state.id
    const number = location.state.code
    useEffect(() => {


        const verifyDocument = async (docId) => {
            const docRef = await doc(db, 'cases', docId)
            const docSnap = await getDoc(docRef)

            setStorageData(docSnap.data().jsonData)
            seeDocument()
        }
        verifyDocument(id)
    }, [])

    const seeDocument = async () => {
        const q = sessionStorage.getItem('formData')
        const w = JSON.parse(q)
        const pdfBytes = await modifyPDF(w)
        const pdfBlob = downloadBlob(pdfBytes, 'application/pdf')
        const PDFUrl = downloadURL(pdfBlob)
        return setSpan(PDFUrl)
    }
    return (
        <>
            <Header title={message} />
            <article className="container filed">
                <section className="h2 pdfId">
                    <span>Guarde este ID para futuras referencias: <strong className="idNumber">{number}</strong></span>
                </section>
                {span ? (
                    <section>
                        <span className="h4">Su documento ha sido guardado</span>
                        <br />
                        <br />
                        {/* <Button size='xl'>
                            <a href={span} target="_blank">click aqui</a>
                        </Button> */}
                    </section>
                ) : null}
            </article>
        </>
    )
}