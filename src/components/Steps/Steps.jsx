
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
            <Stack gap="16">
                <StepsRoot count={3} height="200px" step={currentStep} orientation="vertical">
                    <StepsList>
                        <StepsItem index={0} title="Step 1" description='Parte A I' />
                        <StepsItem index={1} title="Step 2" description='Parte A II' />
                        <StepsItem index={2} title="Step 3" description='Parte A III' />
                    </StepsList>

                    <StepsContent index={0}>Informacion Personal</StepsContent>
                    <StepsContent index={1}>Esposa e Hijos</StepsContent>
                    <StepsContent index={2}>Informacion de su historial</StepsContent>
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
                        {currentStep == formGroups.length - 1 ? <Button>Crear PDF</Button> : ''}
                    </Group>
                </StepsRoot>
            </Stack></>
    )
}