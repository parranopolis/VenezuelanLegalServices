import { useContext, useEffect, useState } from 'react'
import { initialFormValues } from '../../contexts/InitialValueContext'
import i589 from './../../assets/PDF/i-589.pdf'
import { PDFDocument } from 'pdf-lib'
import { Button, Input, Fieldset, Box, Link, Strong } from '@chakra-ui/react'

import { aplicantPart_A_I, aplicantPart_A_II } from '../../utils/steps'


import { ToggleTip } from "@/components/ui/toggle-tip"
import { LuInfo } from "react-icons/lu"

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


// Form Page
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
    const [currentSection, setCurrentSection] = useState(1)
    const { formData } = useContext(initialFormValues)

    const renderSection = () => {
        const currentGroup = aplicantPart_A_II[currentSection - 1]
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
                    {currentSection === aplicantPart_A_II.length ? <Button type='button' size={'lg'} onClick={modifyPDF}>Siguiente paso</Button> : <Button size={'lg'} onClick={updateCurrentForm} name='next'> Siguiente</Button>}
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
    const [open, setOpen] = useState(false)
    return (
        <>
            <Fieldset.Legend>
                <span className='h3'>{name}</span>
            </Fieldset.Legend>

            {data.map(field => {
                const property = findProperty(formDataContex.Applicant, field)
                const x = <span className='h6 helpTip'>{property.explanation}</span>
                return (
                    <Field key={field}>
                        <label className='h6 opacity' htmlFor={field}>{property.label} {property.explanation != '' ? <span>
                            <ToggleTip content={x}>
                                <Button size="xs" variant="ghost">
                                    <LuInfo />
                                </Button>
                            </ToggleTip>
                            {/* <HoverCardRoot size="sm" open={open} onOpenChange={(e) => setOpen(e.open)}>
                                <HoverCardTrigger asChild>
                                    <ion-icon name="information-circle-outline"></ion-icon>
                                </HoverCardTrigger>
                                <HoverCardContent maxWidth={'250px'}>
                                    <HoverCardArrow />
                                    <Box>
                                        {property.explanation}
                                    </Box>
                                </HoverCardContent>
                            </HoverCardRoot> */}
                        </span> : ''} </label>
                        {/* {property.explanation != '' ? <span style={{ color: 'red' }}>{property.explanation}</span> : <span />} */}
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