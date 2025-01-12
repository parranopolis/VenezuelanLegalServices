
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
import { useContext } from "react"
import { StepsContext } from "../../../contexts/StepsContext"

import { Link } from 'react-router-dom'

export function Steps() {

    const { handleStepClick, currentStep, formGroups, from } = useContext(StepsContext)

    return (
        <>
            <Stack className="Stack">
                <span className="h3">Pasos para llenar el Asilo </span>
                <span className="h4">Forma I-589</span>
                <StepsRoot count={formGroups.length} height="700px" step={currentStep} orientation="vertical">

                    <StepsList>
                        {/* <StepsItem index={0} title="Informacion Personal" description='Parte A-1' />
                        {formGroups.length === 5 ? '' : <StepsItem index={1} title="Pareja" description='Parte A-2' />}
                        <StepsItem index={1} title="Hijos" description='Parte A-3' />
                        <StepsItem index={2} title="Historial" description='Parte A-4' />
                        <StepsItem index={3} title="Información de su Aplicación" description='Parte B-1' />
                        <StepsItem index={4} title="Información Adicional de su Aplicación" description='Parte C-1' /> */}

                        {formGroups.length === 5 ? (
                            <>
                                <StepsItem index={0} title="Informacion Personal" description='Parte A-1' />
                                <StepsItem index={1} title="Hijos" description="Parte A-3" />
                                <StepsItem index={2} title="Historial" description="Parte A-4" />
                                <StepsItem index={3} title="Información de su Aplicación" description="Parte B-1" />
                                <StepsItem index={4} title="Información Adicional de su Aplicación" description="Parte C-1" />
                            </>
                        ) : (
                            <>
                                <StepsItem index={0} title="Informacion Personal" description='Parte A-1' />
                                <StepsItem index={1} title="Pareja" description="Parte A-2" />
                                <StepsItem index={2} title="Hijos" description="Parte A-3" />
                                <StepsItem index={3} title="Historial" description="Parte A-4" />
                                <StepsItem index={4} title="Información de su Aplicación" description="Parte B-1" />
                                <StepsItem index={5} title="Información Adicional de su Aplicación" description="Parte C-1" />
                            </>
                        )}

                    </StepsList>
                    <Group>
                        <article className="controlButtons">
                            <section>

                                {formGroups.length === 5 ?
                                    <>
                                        <StepsContent index={0}><span className="h5">Informacion Personal</span></StepsContent>
                                        <StepsContent index={1}><span className="h5">Hijos</span></StepsContent>
                                        <StepsContent index={2}><span className="h6">Información de su historial</span></StepsContent>
                                        <StepsContent index={3}><span className="h6">Información sobre su Aplicación</span></StepsContent>
                                        <StepsContent index={4}><span className="h6">Información Adicional de su Aplicación</span></StepsContent>
                                    </>
                                    : <>
                                        <StepsContent index={0}><span className="h5">Informacion Personal</span></StepsContent>
                                        <StepsContent index={1}><span className="h5">Pareja</span></StepsContent>
                                        <StepsContent index={2}><span className="h5">Hijos</span></StepsContent>
                                        <StepsContent index={3}><span className="h6">Información de su historial</span></StepsContent>
                                        <StepsContent index={4}><span className="h6">Información sobre su Aplicación</span></StepsContent>
                                        <StepsContent index={5}><span className="h6">Información Adicional de su Aplicación</span></StepsContent>
                                    </>}


                            </section>
                            <section className="">
                                <StepsCompletedContent>
                                    <span className="h5">
                                        All steps are complete!
                                    </span>
                                </StepsCompletedContent>
                            </section>
                            <section>
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
                            </section>
                            <section>
                                {currentStep == formGroups.length ? <div>
                                    <Link to={'/confirminfo'}>
                                        <Button>
                                            Revisar Inforamción
                                        </Button>
                                    </Link>
                                </div> : ''}
                            </section>
                        </article>
                    </Group>
                </StepsRoot>
            </Stack>


        </>
    )
}


// const generateUniqueId = async () => {
//     let unique = false;
//     let newId;

//     while (!unique) {
//         newId = Math.floor(1000 + Math.random() * 9000); // Generar un número de 6 dígitos

//         // Verificar si el ID ya existe
//         const q = query(collection(db, "cases"), where("numericId", "==", newId));
//         const querySnapshot = await getDocs(q);
//         unique = querySnapshot.empty; // Si no hay resultados, es único
//     }

//     return newId;
// };


