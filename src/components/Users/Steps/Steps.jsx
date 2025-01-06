
import { Group, Stack } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import {
    StepsCompletedContent,
    StepsContent,
    StepsItem,
    StepsList,
    StepsNextTrigger,
    StepsPrevTrigger,
    StepsRoot,
} from "@/components/ui/steps"
import './Steps.css'
import { useContext, useState, navigate } from "react"
import { StepsContext } from "../../../contexts/StepsContext"

import { Link, useNavigate } from 'react-router-dom'
import { initialFormValues } from "../../../contexts/InitialValueContext"
import { modifyPDF, downloadBlob, downloadURL } from "../Forms/Forms"

import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/firebase-config'

export function Steps() {

    const { handleStepClick, currentStep, formGroups, from } = useContext(StepsContext)
    const { formData } = useContext(initialFormValues)
    const [span, setSpan] = useState(null)
    // const savedData = localStorage.getItem('formData')
    const q = sessionStorage.getItem('formData')
    const w = JSON.parse(q)

    const navigate = useNavigate()

    const generateUniqueId = async () => {
        let unique = false;
        let newId;

        while (!unique) {
            newId = Math.floor(1000 + Math.random() * 9000); // Generar un número de 6 dígitos

            // Verificar si el ID ya existe
            const q = query(collection(db, "cases"), where("numericId", "==", newId));
            const querySnapshot = await getDocs(q);
            unique = querySnapshot.empty; // Si no hay resultados, es único
        }

        return newId;
    };



    const createPDF = async (e) => {
        e.preventDefault()
        const sessionStoragedData = sessionStorage.getItem('formData')
        const parsedData = JSON.parse(sessionStoragedData)
        try {

            // Modify the PDF
            const pdfBytes = await modifyPDF(parsedData)
            const pdfBlob = downloadBlob(pdfBytes, 'application/pdf')
            const numericId = await generateUniqueId()
            // const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })


            // Save the PDF in the Firestore
            const jsonRef = collection(firestore, 'cases')
            const jsonDoc = await addDoc(jsonRef, {
                numericId,
                jsonData: parsedData,
                timestamp: new Date(),
                status: 'created',
                name: `${parsedData.Applicant.PDFTextField2.Complete_Last_Name.value} ${parsedData.Applicant.PDFTextField2.First_Name.value}`
            })


            // const pdfRef = ref()

            // const pdf = downloadURL(pdfBlob)
            // console.log(pdfBlob)
            // return setSpan(pdf)

            navigate('/form/filed', { state: { message: 'Formulario enviado con exito', id: jsonDoc.id, numericID: numericId, name: name } })
        } catch (error) {
            console.log(error)
            navigate('/form/filed', { state: { message: 'Hubo un problema al enviar el formulario. Intente nuevamente.' } });
        }

    }


    return (
        <>
            {/* {span ? (
                <div>
                    <h3>PDF Modificado</h3>
                    <a href={span} download="modified_form.pdf">Descarga una copia aqui</a>

                    <object data={span} type="application/pdf" width='100%' height='810vh' >

                    </object>
                </div>
            ) : null} */}
            <Stack className="Stack">
                <span className="h3">Pasos para llenar el Asilo </span>
                <span className="h4">Forma I-589</span>
                <StepsRoot count={formGroups.length} height="700px" step={currentStep} orientation="vertical">
                    <StepsList>
                        <StepsItem index={0} title="Informacion Personal" description='Parte A-1' />
                        <StepsItem index={1} title="Pareja" description='Parte A-2' />
                        <StepsItem index={2} title="Hijos" description='Parte A-3' />
                        <StepsItem index={3} title="Historial" description='Parte A-4' />
                        <StepsItem index={4} title="Información de su Aplicación" description='Parte B-1' />
                        <StepsItem index={5} title="Información Adicional de su Aplicación" description='Parte C-1' />
                    </StepsList>

                    <StepsContent index={0}>Informacion Personal</StepsContent>
                    <StepsContent index={1}>Pareja</StepsContent>
                    <StepsContent index={2}>Hijos</StepsContent>
                    <StepsContent index={3}>Información de su historial</StepsContent>
                    <StepsContent index={4}>Información sobre su Aplicación</StepsContent>
                    <StepsContent index={5}>Información Adicional de su Aplicación</StepsContent>
                    <StepsCompletedContent>
                        All steps are complete!
                    </StepsCompletedContent>

                    <Group>
                        <StepsPrevTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleStepClick(Math.max(currentStep - 1, 2))} name='Prev'>
                                Prev
                            </Button>
                        </StepsPrevTrigger>
                        <StepsNextTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleStepClick(Math.min(currentStep + 1, 2))} name='Next'>
                                Next
                            </Button>
                        </StepsNextTrigger>
                        {/* {currentStep == formGroups.length ? <div><Button onClick={(e) => createPDF(e)}>Crear PDF</Button></div> : ''} */}
                        <div><Button onClick={(e) => createPDF(e)}>Crear PDF</Button></div>
                    </Group>
                </StepsRoot>
            </Stack>
        </>
    )
}
