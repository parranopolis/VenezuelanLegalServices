import { useContext, useState } from 'react'
import { initialFormValues } from '../../contexts/InitialValueContext'
import i589 from './../../assets/PDF/i-589.pdf'
import { last, PDFDocument, PDFRadioGroup, PDFTextField } from 'pdf-lib'


export function Forms() {

    const { formData, setFormData } = useContext(initialFormValues)
    const [PDFUrl, setPDFUrl] = useState(null)

    const handleChange = (e) => {
        const { name, value, type } = e.target

        setFormData((prevFormData) => {
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
            } else if (type === 'text') {
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
            console.error(error)
        }

    }

    const applicant = formData.Applicant
    const spouse = formData.Spouse
    const children = formData.Children
    return (
        <>
            <form>
                <FormContainer formDataContex={formData} handleChange={handleChange} modifyPDF={modifyPDF} />
            </form>
            <object data={PDFUrl} type="application/pdf" width='100%' height='800vh'></object>

            <iframe src={PDFUrl} width='100%' height={'500px'}></iframe>
        </>
    )
}
//base form
const FormContainer = ({ formDataContex, handleChange, modifyPDF }) => {
    const [currentSection, setCurrentSection] = useState(3)
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
            name: 'Sexo',
            fields: {
                radio: [
                    {
                        'Gender': ['Male', 'Female'],
                        'Marital_Status': ['Single', 'Married', 'Divorced', 'Widowed']
                    },

                ],
                text: ['Date_Of_Birth']
            }
        },
        {
            name: 'Nacionalidad',
            fields: { text: ['City_and_Country_of_Birth', 'Present_Nacionality', 'Nationality_at_Birth', 'Race_Ethnic_Tribal_Group', 'Religion'] }
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
            name: 'Imformacion de Viaje',
            fields: {
                text: [
                    'Leave_Your_Country',
                    'I-94_Number',
                    'Each_Entry_Date_1',
                    'Each_Entry_Place_1',
                    'Each_Entry_Status_1',
                    'Each_Entry_Date_2',
                    'Each_Entry_Place_2',
                    'Each_Entry_Status_2',
                    'Each_Entry_Date_3',
                    'Each_Entry_Place_3',
                    'Each_Entry_Status_3',
                    'Each_Entry_Date_Expires'
                ]
            }
        }, {
            name: 'Documento de Viaje',
            fields: {
                text: [
                    'Passport_Country',
                    'Passport_Number',
                    'Travel_Document_Number',
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
    return (
        <div>
            <div>
                {renderSection()}
            </div>
            <div>
                <div>
                    <button onClick={updateCurrentForm} name='last'>Ant  </button>
                    <span>{currentSection}</span>
                    <button onClick={updateCurrentForm} name='next'> nex</button>
                </div>
                <button type='button' onClick={modifyPDF}>Enviar</button>
                {/* {currentSection === aplicantPart_A1.length ? <button type='button' onClick={modifyPDF}>Enviar</button> : ''} */}
            </div>
        </div>
    )
}

//decides based on the fields passed what type of input should be displayed
const FormSection = ({ fields, handleChange, formDataContex }) => {
    return (
        <div>
            {fields.fields.hasOwnProperty('text') ? <InputText data={fields.fields.text} name={fields.name} handleChange={handleChange} formDataContex={formDataContex} /> : ''}
            {fields.fields.hasOwnProperty('radio') ? <InputRadio data={fields.fields.radio} name={fields.name} handleChange={handleChange} formDataContex={formDataContex} /> : ''}
        </div>
    )
}
//shows inputs of type Text
function InputText({ data, name, handleChange, formDataContex }) {
    return (
        <>
            <span className='h3'>{name}</span>
            {data.map(field => {
                const property = findProperty(formDataContex.Applicant, field)
                return (
                    <div key={field}>
                        <label htmlFor={field}>{property.label}</label>
                        <input
                            type='text'
                            name={field}
                            id={field}
                            placeholder="text"
                            value={property.value !== 'N/A' ? property.value : ''}
                            onChange={handleChange}
                        />
                    </div>
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
                <div key={key}>
                    <span className='h5'>{property.label}</span>
                    <div>
                        {group[key].map((value) => {

                            return (
                                <div key={value}>
                                    <input
                                        type="radio"
                                        id={`${key}_${value}`}
                                        name={key}
                                        value={value}
                                        checked={property.value === value}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`${key}_${value}`}>{value}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
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