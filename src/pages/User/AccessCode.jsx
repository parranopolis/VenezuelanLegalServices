import { PinInput } from "@/components/ui/pin-input"
import { AspectRatio, Center } from "@chakra-ui/react"
import { Header } from "../../components/Shared/Header"
import { useNavigate } from "react-router-dom"
export function AccessCode() {

    //una vez que se compruebe que el codigo existe, se procede a -> /form para ver las opciones
    const navigate = useNavigate()
    const q = (e) => {
        const pin = parseInt(e.valueAsString)
        if (pin === 1234) {
            navigate('/form')
        } else {
        }
    }
    return (
        <>
            <Header title='Access Code Page' />
            {/* <span className="h1">Access Code Page</span> */}
            <PinInput colorPalette='blue' autoFocus={true} onValueComplete={(e) => q(e)} size='lg' />
        </>
    )

}