import { useContext, useState } from 'react'
import { initialFormValues } from '../../contexts/InitialValueContext'
import { last } from 'pdf-lib'


export function Forms() {

    const { formData, setFormData } = useContext(initialFormValues)
    const applicant = formData.Applicant
    const spouse = formData.Spouse
    const children = formData.Children
    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <form>
                <FormContainer formData={applicant} />

            </form>
            <br />
            <br />
            <br />
        </>
    )
}

const FormContainer = ({ formData, handleChange }) => {
    const [currentSection, setCurrentSection] = useState(1)
    const aplicant = [
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
            fields: { text: ["Street_Number_and_Name", "Apt_Number", "City", "State", "Zip_Code", 'Street_Number_and_Name_POX', 'City_POX', 'State_POX', 'Zip_Code_POX',] }
        },
        {
            name: 'Nacionalidad',
            fields: { text: ['City_and_Country_of_Birth', 'Present_Nacionality', 'Nationality_at_Birth', 'Race_Ethnic_Tribal_Group', 'Religion', 'phone_Number_1'] }
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
            name: 'Corte de Inmigración:',
            fields: {
                radio: [
                    {
                        "Dieciocho": [
                            'Nunca he estado en procedimientos judiciales de inmigración',
                            'Estoy en proceso de procedimientos judiciales de inmigración',
                            'No estoy ahora en procedimientos judiciales de inmigración, pero he estado en el pasado '
                        ]
                    }
                ]
            }
        },
        {
            name: 'Imformacion de Viaje',
            fields: {
                text: [
                    'I-94_Number',
                    'Leave_Your_Country',
                    'Each_Entry_Date_1',
                    'Each_Entry_Date_2',
                    'Each_Entry_Date_3',
                    'Each_Entry_Place_1',
                    'Each_Entry_Place_2',
                    'Each_Entry_Place_3',
                    'Each_Entry_Status_1',
                    'Each_Entry_Status_2',
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
        const currentGroup = aplicant[currentSection - 1]
        return <FormSection fields={currentGroup} data={formData} />
    }

    const updateCurrentForm = (e) => {
        e.preventDefault()
        setCurrentSection(parseInt(e.target.name))
    }
    return (
        <div>
            <div>
                {renderSection()}
            </div>
            <div>
                <button name='1' onClick={updateCurrentForm}>Identificacion</button>
                <button name='2' onClick={updateCurrentForm}>Nombres y Apellidos</button>
                <button name='3' onClick={updateCurrentForm}>Direccion</button>
                <button name='4' onClick={updateCurrentForm}>Nacionalidad</button>
                <button name='5' onClick={updateCurrentForm}>Genero</button>
                <button name='6' onClick={updateCurrentForm}>Corte</button>
                <button name='7' onClick={updateCurrentForm}>7</button>
                <button name='8' onClick={updateCurrentForm}>8</button>
            </div>

        </div>
    )
}

const FormSection = ({ fields, data }) => {
    return (
        <div>
            {fields.fields.hasOwnProperty('text') ? <InputText data={fields.fields.text} name={fields.name} /> : ''}
            {fields.fields.hasOwnProperty('radio') ? <InputRadio data={fields.fields.radio} name={fields.name} /> : ''}

        </div>
    )
}


// const FormSection = ({ fields, data, handleChange }) => {
//     return (
//         <div>
//             {fields.fields.map((fieldkey) => {
//                 const field = data[fieldkey]
//                 console.log(field)

//                 return (
//                     <div key={fieldkey} >
//                         {/* {fields.extra != undefined ? <FormLabel id={fields.extra.id} message={fields.extra.message} /> : ''} */}
//                         <br />
//                         <label htmlFor={fieldkey}>
//                             {field.label || fieldkey}
//                         </label>
//                         <input
//                             type="text"
//                             id={fieldkey}
//                             name={fieldkey}
//                         />
//                         {field.explanation && (
//                             <p>
//                                 {field.explanation}
//                             </p>
//                         )}
//                     </div>
//                 )
//             })}
//         </div>
//     )
// };

function InputText({ data, name }) {
    const { formData } = useContext(initialFormValues)

    return (
        <>
            <span className='h3'>{name}</span>
            {data.map(field => {
                const property = findProperty(formData.Applicant, field)
                return (
                    <div key={field}>
                        <label htmlFor={field}>{property.label}</label>
                        <input type='text' name={field} id={field} placeholder="text" />

                    </div>
                )
            })}
        </>
    )
}



function InputRadio({ data, name }) {
    const { formData } = useContext(initialFormValues)
    // [{
    //      'Gender': ['Male', 'Female'],
    //      'Marital_Status': ['Single', 'Married', 'Divorced', 'Widowed']
    //  }]
    const q = data.map((group, groupIndex) => {
        const w = Object.keys(group).map((key) => {
            const property = findProperty(formData.Applicant.PDFRadioGroup2, key)
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

const findProperty = (obj, propertyName) => {
    if (obj.hasOwnProperty(propertyName)) {
        return obj[propertyName]
    } else {
        for (const key of Object.keys(obj)) {
            if (typeof obj[key] === 'object' && obj[key], propertyName) {
                const resutl = findProperty(obj[key], propertyName)
                if (resutl) {
                    return resutl
                }
            }
        }
    }
    return null
}