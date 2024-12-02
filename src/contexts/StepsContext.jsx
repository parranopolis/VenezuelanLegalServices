import { createContext } from "react";
import { useState, useEffect } from "react";
import {
    aplicantPart_A_I,
    aplicantPart_A_II_Spouse,
    aplicantPart_A_II_Children,
    aplicantPart_A_III_Background,
    aplicantPart_B_I,
    aplicantPart_C_I
} from '../utils/steps.js'
import { LuTrendingUp } from "react-icons/lu";


export const StepsContext = createContext()

export const StepsProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isStepsVisible, setIsStepsVisible] = useState(true)
    const formGroups = [
        { 'Applicant': aplicantPart_A_I },
        { 'Spouse': aplicantPart_A_II_Spouse },
        { 'Children': aplicantPart_A_II_Children, },
        { 'Background': aplicantPart_A_III_Background },
        { 'Application_Information': aplicantPart_B_I },
        { 'Application_Aditional_Information': aplicantPart_C_I },
    ]
    const [currentGroup, setCurrentGroup] = useState(0)

    const handleStepClick = (stepIndex) => {
        // setCurrentStep(stepIndex)
        setCurrentGroup(stepIndex)
        setIsStepsVisible(false)
    }

    const handleFormSubmit = () => {
        if (currentGroup < formGroups.length - 1) {
            // setCurrentGroup((prev) => prev + 1)
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