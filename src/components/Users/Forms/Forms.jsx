import { useContext, useEffect, useState } from 'react'
import { initialFormValues } from '../../../contexts/InitialValueContext'
import i589 from './../../../assets/PDF/i-589.pdf'
import { PDFCheckBox, PDFDocument, PDFRadioGroup, PDFTextField } from 'pdf-lib'
import { Button, Input, Fieldset, Box, Link, Strong, Stack, Textarea, CheckboxCard, Group } from '@chakra-ui/react'
import { Checkbox } from "@/components/ui/checkbox"

import { findProperty } from '../../../utils/functions'

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
import { StepsContext } from '../../../contexts/StepsContext'
import { Children } from '../../../utils/steps'

const statusMapping = {
    'Entregado en La frontera | No expira': 'EWI',
    'CBP1': 'Parole DT',
    'Visa de Turista': 'Tourist Visa',
    'Visa de Estudiante': 'Student Visa',
    'Parole Humanitario': 'Humanitarian Parole',
};

export function Final() {
    return <h1>Final</h1>
}

export const downloadBlob = (data, mimeType) => {
    let blob, url
    blob = new Blob([data], {
        type: mimeType
    })
    url = window.URL.createObjectURL(blob)
    // downloadURL(url, filename)
    // setTimeout(function () {
    //     return window.URL.revokeObjectURL(url)
    // }, 1000)
    return url

}

export const downloadURL = (data) => {
    let a
    a = document.createElement('a')
    a.href = data
    a.download = 'output.pdf'
    document.body.appendChild(a)
    // a.style = 'display:none'
    // a.click()
    a.remove()
    // setPDFUrl(a)
    return a
}

export const modifyPDF = async (formData) => {
    const q = Object.keys(formData)
    try {
        const url = i589
        const existstingPdfBytes = await fetch(url).then((res) => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(existstingPdfBytes)
        const form = pdfDoc.getForm()

        q.forEach(group => {

            // Modify text fields
            const textFields = formData[group].PDFTextField2;
            Object.keys(textFields).forEach((key) => {
                const field = form.getTextField(key);
                if (field) {
                    field.setText(textFields[key].value);
                }
            });

            // Modify Radio fields
            const radioFields = formData[group].PDFRadioGroup2;
            radioFields ? Object.keys(radioFields).forEach((key) => {
                const field = form.getRadioGroup(key);
                if (field && radioFields[key] && radioFields[key].value) {
                    // Solo selecciona si hay un valor válido
                    field.select(radioFields[key].value);
                }
            }) : null

            // Modify Check fields
            const checkBoxFields = formData[group].PDFCheckBox2;
            checkBoxFields ? Object.keys(checkBoxFields).forEach((key) => {
                const field = form.getCheckBox(key);
                if (field && checkBoxFields[key] && checkBoxFields[key].value) {
                    field.check();
                }
            }) : null
        })

        // Save the PDF

        const pdfBytes = await pdfDoc.save()
        return pdfBytes
    } catch (error) {
        console.error('Error modifying the PDF:', error);
    }
    return null
}
// Form Page
export function Forms({ onSubmit }) {
    // console.log(onSubmit)
    const { formData, setFormData } = useContext(initialFormValues)
    const [PDFUrl, setPDFUrl] = useState(null)

    const handleChange = (e, group) => {
        const { name, value, type } = e.target
        setFormData((prevFormData) => {
            let updatedValue = value
            if (name == 'Each_Entry_Status_1' || name === 'Each_Entry_Status_2' || name === 'Each_Entry_Status_3') {
                updatedValue = statusMapping[value] || value
            }

            if (type === 'radio') {
                return {
                    ...prevFormData,
                    [group]: {
                        ...prevFormData[group],
                        PDFRadioGroup2: {
                            ...prevFormData[group].PDFRadioGroup2,
                            [name]: {
                                ...prevFormData[group].PDFRadioGroup2[name],
                                value: value
                            }
                        }
                    }
                }
            } else if (type === 'text' || type == 'select-one' || type === 'textarea') {
                return {
                    ...prevFormData,
                    [group]: {
                        ...prevFormData[group],
                        PDFTextField2: {
                            ...prevFormData[group].PDFTextField2,
                            [name]: {
                                ...prevFormData[group].PDFTextField2[name],
                                value: updatedValue
                            }
                        }
                    }
                }
            }
            else if (type === 'checkbox') {
                return {
                    ...prevFormData,
                    [group]: {
                        ...prevFormData[group],
                        PDFCheckBox2: {
                            ...prevFormData[group].PDFCheckBox2,
                            [name]: {
                                ...prevFormData[group].PDFCheckBox2[name],
                                value: value
                            }
                        }
                    }
                }
            }

            return prevFormData
        })
    }

    return (
        <>
            <form className='form center'>
                {/* {console.log(formData.Applicant.PDFTextField2)} */}
                <FormContainer formDataContex={formData} handleChange={handleChange} />
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

function FilterSegmentData(data, onState = data.extra.SegmentedControlMessage[0]) {

    // Value of the SegmentedControl -> actualSegmentedControl
    // Data to show in the form -> text
    // Data to show in the select => select
    let actualSegmentedControl, text, select = [], index = 0, result
    // Filter the data to show in the form
    data.extra.SegmentedControlMessage.forEach((item, i) => {
        if (data.extra.SegmentedControlMessage[i] === onState) {
            actualSegmentedControl = data.extra.SegmentedControlMessage[i]
            index = i
        }
    })
    text = data.fields.text.slice(data.extra.sliceSize[index][0], data.extra.sliceSize[index][1])

    //  Filter the data to show in the select
    if (data.fields.select) {
        Object.entries(data.fields.select[0]).forEach(([key, value], i) => {
            if (i === index) {
                select.push({ [key]: value })
            }
        })
    }
    return result = [actualSegmentedControl, text, select]
}

const getCheckedFields = (data, check) => {
    const { inputType, No, Yes } = data.extra
    const fields = data.fields[inputType]
    if (!check) return fields.slice(No[0], No[1])

    if (check.checked && check.value === 'Si') return fields.slice(Yes[0], Yes[1])

    return fields.slice(No[0], No[1])
}

//base form
const FormContainer = ({ formDataContex, handleChange }) => {
    // Current Group of Forms
    const [currentSection, setCurrentSection] = useState(1)

    const { formData, setFormData } = useContext(initialFormValues)

    //context 
    const { handleFormSubmit, formGroups, currentStep, RadioChecked, setRadioChecked } = useContext(StepsContext)
    //Array of Total groups from the context
    const currentForm = Object.values(formGroups[currentStep])

    //Array with the name of the group in question coming from the context
    const group = Object.keys(formGroups[currentStep])

    //Object with data from the group of forms currently displayed on the screen
    const currentGroup = currentForm[0][currentSection - 1]

    // Value of the SegmentedControl
    const [value, setValue] = useState(currentGroup?.extra?.type === 'multiple' ? currentGroup.extra.SegmentedControlMessage[0] : '')

    // Data to show in the form
    const [dataShow, setDataShow] = useState([])

    // Data to show in the select
    const [dataShowSelect, setDataShowSelect] = useState([])

    useEffect(() => {
        setDataShow([])
        setValue('')
        setDataShowSelect([])
        if (currentGroup?.extra?.type === 'multiple') {
            const filteredSegmentData = FilterSegmentData(currentGroup, value)
            setDataShow(filteredSegmentData[1])
            setValue(filteredSegmentData[0])
            setDataShowSelect(filteredSegmentData[2])
        }
        if (currentGroup?.extra?.type === 'conditional') {
            if (!RadioChecked) {
                if (currentGroup.extra.No[0] === 0 && currentGroup.extra.No[1] === 0) {
                    setDataShow([])
                }
                else {
                    setDataShow(currentGroup.fields.text.slice(currentGroup.extra.No[0], currentGroup.extra.No[1]))
                }
            }
            else {
                const filteredInputForms = getCheckedFields(currentGroup, RadioChecked)
                setDataShow(filteredInputForms)
            }
        } if (currentGroup?.extra?.type === 'special') setDataShow(currentGroup.fields.textArea)

    }, [value, currentGroup, RadioChecked])
    const renderSection = () => {
        return (
            <div className='formGroup'>
                <Fieldset.Root size={'lg'} maxW={'100%'} className='fieldset'>
                    <Fieldset.Legend>
                        <span className='h3'>{currentGroup.name}</span>
                        {/* {currentGroup.extra.type === 'Conditional' ? div} */}
                        {currentGroup?.extra?.type ?
                            currentGroup.extra.type === 'multiple' ?
                                <div>
                                    <span className='h5'>{currentGroup.extra.message}</span>
                                    <br />
                                    <div className='Test'>

                                        <SegmentedControl
                                            value={value}
                                            onValueChange={(e) => {
                                                setValue(e.value)
                                            }}
                                            items={currentGroup.extra.SegmentedControlMessage}
                                        />
                                    </div>
                                </div> :
                                <div>
                                    <span className='h5'>{currentGroup.extra.message}</span>
                                </div>
                            :
                            <div>
                                <span className='h5'>{currentGroup?.extra?.message}</span>
                            </div>}
                    </Fieldset.Legend>
                    <div className={`formContainer`}>

                        {currentGroup.fields.hasOwnProperty('radio') ? <InputRadio
                            className='InputRadio'
                            person={group}
                            extra={currentGroup.extra}
                            data={currentGroup.fields.radio}
                            name={currentGroup.name}
                            handleChange={handleChange}
                            formDataContex={formDataContex}
                        /> : ''}
                        {currentGroup.fields.hasOwnProperty('text') ? <InputTextComponent
                            className='InputTextComponent'
                            group={group[0]}
                            data={dataShow.length != 0 ? dataShow : currentGroup.fields.text}
                            handleChange={handleChange}
                            formDataContex={formDataContex}
                        /> : ''}
                        {currentGroup.fields.hasOwnProperty('select') ? <InputSelect
                            className='InputSelect'
                            group={group[0]}
                            data={dataShow.length != 0 ? dataShowSelect : currentGroup.fields.select}
                            name={currentGroup.name}
                            handleChange={handleChange}
                            formDataContex={formDataContex}
                        /> : ''}
                        {currentGroup.fields.hasOwnProperty('textArea') ? <InputTextArea
                            className='InputTextArea'
                            group={group}
                            // data={currentGroup.fields.textArea}
                            // data={dataShow.length != 0 ? dataShow : currentGroup.fields.textArea}
                            data={dataShow}
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
                        />
                            : ''}
                    </div>
                </Fieldset.Root>
            </div>

        )
    }

    const [isValidated, setIsValidated] = useState(true)
    // Updates the form displayed on the screen
    const updateCurrentForm = (e) => {
        e.preventDefault()
        const requiredInputs = document.querySelectorAll('.required')
        let isValid = true
        let field
        requiredInputs.forEach(i => {
            if (i.value.trim() === '') {
                isValid = false
                field = i
            }
        })
        setIsValidated(isValid)
        if (!isValid) {
            console.log('hay campos requeridos')
            return;
        }
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
    const createPDF = async (e, data) => {
        e.preventDefault()
        try {

            const q = await modifyPDF(data, group[0])
            const w = downloadBlob(q, 'application/pdf')
            const e = downloadURL(w)
            console.log(e)

            return setSpan(e)
            // window.open(e, '_blank')
        } catch (error) {
            console.log(error)
        }
        return null
    }

    const [span, setSpan] = useState(null)

    return (
        <article>
            {span ? (
                <div>
                    <h3>PDF Modificado</h3>
                    <a href={span} download="modified_form.pdf">Descarga una copia aqui</a>

                    <object data={span} type="application/pdf" width='100%' height='810vh' >

                    </object>
                </div>
            ) : null}
            <section>
                {isValidated
                    ? ''
                    : <Alert status="error" title="Campos Obligatorios">
                        Por favor llenar los campos obligatorios marcados con un <strong>*</strong>.
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
                {/* <div>
                    <button onClick={(e) => createPDF(e, formData)}>Create PDF</button>
                </div> */}
            </section>

        </article>

    )
}
function InputSelect({ data, formDataContex, handleChange, group }) {
    const obj = formDataContex[group].PDFTextField2
    const { totalChildren, setTotalChildren } = useContext(StepsContext)
    const personGroup = group

    const handleTwoFunctuons = (e, field) => {
        // handleChange(e)
        if (e.target.name === 'Children_Total') {
            setTotalChildren(parseInt(e.target.value))
        }
    }

    useEffect(() => {
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
                                value={property.value === 'N/A' ? '' : property.value}
                                onChange={(e) => {
                                    handleTwoFunctuons(e, key)
                                    handleChange(e, personGroup)
                                }
                                }
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
    const handleTwoFunctuons = (e, field, group) => {
        console.log(group)
    }
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
                                name={field.name}
                                type='text'
                                id={field}
                                value={property.value === 'N/A' ? '' : property.value}
                                onChange={(e) => handleChange(e, group)}
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
function InputRadio({ data, handleChange, formDataContex, person, extra }) {

    const p = (e) => {
        console.log(e.target)
    }
    const { setRadioChecked } = useContext(StepsContext)
    const q = data.map((group, index) => {
        const w = Object.keys(group).map((key) => {
            const property = findProperty(formDataContex[person].PDFRadioGroup2, key)
            return (
                <section key={key} className={index == 0 ? "SpecialRadioInputContainer" : ''}>
                    <span className='h6 opacity'>{property.label}</span>

                    {group[key].map((value) => {
                        return (
                            <section className={extra?.question == index ? 'SpecialRadioInput radioOptions' : 'radioOptions'} key={value}>
                                <input
                                    type="radio"
                                    id={`${key}_${value}`}
                                    name={key}
                                    value={value}
                                    checked={property.value == value}
                                    onChange={(e) => {
                                        handleChange(e, person[0])
                                        if (e.target.parentNode.parentNode.classList.contains('SpecialRadioInputContainer')) setRadioChecked(e.target,)
                                        p(e)
                                    }}
                                    className='InputRadioType'
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
    formDataContex,
    handleChange }) {
    const obj = formDataContex[group].PDFCheckBox2
    return (
        <Stack>
            {data.map(field => {
                const property = findProperty(obj, field.name)
                const x = <span className='h6 helpTip'>{property.explanation}</span>
                return (
                    <Field key={field.name}>
                        <Checkbox name={field.name} onChange={(e) => handleChange(e, group)}>{property.label}
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
                                name={field.name}
                                type='text'
                                id={field}
                                // value={property.value !== 'N/A' ? property.value : ''}
                                onChange={(e) => handleChange(e, group[0])}
                                required={field.required ? true : false}
                                size={'xl'}
                                resize={'vertical'}
                                autoresize
                            />
                        </Field >

                    )
                }
            })}
        </Stack>
    )
}