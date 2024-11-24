
import { For, Group, Stack } from "@chakra-ui/react"
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


export function Steps() {
    return (
        <>
            <Stack gap="16">
                <For each={["sm"]}>
                    {(size) => (
                        <StepsRoot key={size} size={size} count={3} height="200px" defaultValue={1} orientation="vertical">
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
                                    <Button variant="outline" size="sm">
                                        Prev
                                    </Button>
                                </StepsPrevTrigger>
                                <StepsNextTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        Next
                                    </Button>
                                </StepsNextTrigger>
                            </Group>
                        </StepsRoot>
                    )}
                </For>
            </Stack></>
    )
}