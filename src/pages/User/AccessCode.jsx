import { PinInput } from "@/components/ui/pin-input"
import { AspectRatio, Center } from "@chakra-ui/react"
import { Header } from "../../components/Shared/Header"
import { useLocation, useNavigate } from "react-router-dom"
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore'
import { db } from "../../firebase/firebase-config"
import { useState } from "react"
import { useAuthContext } from "../../contexts/AuthContext"

import { Alert } from "@/components/ui/alert"

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
            {alert}
            <span className="h5">Por Favor ingrese el codigo proporcionado por el administrador</span>
            <span className="h5">{usedCode}</span>
            <PinInput
                value={pin}
                colorPalette='blue'
                autoFocus={true}
                onValueComplete={(e) => handlePinComplete(e)}
                size='lg' />
        </>

    )

}