import { createContext } from "react";
import { useState, useEffect } from "react";
import {
    aplicantPart_A_I,
    aplicantPart_A_II_Spouse,
    aplicantPart_A_II_Children,
    aplicantPart_A_III_Background
} from '../utils/steps.js'


export const StepsContext = createContext()

export const StepsProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isStepsVisible, setIsStepsVisible] = useState(true)
    const formGroups = [
        { 'Applicant': aplicantPart_A_I },
        { 'Spouse': aplicantPart_A_II_Spouse },
        { 'Children': aplicantPart_A_II_Children, },
        { 'Applicant': aplicantPart_A_III_Background },
        { end: '' }
    ]
    const [currentGroup, setCurrentGroup] = useState(0)

    const handleStepClick = (stepIndex) => {
        // setCurrentStep(stepIndex)
        setCurrentGroup(stepIndex)
        setIsStepsVisible(false)
    }

    const handleFormSubmit = () => {
        if (currentGroup < formGroups.length - 1) {
            setCurrentGroup((prev) => prev + 1)
            setCurrentStep((prev) => prev + 1)
            setIsStepsVisible(true)
        } else {
            setIsStepsVisible(true)
        }
    }

    useEffect(() => {
        // console.log(formGroups[currentStep])
    })

    return <StepsContext.Provider value={{
        currentStep,
        setCurrentStep,

        isStepsVisible,
        setIsStepsVisible,

        formGroups,
        currentGroup,

        setCurrentGroup,

        handleStepClick,
        handleFormSubmit
    }}>
        {children}
    </StepsContext.Provider>
}