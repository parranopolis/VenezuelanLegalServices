import { useContext, useEffect, useState } from 'react'
import { initialFormValues } from '../../contexts/InitialValueContext'
import i589 from './../../assets/PDF/i-589.pdf'
import { PDFCheckBox, PDFDocument, PDFRadioGroup, PDFTextField } from 'pdf-lib'
import { Button, Input, Fieldset, Box, Link, Strong, Stack, Textarea, CheckboxCard } from '@chakra-ui/react'
import { Checkbox } from "@/components/ui/checkbox"

import { findProperty } from '../../utils/functions'

import { ToggleTip } from "@/components/ui/toggle-tip"
import { LuInfo } from "react-icons/lu"

import './Forms.css'

import { Field } from "@/components/ui/field"
import { Alert } from "@/components/ui/alert"
import { SegmentedControl } from "@/components/ui/segmented-control"
import {
    NativeSelectField,
    NativeSelectRoot,
} from "@/components/ui/native-select"
import { StepsContext } from '../../contexts/StepsContext'
import { Children } from '../../utils/steps'

const statusMapping = {
    'Entregado en La frontera | No expira': 'EWI',
    'CBP1': 'Parole DT',
    'Visa de Turista': 'Tourist Visa',
    'Visa de Estudiante': 'Student Visa',
    'Parole Humanitario': 'Humanitarian Parole',
};

// Form Page
export function Forms({ onSubmit }) {
    // console.log(onSubmit)
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
                    Spouse: {
                        ...prevFormData.Spouse,
                        PDFRadioGroup2: {
                            ...prevFormData.Spouse.PDFRadioGroup2,
                            [name]: {
                                ...prevFormData.Spouse.PDFRadioGroup2[name],
                                value: value
                            }
                        }
                    }
                }
            } else if (type === 'text' || type == 'select-one') {
                return {
                    ...prevFormData,
                    Spouse: {
                        ...prevFormData.Spouse,
                        PDFTextField2: {
                            ...prevFormData.Spouse.PDFTextField2,
                            [name]: {
                                ...prevFormData.Spouse.PDFTextField2[name],
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
            const textFields = formData.Children.PDFTextField2;
            Object.keys(textFields).forEach((key) => {
                const field = form.getTextField(key);
                if (field) {
                    field.setText(textFields[key].value);
                }
            });

            // Modify Radio fields
            const radioFields = formData.Children.PDFRadioGroup2;
            Object.keys(radioFields).forEach((key) => {
                const field = form.getRadioGroup(key);
                if (field && radioFields[key] && radioFields[key].value) {
                    // Solo selecciona si hay un valor válido
                    field.select(radioFields[key].value);
                }
            });

            // Save the PDF

            const pdfBytes = await pdfDoc.save()
            downloadBlob(pdfBytes, 'output.pdf', 'application/pdf')
        } catch (error) {
            console.error('Error modifying the PDF:', error);
            alert('Hubo un error al modificar el PDF. Verifica la consola para más detalles.');
        }

    }

    return (
        <>
            <form className='form center'>
                <FormContainer onSubmit={onSubmit} formDataContex={formData} handleChange={handleChange} modifyPDF={modifyPDF} />
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
const FormContainer = ({ formDataContex, handleChange }) => {
    // Current Group of Forms
    const [currentSection, setCurrentSection] = useState(1)

    //context 
    const { handleFormSubmit, formGroups, currentStep, totalChildren } = useContext(StepsContext)

    //Array of Total groups from the context
    const currentForm = Object.values(formGroups[currentStep])

    //Array with the name of the group in question coming from the context
    const group = Object.keys(formGroups[currentStep])

    //Object with data from the group of forms currently displayed on the screen
    const currentGroup = currentForm[0][currentSection - 1]

    const renderSection = () => {

        return (
            <Fieldset.Root size={'lg'} maxW={'100%'} className='fieldset'>
                <Fieldset.Legend>
                    <span className='h3'>{currentGroup.name}</span>
                </Fieldset.Legend>

                {currentGroup.fields.hasOwnProperty('text') ? <InputTextComponent
                    group={group[0]}
                    data={currentGroup.fields.text}
                    handleChange={handleChange}
                    formDataContex={formDataContex}
                /> : ''}
                {currentGroup.fields.hasOwnProperty('radio') ? <InputRadio
                    group={group[0]}
                    data={currentGroup.fields.radio}
                    name={currentGroup.name}
                    handleChange={handleChange}
                    formDataContex={formDataContex}
                /> : ''}
                {currentGroup.fields.hasOwnProperty('select') ? <InputSelect
                    group={group[0]}
                    data={currentGroup.fields.select}
                    name={currentGroup.name}
                    handleChange={handleChange}
                    formDataContex={formDataContex}
                /> : ''}
                {currentGroup.fields.hasOwnProperty('textArea') ? <InputTextArea
                    group={group[0]}
                    data={currentGroup.fields.textArea}
                    formDataContex={formDataContex}
                    name={currentGroup.name}
                    handleChange={handleChange}

                /> : ''}
                {currentGroup.fields.hasOwnProperty('check') ? <InputCheckbox
                    group={group[0]}
                    data={currentGroup.fields.check}
                    name={currentGroup.name}
                    formDataContex={formDataContex}
                    handleChange={handleChange}

                /> : ''}

            </Fieldset.Root>
        )
    }

    const [isValidated, setIsValidated] = useState(true)
    // Updates the form displayed on the screen
    const updateCurrentForm = (e) => {
        e.preventDefault()
        // const requiredInputs = document.querySelectorAll('.required')
        // let isValid = true
        // let field
        // requiredInputs.forEach(i => {
        //     if (i.value.trim() === '') {
        //         isValid = false
        //         field = i
        //     }
        // })
        // setIsValidated(isValid)
        // if (!isValid) {
        //     console.log('hay campos requeridos')
        //     return;
        // }
        if (e.target.name === 'last') {
            if (currentSection == 1) null
            else setCurrentSection(currentSection - 1)
        } else if (e.target.name === 'next') {
            if (currentSection == currentForm[0].length) null
            else {
                setCurrentSection(currentSection + 1)
            }
        }


    }
    // console.log(totalChildren)
    return (
        <article>
            <section>
                {isValidated
                    ? ''
                    : <Alert status="error" title="Invalid Fields">
                        Your form has some errors. Please fix them and try again.
                    </Alert>
                }
            </section>
            <section className='RenderSection'>
                {renderSection()}
            </section>
            <section className='space-between buttons'>
                <div>
                    {currentSection === 1 ? '' : <Button
                        size={'lg'}
                        variant={'outline'}
                        onClick={updateCurrentForm}
                        name='last'>Anterior</Button>}
                </div>
                <div>
                    <span className='h4'>{currentSection}</span>
                </div>
                <div>
                    {currentSection === currentForm[0].length ? <Button
                        type='button'
                        size={'lg'}
                        onClick={handleFormSubmit}
                    >Siguiente paso</Button> :
                        <Button
                            size={'lg'}
                            name='next' onClick={updateCurrentForm}>Siguiente</Button>
                    }
                </div>
            </section>
        </article>

    )
}
function InputSelect({ data, formDataContex, handleChange, group }) {
    const obj = formDataContex[group].PDFTextField2
    const { totalChildren, setTotalChildren } = useContext(StepsContext)
    const handleTwoFunctuons = (e, field) => {
        // handleChange(e)
        if (e.target.name === 'Children_Total') {
            // console.log(e.target.value)
            setTotalChildren(parseInt(e.target.value))
            // RegularInputs(totalChildren)
        }
    }

    useEffect(() => {
        // console.log(totalChildren)
        Children(totalChildren)
    })
    return (
        <>
            {data.map((group) => {
                return Object.keys(group).map((key) => {
                    const property = findProperty(obj, key);
                    return (
                        <section key={key}>
                            <label htmlFor={key} className='h6 opacity'>{property.label}</label>
                            <NativeSelectRoot
                                id={key}
                                name={key}
                                // value={property.value !== 'N/A' ? property.value : ''}
                                onChange={(e) => handleTwoFunctuons(e, key)}
                            >
                                <NativeSelectField name={key}>
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
function InputTextComponent({ data, handleChange, formDataContex, group, q }) {
    const obj = formDataContex[group].PDFTextField2
    const { totalChildren, setTotalChildren } = useContext(StepsContext)
    const handleTwoFunctuons = (e, field) => {
        // handleChange(e)

        // if (field.name === 'Children_Total') {
        //     setTotalChildren(parseInt(e.target.value))
        //     RegularInputs(totalChildren)
        // }
    }

    useEffect(() => {
        // console.log(totalChildren)
    }, [handleTwoFunctuons])
    return (
        <Stack gap={5}>
            {data.map((field) => {
                if (!field.isShow) {
                    const property = findProperty(obj, field.name)
                    const x = <span className='h6 helpTip'>{property.explanation}</span>
                    return (
                        <Field
                            key={field.name}>
                            <label className='h6 opacity' htmlFor={field}>{property.label}
                                {field.required ? <span style={{ color: 'red' }}>*</span> : ''}
                                {property.explanation != '' ? <span>
                                    <ToggleTip content={x}>
                                        <Button size="xs" variant="ghost">
                                            <LuInfo />
                                        </Button>
                                    </ToggleTip>
                                </span> : ''}
                            </label>
                            <Input
                                className={field.required ? 'p-large required' : 'p-large'}
                                variant={'subtle'}
                                name={field}
                                type='text'
                                id={field}
                                // value={property.value !== 'N/A' ? property.value : ''}
                                onChange={(e) => handleTwoFunctuons(e, field)}
                                required={field.required ? true : false}
                            />
                        </Field >

                    )
                }
            })}
        </Stack>
    )
}

function RegularInputs(q) {

}
// shows inputs of type Radio
function InputRadio({ data, handleChange, formDataContex, name }) {
    const { formGroups, currentStep } = useContext(StepsContext)
    const group2 = Object.keys(formGroups[currentStep])
    const q = data.map((group) => {
        const w = Object.keys(group).map((key) => {

            const property = findProperty(formDataContex[group2].PDFRadioGroup2, key)
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

function InputCheckbox({ group,
    data,
    name,
    formDataContex,
    handleChange }) {

    const obj = formDataContex[group].PDFCheckBox2
    return (
        <Stack>
            {data.map(field => {
                // console.log(field)
                const property = findProperty(obj, field.name)
                const x = <span className='h6 helpTip'>{property.explanation}</span>
                return (
                    <Field key={field.name}>
                        <Checkbox>{property.label}
                            {property.explanation != '' ? <span>
                                <ToggleTip content={x}>
                                    <Button size="xs" variant="ghost">
                                        <LuInfo />
                                    </Button>
                                </ToggleTip>
                            </span> : ''}
                        </Checkbox>
                    </Field>
                )
            })}
        </Stack>
    )
}

function InputTextArea({ group, data, name, handleChange, formDataContex }) {
    // console.log(handleChange)

    const obj = formDataContex[group]

    return (
        <Stack>

            {data.map(field => {
                if (!field.isShow) {
                    const property = findProperty(obj, field.name)
                    const x = <span className='h6 helpTip'>{property.explanation}</span>
                    return (
                        <Field
                            key={field.name}>
                            <label className='h6 opacity' htmlFor={field}>{property.label}
                                {field.required ? <span style={{ color: 'red' }}>*</span> : ''}
                                {property.explanation != '' ? <span>
                                    <ToggleTip content={x}>
                                        <Button size="xs" variant="ghost">
                                            <LuInfo />
                                        </Button>
                                    </ToggleTip>
                                </span> : ''}
                            </label>
                            <Textarea
                                className={field.required ? 'p-large required' : 'p-large'}
                                variant={'subtle'}
                                name={field}
                                type='text'
                                id={field}
                                // value={property.value !== 'N/A' ? property.value : ''}
                                onChange={handleChange}
                                required={field.required ? true : false}
                                size={'lg'}
                                resize={'vertical'}
                            />
                        </Field >

                    )
                }
            })}
        </Stack>
    )
}
