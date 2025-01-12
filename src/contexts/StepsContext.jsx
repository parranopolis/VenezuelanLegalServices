import { createContext } from "react";
import { useState, useEffect } from "react";
import {
    aplicantPart_A_I,
    aplicantPart_A_II_Spouse,
    aplicantPart_A_II_Children,
    aplicantPart_A_III_Background,
    aplicantPart_B_I,
    aplicantPart_C_I,
    Children,
    FilterChildrenFormData
} from '../utils/steps.jsx'
import { LuTrendingUp } from "react-icons/lu";
import { Final } from "../components/Users/Forms/Forms.jsx";

export const StepsContext = createContext()

export const StepsProvider = ({ children }) => {
    // "BG_City_5Y
    // BG_Number_Street_5Y
    // BG_State_5Y
    const [currentStep, setCurrentStep] = useState(3)
    const [totalChildren, setTotalChildren] = useState(0)
    const [isStepsVisible, setIsStepsVisible] = useState(false)
    const [childrenNames, setChildrenNames] = useState(['0'])
    const [RadioChecked, setRadioChecked] = useState(null)
    Children(childrenNames)

    FilterChildrenFormData(totalChildren)

    const formGroups = [
        { 'Applicant': aplicantPart_A_I },
        { 'Spouse': aplicantPart_A_II_Spouse },
        { 'Children': aplicantPart_A_II_Children, },
        { 'Background': aplicantPart_A_III_Background },
        { 'Application_Information': aplicantPart_B_I },
        { 'Application_Aditional_Information': aplicantPart_C_I },
    ]

    const w = sessionStorage.getItem('formData')
    if (w) {
        const q = JSON.parse(w)
        const spouse = q.Applicant.PDFRadioGroup2.Marital_Status.value === 'Casado Legalmente'
        if (spouse) {
            formGroups.splice(1, 1)
            console.log(q.Applicant.PDFCheckBox2.marital_Status)
            q.Applicant.PDFCheckBox2.marital_Status.value = 'on'
            sessionStorage.setItem('formData', JSON.stringify(q))
            console.log(q.Applicant.PDFCheckBox2.marital_Status)
            // sessionStorage.setItem('formData', )
            // console.log(q.Applicant.PDFRadioGroup2.Marital_Status)
        }
    }


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

    return <StepsContext.Provider value={{
        currentStep,
        setCurrentStep,

        isStepsVisible,
        setIsStepsVisible,

        formGroups,
        currentGroup,

        setCurrentGroup,

        handleStepClick,
        handleFormSubmit,
        totalChildren, setTotalChildren,
        RadioChecked, setRadioChecked
    }}>
        {children}
    </StepsContext.Provider>
}