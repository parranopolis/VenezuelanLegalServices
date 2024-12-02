
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

import { useContext } from "react"
import { StepsContext } from "../../contexts/StepsContext"

export function Steps() {

    const { handleStepClick, currentStep, formGroups } = useContext(StepsContext)
    return (
        <>
            <Stack>
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
                        {currentStep == formGroups.length ? <Button>Crear PDF</Button> : ''}
                    </Group>
                </StepsRoot>
            </Stack></>
    )
}