import initialJSONDataFromStorage from './../services/initialFormValues.json'
import { createContext, useState, useEffect } from 'react'

export const initialFormValues = createContext()

const initialSessionStorageData = sessionStorage.getItem('formData')
    ? JSON.parse(sessionStorage.getItem('formData'))
    : initialJSONDataFromStorage

export const InitialFormValuesProvider = ({ children }) => {
    const [formData, setFormData] = useState(initialSessionStorageData)

    useEffect(() => {
        sessionStorage.setItem('formData', JSON.stringify(formData))
    }, [formData])

    return <initialFormValues.Provider value={{ formData, setFormData }}>
        {children}
    </initialFormValues.Provider>
}