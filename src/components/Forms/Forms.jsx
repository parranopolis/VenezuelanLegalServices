import { useContext, useEffect, useState } from 'react'
import { initialFormValues } from '../../contexts/InitialValueContext'
import i589 from './../../assets/PDF/i-589.pdf'
import { PDFDocument } from 'pdf-lib'
import { Button, Input, Fieldset, Stack } from '@chakra-ui/react'

import './Forms.css'

import { Field } from "@/components/ui/field"
import {
    NativeSelectField,
    NativeSelectRoot,
} from "@/components/ui/native-select"

const statusMapping = {
    'Entregado en La frontera | No expira': 'EWI',
    'CBP1': 'Parole DT',
    'Visa de Turista': 'Tourist Visa',
    'Visa de Estudiante': 'Student Visa',
    'Parole Humanitario': 'Humanitarian Parole',
};

export function Forms() {
    const { formData, setFormData } = useContext(initialFormValues)
    const [PDFUrl, setPDFUrl] = useState(null)

    const handleChange = (e) => {
        const { name, value, type } = e.target

        setFormData((prevFormData) => {
            let updatedValue = value
            if (name == 'Each_Entry_Status_1' || name === 'Each_Entry_Status_2' || name === 'Each_Entry_Status_3') {
                updatedValue = statusMapping[value] || value
            }

            if (type === 'radio') {
                return {
                    ...prevFormData,
                    Applicant: {
                        ...prevFormData.Applicant,
                        PDFRadioGroup2: {
                            ...prevFormData.Applicant.PDFRadioGroup2,
                            [name]: {
                                ...prevFormData.Applicant.PDFRadioGroup2[name],
                                value: value
                            }
                        }
                    }
                }
            } else if (type === 'text' || type == 'select-one') {
                return {
                    ...prevFormData,
                    Applicant: {
                        ...prevFormData.Applicant,
                        PDFTextField2: {
                            ...prevFormData.Applicant.PDFTextField2,
                            [name]: {
                                ...prevFormData.Applicant.PDFTextField2[name],
                                value: value
                            }
                        }
                    }
                }
            }
            return prevFormData
        })
    }

    const downloadBlob = (data, filename, mimeType) => {
        let blob, url
        blob = new Blob([data], {
            type: mimeType
        })
        url = window.URL.createObjectURL(blob)
        downloadURL(url, filename)
        setTimeout(function () {
            return window.URL.revokeObjectURL(url)
        }, 1000)

    }

    const downloadURL = (data, filename) => {
        let a
        a = document.createElement('a')
        a.href = data
        a.download = filename
        document.body.appendChild(a)
        a.style = 'display:none'
        // a.click()
        a.remove()
        setPDFUrl(a)
    }
    const modifyPDF = async () => {

        try {

            const url = i589
            const existstingPdfBytes = await fetch(url).then((res) => res.arrayBuffer())

            const pdfDoc = await PDFDocument.load(existstingPdfBytes)
            const form = pdfDoc.getForm()

            // Modify text fields
            const textFields = formData.Applicant.PDFTextField2;
            Object.keys(textFields).forEach((key) => {
                const field = form.getTextField(key);
                if (field) {
                    field.setText(textFields[key].value);
                }
            });

            // Modify Radio fields
            const radioFields = formData.Applicant.PDFRadioGroup2;
            Object.keys(radioFields).forEach((key) => {
                const field = form.getRadioGroup(key);
                if (field && radioFields[key] && radioFields[key].value) {
                    // Solo selecciona si hay un valor válido
                    field.select(radioFields[key].value);
                }
            });


            // const radioFields = formData.Applicant.PDFRadioGroup2
            // Object.keys(radioFields).forEach((key) => {
            //     const fields = form.getRadioGroup(key)
            //     if (fields) {
            //         fields.select(radioFields[key].value)
            //     }
            // })

            // Save the PDF

            const pdfBytes = await pdfDoc.save()
            downloadBlob(pdfBytes, 'output.pdf', 'application/pdf')
        } catch (error) {
            console.error('Error modifying the PDF:', error);
            alert('Hubo un error al modificar el PDF. Verifica la consola para más detalles.');
        }

    }

    const applicant = formData.Applicant
    const spouse = formData.Spouse
    const children = formData.Children
    return (
        <>
            <form className='form center'>
                <FormContainer formDataContex={formData} handleChange={handleChange} modifyPDF={modifyPDF} />
            </form>
            {PDFUrl ? (
                <div>
                    <h3>PDF Modificado</h3>
                    <a href={PDFUrl} download="modified_form.pdf">Descarga una copia aqui</a>

                    <object data={PDFUrl} type="application/pdf" width='100%' height='810vh' >

                    </object>
                </div>
            ) : null}

        </>
    )
}
//base form
const FormContainer = ({ formDataContex, handleChange, modifyPDF }) => {
    const [currentSection, setCurrentSection] = useState(6)
    const { formData } = useContext(initialFormValues)

    //dictionary to segment the fields and their different types that should be displayed together
    const aplicantPart_A1 = [
        {
            name: 'Identificación',
            fields: {
                text: [
                    'Alien_Number',
                    'SSN',
                    'USCIS_Name'
                ],
            },
            extra: { id: 'ID', message: 'This is a message' }
        },
        {
            name: 'Nombres y Apellidos',
            fields: { text: ["First_Name", "Middle_Name", "Complete_Last_Name", 'Another_Name'] }
        },
        {
            name: 'Dirección',
            fields: {
                text: [
                    "Street_Number_and_Name",
                    "Apt_Number",
                    "City",
                    "State",
                    "Zip_Code",
                    "phone_Number_1",
                    'In_Care_of',
                    "phone_Number_2",
                    'Street_Number_and_Name_POX',
                    'Apt_Number_POX',
                    'City_POX',
                    'State_POX',
                    'Zip_Code_POX',]
            }
        },
        {
            name: 'Datos Demograficos',
            fields: {
                radio: [
                    {
                        'Gender': ['Male', 'Female'],

                        'Marital_Status': ['Soltero -> Nunca Casado',
                            'Casado Legalmente',
                            'Divorciado',
                            'Viudo',
                        ]
                    },

                ],
                text: ['Date_Of_Birth']
            }
        },
        {
            name: 'Nacionalidad',
            fields: {
                select: [
                    {
                        'Race_Ethnic_Tribal_Group': ['Hispano', 'AfroAmericano', 'Negro', 'Indigena', 'Asiatico']
                    }
                ],
                text: ['City_and_Country_of_Birth', 'Present_Nacionality', 'Nationality_at_Birth', 'Religion'],
            }
        },

        {
            name: 'Corte de Inmigración:',
            fields: {
                radio: [
                    {
                        "Dieciocho": [
                            'Nunca he estado en procedimientos judiciales de inmigracion',
                            'Estoy en proceso de procedimientos judiciales de inmigracion',
                            'No estoy ahora en procedimientos judiciales de inmigracion, pero he estado en el pasado'
                        ]
                    }
                ]
            }
        },
        {
            name: 'Informacion de Viaje',
            fields: {
                text: [
                    'Leave_Your_Country',
                    'I-94_Number',
                    'Each_Entry_Date_1',
                    'Each_Entry_Place_1',
                    'Each_Entry_Date_2',
                    'Each_Entry_Place_2',
                    'Each_Entry_Date_3',
                    'Each_Entry_Place_3',
                    'Each_Entry_Date_Expires'
                ],
                select: [
                    {
                        'Each_Entry_Status_1': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
                        'Each_Entry_Status_2': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
                        'Each_Entry_Status_3': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
                    }
                ]
            }
        }, {
            name: 'Documento de Viaje',
            fields: {
                text: [
                    'Passport_Country',
                    'Passport_Number',
                    'Passport_Expiration_Day',
                    'Native_Language',
                    'Other_Language'
                ],
                radio: [
                    {
                        'English': ['Yes', 'No']
                    }
                ]
            }
        }
    ]

    const renderSection = () => {
        const currentGroup = aplicantPart_A1[currentSection - 1]
        return <FormSection fields={currentGroup} formDataContex={formDataContex} handleChange={handleChange} />
    }

    // Updates the form displayed on the screen
    const updateCurrentForm = (e) => {
        e.preventDefault()
        if (e.target.name === 'last') {
            if (currentSection == 1) null
            else setCurrentSection(currentSection - 1)
        } else if (e.target.name === 'next') {
            if (currentSection == 8) null
            else setCurrentSection(currentSection + 1)
        }
    }

    const sent = (e) => {
        e.preventDefault()
        console.log(formData.Applicant)
    }
    console.log(currentSection)
    return (
        <article>
            <section className='RenderSection'>
                {renderSection()}
            </section>
            <section className='space-between buttons'>
                <div>
                    {currentSection === 1 ? '' : <Button size={'lg'} variant={'outline'} onClick={updateCurrentForm} name='last'>Anterior</Button>}
                </div>
                <div>
                    <span className='h4'>{currentSection}</span>
                </div>
                <div>
                    {currentSection === 8 ? <Button type='button' size={'lg'} onClick={modifyPDF}>Enviar</Button> : <Button size={'lg'} onClick={updateCurrentForm} name='next'> Siguiente</Button>}
                </div>
            </section>
        </article>

    )
}

//decides based on the fields passed what type of input should be displayed
const FormSection = ({ fields, handleChange, formDataContex }) => {
    return (
        <Fieldset.Root size={'lg'} maxW={'100%'} className='fieldset'>
            {fields.fields.hasOwnProperty('text') ? <InputTextComponent data={fields.fields.text} name={fields.name} handleChange={handleChange} formDataContex={formDataContex} /> : ''}
            {fields.fields.hasOwnProperty('radio') ? <InputRadio data={fields.fields.radio} name={fields.name} handleChange={handleChange} formDataContex={formDataContex} /> : ''}
            {fields.fields.hasOwnProperty('select') ? <InputSelect data={fields.fields.select} name={fields.name} handleChange={handleChange} formDataContex={formDataContex} /> : ''}
        </Fieldset.Root>
    )
}

function InputSelect({ data, formDataContex, handleChange }) {
    return (
        <>
            {data.map((group) => {
                return Object.keys(group).map((key) => {
                    const property = findProperty(formDataContex.Applicant.PDFTextField2, key);
                    return (
                        <section key={key}>
                            <label htmlFor={key} className='h6 opacity'>{property.label}</label>
                            <NativeSelectRoot
                                id={key}
                                name={key}
                                value={property.value !== 'N/A' ? property.value : ''}
                                onChange={handleChange}
                            >
                                <NativeSelectField>
                                    <option value="">Seleccione una opción</option>
                                    {group[key].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </NativeSelectField>
                            </NativeSelectRoot>

                        </section >
                    );
                });
            })

            }
        </>
    )
}

//shows inputs of type Text
function InputTextComponent({ data, name, handleChange, formDataContex }) {
    return (
        <>
            <Fieldset.Legend>
                <span className='h3'>{name}</span>
            </Fieldset.Legend>

            {data.map(field => {
                const property = findProperty(formDataContex.Applicant, field)
                return (
                    <Field key={field}>
                        <label className='h6 opacity' htmlFor={field}>{property.label}</label>
                        {property.explanation != '' ? <span style={{ color: 'red' }}>{property.explanation}</span> : <span />}
                        <Input
                            className='p-large'
                            variant={'subtle'}
                            name={field}
                            type='text'
                            id={field}
                            value={property.value !== 'N/A' ? property.value : ''}
                            onChange={handleChange}
                        />
                    </Field>
                )
            })}
        </>
    )
}

// shows inputs of type Radio
function InputRadio({ data, handleChange, formDataContex }) {
    const q = data.map((group) => {
        const w = Object.keys(group).map((key) => {
            const property = findProperty(formDataContex.Applicant.PDFRadioGroup2, key)
            return (
                <section key={key}>
                    <span className='h6 opacity'>{property.label}</span>
                    {group[key].map((value) => {
                        return (
                            <section className='radioOptions' key={value}>
                                <input
                                    type="radio"
                                    id={`${key}_${value}`}
                                    name={key}
                                    value={value}
                                    checked={property.value === value}
                                    onChange={handleChange}
                                />
                                <label className='p-large' htmlFor={`${key}_${value}`}>{value}</label>
                            </section>
                        )
                    })}
                </section>
            )
        })
        return w
    })
    return (
        <div>
            {q}
        </div>
    )
}

// checks the passed object if a specific property exists, and if true returns the associated object
const findProperty = (obj, propertyName) => {
    if (obj.hasOwnProperty(propertyName)) {
        return obj[propertyName]
    } else {
        for (const key of Object.keys(obj)) {
            if (typeof obj[key] === 'object' && obj[key] !== propertyName) {
                const resutl = findProperty(obj[key], propertyName)
                if (resutl) {
                    return resutl
                }
            }
        }
    }
    return null
}