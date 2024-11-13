import initialJSONDataFromStorage from './../services/initialFormValues.json'
import { createContext, useState } from 'react'

export const initialFormValues = createContext()


export const InitialFormValuesProvider = ({ children }) => {
    const [formData, setFormData] = useState(initialJSONDataFromStorage)
    return <initialFormValues.Provider value={{ formData, setFormData }}>
        {children}
    </initialFormValues.Provider>
}