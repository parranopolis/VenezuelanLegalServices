import { PinInput } from "@/components/ui/pin-input"
import { AspectRatio, Center } from "@chakra-ui/react"
import { Header } from "../../components/Shared/Header"
import { json, useLocation, useNavigate } from "react-router-dom"
import { doc, getDoc, getDocs, collection, query, where, addDoc, updateDoc } from 'firebase/firestore'
import { db } from "../../firebase/firebase-config"
import { useState } from "react"
import { useAuthContext } from "../../contexts/AuthContext"
import { modifyPDF, downloadBlob, downloadURL } from "../../components/Users/Forms/Forms"
import { Alert } from "@/components/ui/alert"
import './User.css'
export function AccessCode() {
    const [pin, setPin] = useState(['', '', '', ''])
    const [usedCode, setUsedCode] = useState('')
    const [alert, setAlert] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const { login } = useAuthContext()

    const verifyCode = async (code) => {
        let w
        try {
            const docRef = doc(db, 'accessCode', code)
            const queryA = query(collection(db, "accessCode"), where('code', '==', parseInt(code)))

            const q = await getDocs(queryA)
            q.forEach(doc => {
                w = doc.data()
            })

            const docSnap = await getDoc(docRef)
            // const q = await getDoc(queryA)
            if (q.empty === true) {
                console.log('entrando')
                setPin(['', '', '', ''])
                setAlert(
                    <Alert status='error' title='Codigo Invalido'>Ese codigo no existe, Intente nuevamente por favor</Alert>
                )
            } else {

                if (w.status === 'created') {
                    const destination = location.state?.link
                    login()
                    sessionStorage.setItem('accessCode', code)
                    navigate(`/${destination}`)
                } else if (w.status === 'used') {
                    // console.log(w)
                    setUsedCode('Este codigo ya fue usado')
                    setAlert(<Alert status='warning' title='Codigo usado'>este codigo ya fue usado</Alert>)
                    setPin(['', '', '', ''])
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handlePinComplete = (e) => {
        verifyCode(e.valueAsString)
    }
    return (
        <>
            <Header title='Codigo de Acceso' />
            <article className="container">

                {alert}
                <span className="h5">Por Favor ingrese el codigo proporcionado por el administrador</span>
                <span className="h5">{usedCode}</span>
                <section className="pinCodeInput">
                    <PinInput
                        value={pin}
                        colorPalette='blue'
                        autoFocus={true}
                        onValueComplete={(e) => handlePinComplete(e)}
                        size='lg' />
                </section>
            </article>
        </>

    )

}

export function CheckAccessCode() {
    const [pin, setPin] = useState(['', '', '', ''])
    const [alert, setAlert] = useState('')
    const navigate = useNavigate()
    const code = sessionStorage.getItem('accessCode')

    const handlePinComplete = async (e) => {
        const q = comparePinWithSessionStorageData(e.valueAsString, code)
        if (q) {

            try {
                const w = await createPDF(code)
                if (w) {
                    // changeCodeStatus(code)
                    navigate('/filed', { state: { message: 'Formulario enviado con exito', id: w.id, name: w.name, code: code } })
                } else {
                    setPin(['', '', '', ''])
                    setAlert(
                        <Alert status='error' title='Codigo Invalido'>Este codigo ya fue usado</Alert>
                    )
                }

            } catch (error) {
                console.log(error)
            }

        } else {
            setPin(['', '', '', ''])
            setAlert(
                <Alert status='error' title='Codigo Invalido'>Por favor use su codigo secreto</Alert>
            )
        }

    }
    return (
        <section className="">
            {alert}
            <div>
                <span className="h5">Por Favor ingrese el codigo proporcionado por el administrador</span>

                <PinInput
                    value={pin}
                    colorPalette='blue'
                    autoFocus={true}
                    onValueComplete={handlePinComplete}
                    size='lg' />
            </div>
        </section>
    )
}

const comparePinWithSessionStorageData = (pinInputValue, code) => {

    if (code === pinInputValue) {
        return true
    } else {
        return false
    }
}

const createPDF = async (code) => {
    // e.preventDefault()
    const sessionStoragedData = sessionStorage.getItem('formData')
    const parsedData = JSON.parse(sessionStoragedData)
    try {
        const p = await changeCodeStatus(code)
        if (p) {

            // Modify the PDF
            const pdfBytes = await modifyPDF(parsedData)
            const pdfBlob = downloadBlob(pdfBytes, 'application/pdf')
            // Save the PDF in the Firestore
            const jsonRef = collection(db, 'cases')
            const userName = `${parsedData.Applicant.PDFTextField2.Complete_Last_Name.value} ${parsedData.Applicant.PDFTextField2.First_Name.value}`
            const jsonDoc = await addDoc(jsonRef, {
                numericId: code,
                jsonData: parsedData,
                timestamp: new Date(),
                status: 'created',
                name: userName
            })

            return {
                name: userName,
                id: jsonDoc.id
            }
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }

}

const changeCodeStatus = async (code) => {
    let w
    const queryA = query(collection(db, "accessCode"), where('code', '==', parseInt(code)))

    const q = await getDocs(queryA)

    if (q.empty) {
        return false
    }



    for (const docSnapshot of q.docs) {
        const docRef = doc(db, 'accessCode', docSnapshot.id)
        const docData = docSnapshot.data()
        if (docData.status === 'created') {
            await updateDoc(docRef, {
                status: 'used'
            })
            return true
        } else {
            return false
        }

    }

    // q.forEach(async (docSnapshot) => {
    //     
    //     } else {
    //         w = false
    //     }
    // })
    // return w
}
