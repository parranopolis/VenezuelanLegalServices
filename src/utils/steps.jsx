import { appendBezierCurve } from "pdf-lib"
import { useEffect } from "react"

export const Children = (w) => {
    let array = []
    for (let index = 1; index <= w; index++) {
        array.push(`Hijo ${index}`)

    }
    let q = ['hijo']
    if (array.length == 0 || array[0] == 0) {
        return q
    }
    else return array
}

export function FilterChildrenFormData(total) {

    // depending on the number of children, a certain number of Forms must be displayed
    // A maximum of 6 children can be displayed
    const childrenFormDictionary = [0, 6, 11, 16, 21, 26, 31]

    // We reset the form group to the initial state
    aplicantPart_A_II_Children = [
        childrenBase[0]
    ]

    // Filter the selected number of forms based on the "total passed"
    const portionOfTheDataDisplayed = childrenBase.slice(1, childrenFormDictionary[total])

    // adds to the dictionary "applicantPart_A_II_Children" the selected data that will be displayed in the Form component
    portionOfTheDataDisplayed.forEach(i => {
        aplicantPart_A_II_Children.push(i)
    })

    return aplicantPart_A_II_Children
}

//dictionary to segment the fields and their different types that should be displayed together
export const aplicantPart_A_I = [
    {
        name: 'Identificación',
        fields: {
            text: [
                { name: 'Alien_Number', required: false, isShow: false },
                { name: 'SSN', required: false, isShow: false },
                { name: 'USCIS_Name', required: false, isShow: false },
            ],
        },
    },
    {
        name: 'Nombres y Apellidos',
        fields: {
            text: [
                { name: "First_Name", required: true, isShow: false },
                { name: "Middle_Name", required: false, isShow: false },
                { name: "Complete_Last_Name", required: true, isShow: false },
                { name: "Another_Name", required: false, isShow: false },

            ]
        }
    },
    {
        name: 'Dirección',
        extra: {
            type: 'multiple',
            message: 'Si no tiene una direccion segura donde recibir documentos puede usar nuestra direccion ',
            SegmentedControlMessage: ['Direccion Propia', 'Direccion de la Empresa'],
            sliceSize: [[0, 6], [6, 13]]
        },
        fields: {
            text: [
                { name: 'Street_Number_and_Name', required: false, isShow: false, segment: 0 },
                { name: 'Apt_Number', required: false, isShow: false, segment: 0 },
                { name: 'City', required: false, isShow: false, segment: 0 },
                { name: 'State', required: false, isShow: false, segment: 0 },
                { name: 'Zip_Code', required: false, isShow: false, segment: 0 },
                { name: 'phone_Number_1', required: false, isShow: false, segment: 0 },
                { name: 'In_Care_of', required: false, isShow: false, segment: 1 },
                { name: 'phone_Number_2', required: false, isShow: false, segment: 1 },
                { name: 'Street_Number_and_Name_POX', required: false, isShow: false, segment: 1 },
                { name: 'Apt_Number_POX', required: false, isShow: false, segment: 1 },
                { name: 'City_POX', required: false, isShow: false, segment: 1 },
                { name: 'State_POX', required: false, isShow: false, segment: 1 },
                { name: 'Zip_Code_POX', required: false, isShow: false, segment: 1 },
            ],
        }
    },
    {
        name: 'Datos Demograficos',
        fields: {
            radio: [
                {
                    'Gender': ['Masculino', 'Femenino'],

                    'Marital_Status': ['Soltero -> Nunca Casado',
                        'Casado Legalmente',
                        'Divorciado',
                        'Viudo',
                    ]
                },

            ],
            text: [{ name: 'Date_Of_Birth', required: true, isShow: false }]
        }
    },
    {
        name: 'Nacionalidad',
        fields: {
            select: [
                {
                    'Race_Ethnic_Tribal_Group': ['Hispano', 'Afroamericano', 'Negro', 'Indigena', 'Asiatico']
                }
            ],
            text: [
                { name: 'City_and_Country_of_Birth', required: true, isShow: false },
                { name: 'Present_Nacionality', required: true, isShow: false },
                { name: 'Nationality_at_Birth', required: true, isShow: false },
                { name: 'Religion', required: true, isShow: false },],
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
        name: 'Por favor ingrese la informacion de su viaje a los Estados Unidos',
        extra: {
            type: 'multiple',
            message: 'Si necesita registrar mas de un viaje, por favor haga click en el boton de abajo',
            SegmentedControlMessage: ['Viaje 1', 'Viaje 2', 'Viaje 3'],
            sliceSize: [[0, 5], [5, 7], [7, 9]]
        },

        fields: {
            text: [
                { name: 'Leave_Your_Country', required: true, isShow: false, segment: 0 },
                { name: 'I-94_Number', required: false, isShow: false, segment: 0 },
                { name: 'Each_Entry_Date_1', required: true, isShow: false, segment: 0 },
                { name: 'Each_Entry_Place_1', required: true, isShow: false, segment: 0 },
                { name: 'Each_Entry_Date_Expires', required: false, isShow: false, segment: 0 },
                { name: 'Each_Entry_Date_2', required: true, isShow: false, segment: 1 },
                { name: 'Each_Entry_Place_2', required: true, isShow: false, segment: 1 },
                { name: 'Each_Entry_Date_3', required: true, isShow: false, segment: 2 },
                { name: 'Each_Entry_Place_3', required: true, isShow: false, segment: 2 },
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

            radio: [
                {
                    'English': ['Si', 'No']
                }
            ],
            text: [
                { name: 'Passport_Country', required: false, isShow: false },
                { name: 'Passport_Number', required: false, isShow: false },
                { name: 'Passport_Expiration_Day', required: false, isShow: false },
                { name: 'Native_Language', required: true, isShow: false },
                { name: 'Other_Language', required: false, isShow: false },
            ],
        },
    }
]
export const aplicantPart_A_II_Spouse = [
    {
        name: 'Identificacion del Conyuge',
        fields: {
            text: [
                { name: 'Spouse_Alien_Number', required: true, isShow: false },
                { name: 'Spouse_Passport_Number', required: false, isShow: false },
                { name: 'Spouse_SSN', required: false, isShow: false },
                { name: 'Spouse_Date_of_Birth', required: true, isShow: false },],
        }
    }, {
        name: 'Nombres y Apellidos del Conyuge',
        fields: {
            text: [
                { name: 'Spouse_Complete_Last_Name', required: true, isShow: false },
                { name: 'Spouse_First_Name', required: true, isShow: false },
                { name: 'Spouse_Middle_Name', required: false, isShow: false },
                { name: 'Spouse_Other_Names', required: false, isShow: false },]
        }
    },
    {
        name: 'Información del Matrimonio',
        fields: {
            text: [
                { name: 'Spouse_Date_og_Marriage', required: true, isShow: false },
                { name: 'Spouse_Place_Marriage', required: true, isShow: false },
                { name: 'Spouse_City_Country_of_Birth', required: true, isShow: false },

            ]
        }
    }, {
        name: 'Datos Demograficos del Conyuge',
        fields: {
            text: [
                { name: 'Spouse_Nationality', required: true, isShow: false }
            ],
            select: [
                {
                    'Spouse_Race': ['Hispano', 'Afroamericano', 'Negro', 'Indigena', 'Asiatico']
                }],
            radio: [
                { 'Spouse_Gender': ['Femenino', 'Masculino'] }
            ]
        },
    },
    {
        name: 'Ubicación actual de Conyugue',
        extra: {
            type: 'conditional',
            Yes: [0, 7],
            No: [0, 1],
            question: [0],
            inputType: 'text'
        },
        fields: {
            radio: [
                { 'Spouse_Location_US': ['Si', 'No'] },
                { 'Spouse_Court': ['Si', 'No'] }
            ],
            text: [
                //en "Spouse_Location_US" si marca que no, solo debe aparecer esta:
                { name: 'Spouse_Specific_Location', required: true, isShow: false },
                //pero si marca que Si, debe mostrar los siguientes formularios
                { name: 'Spouse_Last_Entry', required: true, isShow: false },
                { name: 'Spouse_Date_Last_Entry', required: true, isShow: false },
                { name: 'Spouse_I-94_Number', required: false, isShow: false },
                { name: 'Spouse_Status_Last_Admitted', required: false, isShow: false },
                { name: 'Spouse_Current_Status', required: true, isShow: false },
                { name: 'Spouse_Expiration_Date_Stay', required: false, isShow: false },
                { name: 'Spouse_Previous_arrival', required: false, isShow: false },
            ],
            // select: [
            //     {
            //         //debe ser mostrado con los demas campos si marco si en 'Spouse_Location_US'
            //         'Spouse_Status_Last_Admitted': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
            //     }
            // ],

        },
    },
    {
        name: 'Inclusion',
        fields: {
            radio: [
                { 'Spouse_Include_Application': ['Si', 'No'] }
            ],
            //modificar esto
            text: [
                { name: 'Spouse_Nationality', required: true, isShow: false }
            ]
        }
    },

]
export const childrenBase = [
    {
        name: 'Hijos',
        fields: {
            radio: [
                { 'Children': ['Si', 'No'] }
            ],
            // text: [
            // si en children se marca que si, debe mostrarse este campo pero en formato Select
            // { name: 'Children_Total', required: true, isShow: false },
            // ],
            select: [
                { 'Children_Total': [0, 1, 2, 3, 4, 5, 6] },
            ]
        }
    },
    {
        name: 'Identificacion del hijo 1',
        extra: {
            message: 'Navegue entre las pestañas, cada una representa informacion de un hijo diferente',
            SegmentedControlMessage: Children()
        },
        fields: {
            text: [
                { name: 'Children_Alien_Number', required: false, isShow: false, segment: 0 },
                { name: 'Children_Passport_Number', required: false, isShow: false, segment: 0 },
                { name: 'Children_SSN', required: false, isShow: false, segment: 0 },
                { name: 'Children_Date_of_Birth', required: true, isShow: false, segment: 0 },

            ],
            select: [
                { 'Children_Marital_Status': ['Casado', 'Soltero', 'Divorciado', 'Viudo'] },
            ]
        }
    },
    {
        name: 'Nombres del Hijo 1',
        extra: {
            message: 'Por favor ingrese el nombre de cada uno de sus hijos',
            SegmentedControlMessage: Children()
        },

        fields: {
            text: [
                { name: 'Children_Complete_Last_Name', required: true, isShow: false, segment: 0 },
                { name: 'Children_First_Name', required: true, isShow: false, segment: 0 },
                { name: 'Children_Middle_Name', required: false, isShow: false, segment: 0 },


            ],
            radio: [
                { 'Children_Gender': ['Female', 'Male'] }
            ]
        }
    },
    {
        name: 'Demografia Del Hijo 1 ',
        extra: { message: 'Por favor ingrese el nombre de cada uno de sus hijos', SegmentedControlMessage: Children() },
        fields: {
            text: [
                { name: 'Children_City_Country_of_Birth', required: true, isShow: false, segment: 0 },
                { name: 'Children_Nationality', required: true, isShow: false, segment: 0 },


            ],
            select: [
                { 'Children_Race': ['Hispano', 'Afroamericano', 'Negro', 'Indigena', 'Asiatico'] },
            ]
        }
    },
    {
        name: 'Ubicación actual de Hijo 1',
        extra: {
            message: 'Por favor ingrese la ubicación actual de cada uno de sus hijos',
            SegmentedControlMessage: Children(),
            type: 'conditional',
            Yes: [0, 7],
            No: [0, 1],
            question: [0],
            inputType: 'text'
        },
        fields: {

            text: [
                //en "Children_Location" si marca que no, solo debe aparecer esta:
                { name: 'Children_Specify_Location', required: true, isShow: false, segment: 0 },
                //pero si marca que Si, debe mostrar los siguientes formularios
                { name: 'Children_Place_Last_Entry', required: true, isShow: false, segment: 0 },
                { name: 'Children_Date_Last_Entry', required: true, isShow: false, segment: 0 },
                { name: 'Children_I-94_Number', required: true, false: false, segment: 0 },
                { name: 'Children_Status_Last_Admitted', required: true, isShow: false, segment: 0 },
                { name: 'Children_Current_Status', required: true, isShow: false, segment: 0 },
                { name: 'Children_Expiration_Day_Stay', required: false, isShow: false, segment: 0 },
                // 'Children_Previous_arrival'
            ],
            // select: [
            //     {
            //         //debe ser mostrado con los demas campos si marco si en 'Children_Location_US'
            //         'Children_Status_Last_Admitted': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
            //     }
            // ],
            radio: [
                { 'Children_Location': ['Si', 'No'] },
                { 'Children_Court': ['Si', 'No'] },
            ]
        },
    },
    {
        name: 'Inclusion Hijo 1',
        extra: { message: 'Nacionalidad de Cada uno', SegmentedControlMessage: Children() },

        fields: {
            radio: [
                { 'Children_Included': ['Si', 'No'] },

            ],
            //modificar esto
            text: [
                { name: 'Children_Nationality', required: true, isShow: false, segment: 0 },

            ]
        }
    },
    {
        name: 'Identificacion del hijo 2',
        extra: {
            message: 'Navegue entre las pestañas, cada una representa informacion de un hijo diferente',
            SegmentedControlMessage: Children()
        },
        fields: {
            text: [
                { name: 'Children_Alien_Number1', required: false, isShow: false, },
                { name: 'Children_Passport_Number1', required: false, isShow: false, },
                { name: 'Children_SSN1', required: false, isShow: false, },
                { name: 'Children_Date_of_Birth1', required: true, isShow: false, },
            ],
            select: [
                { 'Children_Marital_Status1': ['Casado', 'Soltero', 'Divorciado', 'Viudo'] },

            ]
        }
    },
    {
        name: 'Nombres del Hijo 2',
        extra: {
            message: 'Por favor ingrese el nombre de cada uno de sus hijos',
            SegmentedControlMessage: Children()
        },

        fields: {
            text: [
                { name: 'Children_Complete_Last_Name1', required: true, isShow: false },
                { name: 'Children_First_Name1', required: true, isShow: false },
                { name: 'Children_Middle_Name1', required: false, isShow: false },


            ],
            radio: [
                { 'Children_Gender1': ['Female', 'Male'] }
            ]
        }
    },
    {
        name: 'Demografia Del Hijo 2',
        extra: { message: 'Por favor ingrese el nombre de cada uno de sus hijos', SegmentedControlMessage: Children() },
        fields: {
            text: [
                { name: 'Children_City_Country_of_Birth1', required: true, isShow: false, segment: 0 },
                { name: 'Children_Nationality1', required: true, isShow: false, segment: 0 },

            ],
            select: [
                { 'Children_Race1': ['Hispano', 'Afroamericano', 'Negro', 'Indigena', 'Asiatico'] },
            ]
        }
    },
    {
        name: 'Ubicación actual de Hijo 2',

        extra: {
            message: 'Por favor ingrese la ubicación actual de cada uno de sus hijos',
            SegmentedControlMessage: Children(),
            type: 'conditional',
            Yes: [0, 7],
            No: [0, 1],
            question: [0],
            inputType: 'text'
        },
        fields: {

            text: [
                //en "Children_Location" si marca que no, solo debe aparecer esta:
                { name: 'Children_Specify_Location1', required: true, isShow: false, segment: 0 },
                //pero si marca que Si, debe mostrar los siguientes formularios
                { name: 'Children_Place_Last_Entry1', required: true, isShow: false, segment: 0 },
                { name: 'Children_Date_Last_Entry1', required: true, isShow: false, segment: 0 },
                { name: 'Children_I-94_Number1', required: false, isShow: false, segment: 0 },
                { name: 'Children_Status_Last_Admitted1', required: true, isShow: false, segment: 0 },
                { name: 'Children_Current_Status1', required: true, isShow: false, segment: 0 },
                { name: 'Children_Expiration_Day_Stay1', required: false, isShow: false, segment: 0 },
                // 'Children_Previous_arrival'
            ],
            // select: [
            //     {
            //         //debe ser mostrado con los demas campos si marco si en 'Children_Location_US'
            //         'Children_Status_Last_Admitted': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
            //     }
            // ],
            radio: [
                { 'Children_Location1': ['Si', 'No'] },
                { 'Children_Court1': ['Si', 'No'] },
            ]
        },
    },
    {
        name: 'Inclusion Hijo 2',
        extra: { message: 'Nacionalidad de Cada uno', SegmentedControlMessage: Children() },

        fields: {
            radio: [
                { 'Children_Included1': ['Si', 'No'] },

            ],
            //modificar esto
            text: [
                { name: 'Children_Nationality1', required: true, isShow: false, segment: 0 },

            ]
        }
    },
    {
        name: 'Identificacion del hijo 3',
        extra: {
            message: 'Navegue entre las pestañas, cada una representa informacion de un hijo diferente',
            SegmentedControlMessage: Children()
        },
        fields: {
            text: [
                { name: 'Children_Alien_Number2', required: false, isShow: false, segment: 0 },
                { name: 'Children_Passport_Number2', required: false, isShow: false, segment: 0 },
                { name: 'Children_SSN2', required: false, isShow: false, segment: 0 },
                { name: 'Children_Date_of_Birth2', required: true, isShow: false, segment: 0 },

            ],
            select: [
                { 'Children_Marital_Status2': ['Casado', 'Soltero', 'Divorciado', 'Viudo'] },
            ]
        }
    },
    {
        name: 'Nombres del Hijo 3',
        extra: {
            message: 'Por favor ingrese el nombre de cada uno de sus hijos',
            SegmentedControlMessage: Children()
        },

        fields: {
            text: [
                { name: 'Children_Complete_Last_Name2', required: true, isShow: false, segment: 0 },
                { name: 'Children_First_Name2', required: true, isShow: false, segment: 0 },
                { name: 'Children_Middle_Name2', required: false, isShow: false, segment: 0 },


            ],
            radio: [
                { 'Children_Gender2': ['Female', 'Male'] }
            ]
        }
    },
    {
        name: 'Demografia Del Hijo 3',
        extra: { message: 'Por favor ingrese el nombre de cada uno de sus hijos', SegmentedControlMessage: Children() },
        fields: {
            text: [
                { name: 'Children_City_Country_of_Birth2', required: true, isShow: false, segment: 0 },
                { name: 'Children_Nationality2', required: true, isShow: false, segment: 0 },


            ],
            select: [
                { 'Children_Race2': ['Hispano', 'Afroamericano', 'Negro', 'Indigena', 'Asiatico'] },
            ]
        }
    },
    {
        name: 'Ubicación actual de Hijo 3',

        extra: {
            message: 'Por favor ingrese la ubicación actual de cada uno de sus hijos',
            SegmentedControlMessage: Children(),
            type: 'conditional',
            Yes: [0, 7],
            No: [0, 1],
            question: [0],
            inputType: 'text'
        },
        fields: {

            text: [
                //en "Children_Location" si marca que no, solo debe aparecer esta:
                { name: 'Children_Specify_Location2', required: true, isShow: false, segment: 0 },
                //pero si marca que Si, debe mostrar los siguientes formularios
                { name: 'Children_Place_Last_Entry2', required: true, isShow: false, segment: 0 },
                { name: 'Children_Date_Last_Entry2', required: true, isShow: false, segment: 0 },
                { name: 'Children_I-94_Number2', required: false, isShow: false, segment: 0 },
                { name: 'Children_Status_Last_Admitted2', required: true, isShow: false, segment: 0 },
                { name: 'Children_Current_Status2', required: true, isShow: false, segment: 0 },
                { name: 'Children_Expiration_Day_Stay2', required: false, isShow: false, segment: 0 },
                // 'Children_Previous_arrival'
            ],
            // select: [
            //     {
            //         //debe ser mostrado con los demas campos si marco si en 'Children_Location_US'
            //         'Children_Status_Last_Admitted': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
            //     }
            // ],
            radio: [
                { 'Children_Location2': ['Si', 'No'] },
                { 'Children_Court2': ['Si', 'No'] },
            ]
        },
    },
    {
        name: 'Inclusion Hijo 3',
        extra: { message: 'Nacionalidad de Cada uno', SegmentedControlMessage: Children() },

        fields: {
            radio: [
                { 'Children_Included2': ['Si', 'No'] },

            ],
            //modificar esto
            text: [
                { name: 'Children_Nationality2', required: true, isShow: false, segment: 0 },

            ]
        }
    },
    {
        name: 'Identificacion del hijo 4',
        extra: {
            message: 'Navegue entre las pestañas, cada una representa informacion de un hijo diferente',
            SegmentedControlMessage: Children()
        },
        fields: {
            text: [
                { name: 'Children_Alien_Number3', required: false, isShow: false, segment: 0 },
                { name: 'Children_Passport_Number3', required: false, isShow: false, segment: 0 },
                { name: 'Children_SSN3', required: false, isShow: false, segment: 0 },
                { name: 'Children_Date_of_Birth3', required: true, isShow: false, segment: 0 },

            ],
            select: [
                { 'Children_Marital_Status3': ['Casado', 'Soltero', 'Divorciado', 'Viudo'] },
            ]
        }
    },
    {
        name: 'Nombres del Hijo 4',
        extra: {
            message: 'Por favor ingrese el nombre de cada uno de sus hijos',
            SegmentedControlMessage: Children()
        },

        fields: {
            text: [
                { name: 'Children_Complete_Last_Name3', required: true, isShow: false, segment: 0 },
                { name: 'Children_First_Name3', required: true, isShow: false, segment: 0 },
                { name: 'Children_Middle_Name3', required: false, isShow: false, segment: 0 },


            ],
            radio: [
                { 'Children_Gender3': ['Female', 'Male'] }
            ]
        }
    },
    {
        name: 'Demografia Del Hijo 4',
        extra: { message: 'Por favor ingrese el nombre de cada uno de sus hijos', SegmentedControlMessage: Children() },
        fields: {
            text: [
                { name: 'Children_City_Country_of_Birth3', required: true, isShow: false, segment: 0 },
                { name: 'Children_Nationality3', required: true, isShow: false, segment: 0 },


            ],
            select: [
                { 'Children_Race3': ['Hispano', 'Afroamericano', 'Negro', 'Indigena', 'Asiatico'] },
            ]
        }
    },
    {
        name: 'Ubicación actual de Hijo 4',

        extra: {
            message: 'Por favor ingrese la ubicación actual de cada uno de sus hijos',
            SegmentedControlMessage: Children(),
            type: 'conditional',
            Yes: [0, 7],
            No: [0, 1],
            question: [0],
            inputType: 'text'
        },
        fields: {

            text: [
                //en "Children_Location" si marca que no, solo debe aparecer esta:
                { name: 'Children_Specify_Location3', required: true, isShow: false, segment: 0 },
                //pero si marca que Si, debe mostrar los siguientes formularios
                { name: 'Children_Place_Last_Entry3', required: true, isShow: false, segment: 0 },
                { name: 'Children_Date_Last_Entry3', required: true, isShow: false, segment: 0 },
                { name: 'Children_I-94_Number3', required: false, isShow: false, segment: 0 },
                { name: 'Children_Status_Last_Admitted3', required: true, isShow: false, segment: 0 },
                { name: 'Children_Current_Status3', required: true, isShow: false, segment: 0 },
                { name: 'Children_Expiration_Day_Stay3', required: false, isShow: false, segment: 0 },
                // 'Children_Previous_arrival'
            ],
            // select: [
            //     {
            //         //debe ser mostrado con los demas campos si marco si en 'Children_Location_US'
            //         'Children_Status_Last_Admitted': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
            //     }
            // ],
            radio: [
                { 'Children_Location3': ['Si', 'No'] },
                { 'Children_Court3': ['Si', 'No'] },
            ]
        },
    },
    {
        name: 'Inclusion Hijo 4',
        extra: { message: 'Nacionalidad de Cada uno', SegmentedControlMessage: Children() },

        fields: {
            radio: [
                { 'Children_Included3': ['Si', 'No'] },

            ],
            //modificar esto
            text: [
                { name: 'Children_Nationality3', required: true, isShow: false, segment: 0 },

            ]
        }
    },
    {
        name: 'Identificacion del hijo 5',
        extra: {
            message: 'Navegue entre las pestañas, cada una representa informacion de un hijo diferente',
            SegmentedControlMessage: Children()
        },
        fields: {
            text: [
                { name: 'Children_Alien_Number4', required: false, isShow: false, segment: 0 },
                { name: 'Children_Passport_Number4', required: false, isShow: false, segment: 0 },
                { name: 'Children_SSN4', required: false, isShow: false, segment: 0 },
                { name: 'Children_Date_of_Birth4', required: true, isShow: false, segment: 0 },

            ],
            select: [
                { 'Children_Marital_Status4': ['Casado', 'Soltero', 'Divorciado', 'Viudo'] },
            ]
        }
    },
    {
        name: 'Nombres del Hijo 5',
        extra: {
            message: 'Por favor ingrese el nombre de cada uno de sus hijos',
            SegmentedControlMessage: Children()
        },

        fields: {
            text: [
                { name: 'Children_Complete_Last_Name4', required: true, isShow: false, segment: 0 },
                { name: 'Children_First_Name4', required: true, isShow: false, segment: 0 },
                { name: 'Children_Middle_Name4', required: false, isShow: false, segment: 0 },


            ],
            radio: [
                { 'Children_Gender4': ['Female', 'Male'] }
            ]
        }
    },
    {
        name: 'Demografia Del Hijo 5',
        extra: { message: 'Por favor ingrese el nombre de cada uno de sus hijos', SegmentedControlMessage: Children() },
        fields: {
            text: [
                { name: 'Children_City_Country_of_Birth4', required: true, isShow: false, segment: 0 },
                { name: 'Children_Nationality4', required: true, isShow: false, segment: 0 },


            ],
            select: [
                { 'Children_Race4': ['Hispano', 'Afroamericano', 'Negro', 'Indigena', 'Asiatico'] },
            ]
        }
    },
    {
        name: 'Ubicación actual de Hijo 5',

        extra: {
            message: 'Por favor ingrese la ubicación actual de cada uno de sus hijos',
            SegmentedControlMessage: Children(),
            type: 'conditional',
            Yes: [0, 7],
            No: [0, 1],
            question: [0],
            inputType: 'text'
        },
        fields: {

            text: [
                //en "Children_Location" si marca que no, solo debe aparecer esta:
                { name: 'Children_Specify_Location4', required: true, isShow: false, segment: 0 },
                //pero si marca que Si, debe mostrar los siguientes formularios
                { name: 'Children_Place_Last_Entry4', required: true, isShow: false, segment: 0 },
                { name: 'Children_Date_Last_Entry4', required: true, isShow: false, segment: 0 },
                { name: 'Children_I-94_Number4', required: false, isShow: false, segment: 0 },
                { name: 'Children_Status_Last_Admitted4', required: true, isShow: false, segment: 0 },
                { name: 'Children_Current_Status4', required: true, isShow: false, segment: 0 },
                { name: 'Children_Expiration_Day_Stay4', required: false, isShow: false, segment: 0 },
                // 'Children_Previous_arrival'
            ],
            // select: [
            //     {
            //         //debe ser mostrado con los demas campos si marco si en 'Children_Location_US'
            //         'Children_Status_Last_Admitted': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
            //     }
            // ],
            radio: [
                { 'Children_Location4': ['Si', 'No'] },
                { 'Children_Court4': ['Si', 'No'] },
            ]
        },
    },
    {
        name: 'Inclusion Hijo 5',
        extra: { message: 'Nacionalidad de Cada uno', SegmentedControlMessage: Children() },

        fields: {
            radio: [
                { 'Children_Included4': ['Si', 'No'] },

            ],
            //modificar esto
            text: [
                { name: 'Children_Nationality4', required: true, isShow: false, segment: 0 },

            ]
        }
    },
    {
        name: 'Identificacion del hijo 6',
        extra: {
            message: 'Navegue entre las pestañas, cada una representa informacion de un hijo diferente',
            SegmentedControlMessage: Children()
        },
        fields: {
            text: [
                { name: 'Children_Alien_Number5', required: false, isShow: false, segment: 0 },
                { name: 'Children_Passport_Number5', required: false, isShow: false, segment: 0 },
                { name: 'Children_SSN5', required: false, isShow: false, segment: 0 },
                { name: 'Children_Date_of_Birth5', required: true, isShow: false, segment: 0 },

            ],
            select: [
                { 'Children_Marital_Status5': ['Casado', 'Soltero', 'Divorciado', 'Viudo'] },
            ]
        }
    },
    {
        name: 'Nombres del Hijo 6',
        extra: {
            message: 'Por favor ingrese el nombre de cada uno de sus hijos',
            SegmentedControlMessage: Children()
        },

        fields: {
            text: [
                { name: 'Children_Complete_Last_Name5', required: true, isShow: false, segment: 0 },
                { name: 'Children_First_Name5', required: true, isShow: false, segment: 0 },
                { name: 'Children_Middle_Name5', required: false, isShow: false, segment: 0 },


            ],
            radio: [
                { 'Children_Gender5': ['Female', 'Male'] }
            ]
        }
    },
    {
        name: 'Demografia Del Hijo 6',
        extra: { message: 'Por favor ingrese el nombre de cada uno de sus hijos', SegmentedControlMessage: Children() },
        fields: {
            text: [
                { name: 'Children_City_Country_of_Birt5', required: true, isShow: false, segment: 0 },
                { name: 'Children_Nationality5', required: true, isShow: false, segment: 0 },
            ],
            select: [
                { 'Children_Race5': ['Hispano', 'Afroamericano', 'Negro', 'Indigena', 'Asiatico'] },
            ]
        }
    },
    {
        name: 'Ubicación actual de Hijo 6',

        extra: {
            message: 'Por favor ingrese la ubicación actual de cada uno de sus hijos',
            SegmentedControlMessage: Children(),
            type: 'conditional',
            Yes: [0, 7],
            No: [0, 1],
            question: [0],
            inputType: 'text'
        },
        fields: {

            text: [
                //en "Children_Location" si marca que no, solo debe aparecer esta:
                { name: 'Children_Specify_Location5', required: true, isShow: false, segment: 0 },
                //pero si marca que Si, debe mostrar los siguientes formularios
                { name: 'Children_Place_Last_Entry5', required: true, isShow: false, segment: 0 },
                { name: 'Children_Date_Last_Entry5', required: true, isShow: false, segment: 0 },
                { name: 'Children_I-94_Number5', required: false, isShow: false, segment: 0 },
                { name: 'Children_Status_Last_Admittedchildren5', required: true, isShow: false, segment: 0 },
                { name: 'Children_Current_Status5', required: true, isShow: false, segment: 0 },
                { name: 'Children_Expiration_Day_Stay5', required: false, isShow: false, segment: 0 },
                // 'Children_Previous_arrival'
            ],
            // select: [
            //     {
            //         //debe ser mostrado con los demas campos si marco si en 'Children_Location_US'
            //         'Children_Status_Last_Admitted': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
            //     }
            // ],
            radio: [
                { 'Children_Location5': ['Si', 'No'] },
                { 'Children_Court5': ['Si', 'No'] },
            ]
        },
    },
    {
        name: 'Inclusion Hijo 6',
        extra: { message: 'Nacionalidad de Cada uno', SegmentedControlMessage: Children() },

        fields: {
            radio: [
                { 'Children_Included5': ['Si', 'No'] },

            ],
            //modificar esto
            text: [
                { name: 'Children_Nationality5', required: true, isShow: false, segment: 0 },

            ]
        }
    },
]
export let aplicantPart_A_II_Children = []
export const aplicantPart_A_III_Background = [
    {
        name: 'Liste donde vivio antes de venir a los Estados Unidos',
        extra: {
            type: 'multiple',
            message: 'Si necesita registrar mas de 1 direccion use este menu',
            SegmentedControlMessage: ['Direccion #1', 'Direccion #2'],
            sliceSize: [[0, 6], [6, 12]]
        },
        fields: {
            text: [
                { name: 'BG_Number_Street', required: true, isShow: false },
                { name: 'BG_City', required: true, isShow: false },
                { name: 'BG_State', required: true, isShow: false },
                { name: 'BG_Country', required: true, isShow: false },
                { name: 'BG_Date_From', required: true, isShow: false },
                { name: 'BG_Date_To', required: true, isShow: false },

                { name: 'BG_Number_Street1', required: true, isShow: false },
                { name: 'BG_City2', required: true, isShow: false },
                { name: 'BG_State2', required: true, isShow: false },
                { name: 'BG_Country2', required: true, isShow: false },
                { name: 'BG_Date_From2', required: true, isShow: false },
                { name: 'BG_Date_To2', required: true, isShow: false },
            ]
        }
    },
    {
        name: 'Indique sus direcciones de los ultimos 5 años empezando por la mas actual',
        extra: {
            type: 'multiple',
            message: 'Si necesita registrar mas de 1 direccion use este menu',
            SegmentedControlMessage: ['Direccion #1', 'Direccion #2', 'Direccion #3', 'Direccion #4', 'Direccion #5'],
            sliceSize: [[0, 6], [6, 12], [12, 18], [18, 24], [24, 30]]
        },
        fields: {
            text: [
                { name: 'BG_Number_Street_5Y', required: true, isShow: false },
                { name: 'BG_City_5Y', required: true, isShow: false },
                { name: 'BG_State_5Y', required: true, isShow: false },
                { name: 'BG_Country_5Y', required: true, isShow: false },
                { name: 'BG_Date_From_5Y', required: true, isShow: false },
                { name: 'BG_Date_To_5Y', required: true, isShow: false },


                { name: 'BG_Number_Street_5Y-1', required: true, isShow: false },
                { name: 'BG_City_5Y-1', required: true, isShow: false },
                { name: 'BG_State_5Y-1', required: true, isShow: false },
                { name: 'BG_Country_5Y-1', required: true, isShow: false },
                { name: 'BG_Date_From_5Y1', required: true, isShow: false },
                { name: 'BG_Date_To_5Y1', required: true, isShow: false },

                { name: 'BG_Number_Street_5Y-2', required: true, isShow: false },
                { name: 'BG_City_5Y-2', required: true, isShow: false },
                { name: 'BG_State_5Y-2', required: true, isShow: false },
                { name: 'BG_Country_5Y-2', required: true, isShow: false },
                { name: 'BG_Date_From_5Y2', required: true, isShow: false },
                { name: 'BG_Date_To_5Y2', required: true, isShow: false },

                { name: 'BG_Number_Street_5Y-3', required: true, isShow: false },
                { name: 'BG_City_5Y-3', required: true, isShow: false },
                { name: 'BG_State_5Y-3', required: true, isShow: false },
                { name: 'BG_Country_5Y-3', required: true, isShow: false },
                { name: 'BG_Date_From_5Y3', required: true, isShow: false },
                { name: 'BG_Date_To_5Y3', required: true, isShow: false },

                { name: 'BG_Number_Street_5Y-4', required: true, isShow: false },
                { name: 'BG_City_5Y-4', required: true, isShow: false },
                { name: 'BG_State_5Y-4', required: true, isShow: false },
                { name: 'BG_Country_5Y-4', required: true, isShow: false },
                { name: 'BG_Date_From_5Y4', required: true, isShow: false },
                { name: 'BG_Date_To_5Y4', required: true, isShow: false },
            ]
        }
    },
    {
        name: 'Informacion sobre su educación',
        extra: {
            type: 'multiple',
            message: 'Si necesita registrar mas informacion use este menu',
            SegmentedControlMessage: ['Slot #1', 'Slot #2', 'Slot #3'],
            sliceSize: [[0, 5], [5, 10], [10, 15], [15, 20]]
        },
        fields: {
            text: [
                { name: 'BG_School', required: true, isShow: false },
                { name: 'BG_Type_School', required: true, isShow: false },
                { name: 'BG_Location', required: true, isShow: false },
                { name: 'BG_Education_From', required: true, isShow: false },
                { name: 'BG_Education_To', required: true, isShow: false },

                { name: 'BG_School2', required: true, isShow: false },
                { name: 'BG_Type_School2', required: true, isShow: false },
                { name: 'BG_Location2', required: true, isShow: false },
                { name: 'BG_Education_From-1', required: true, isShow: false },
                { name: 'BG_Education_To-1', required: true, isShow: false },

                { name: 'BG_School3', required: true, isShow: false },
                { name: 'BG_Type_School3', required: true, isShow: false },
                { name: 'BG_Location3', required: true, isShow: false },
                { name: 'BG_Education_From-2', required: true, isShow: false },
                { name: 'BG_Education_To-2', required: true, isShow: false },

                { name: 'BG_School4', required: true, isShow: false },
                { name: 'BG_Type_School4', required: true, isShow: false },
                { name: 'BG_Location4', required: true, isShow: false },
                { name: 'BG_Education_From-3', required: true, isShow: false },
                { name: 'BG_Education_To-3', required: true, isShow: false },
            ]
        }
    },
    {
        name: 'Información de su empleo durante los ultimos 5 años. El mas reciente PRIMERO',
        extra: {
            type: 'multiple',
            message: 'Si necesita registrar mas informacion use este menu',
            SegmentedControlMessage: ['Empleo #1', 'Empleo #2', 'Empleo #3'],
            sliceSize: [[0, 4], [4, 8], [8, 12]]
        },
        fields: {
            text: [
                { name: 'BG_Employment_Addres', required: true, isShow: false },
                { name: 'BG_Employment_Occupation', required: true, isShow: false },
                { name: 'BG_Employment_Date_From', required: true, isShow: false },
                { name: 'BG_Employment_Date_To', required: true, isShow: false },

                { name: 'BG_Employment_Addres1', required: true, isShow: false },
                { name: 'BG_Employment_Occupation1', required: true, isShow: false },
                { name: 'BG_Employment_Date_From1', required: true, isShow: false },
                { name: 'BG_Employment_Date_To1', required: true, isShow: false },

                { name: 'BG_Employment_Addres2', required: true, isShow: false },
                { name: 'BG_Employment_Occupation2', required: true, isShow: false },
                { name: 'BG_Employment_Date_From2', required: true, isShow: false },
                { name: 'BG_Employment_Date_To2', required: true, isShow: false },

            ]
        }
    },
    {
        name: "Información de sus padres",
        fields: {
            text: [
                { name: 'Parents_Mother', required: true, isShow: false },
                { name: 'Parent_Mother_Address', required: true, isShow: false },
                { name: 'Parent_Mother_Current_Location', required: true, isShow: false },

                { name: 'Parents_Father', required: true, isShow: false },
                { name: 'Parent_Father_Address', required: true, isShow: false },
                { name: 'Parent_Father_Current_Location', required: true, isShow: false },
            ],
            check: [
                { name: 'Parent_Mother_Deceased', required: true, isShow: true },
                { name: 'Parent_Father_Deceased', required: true, isShow: true },
            ]
        }
    },
    {
        name: "Información de sus hermanos",
        extra: {
            type: 'multiple',
            message: 'Si necesita registrar mas informacion use este menu',
            SegmentedControlMessage: ['Hermano #1', 'Hermano #2', 'Hermano #3', 'Hermano #4'],
            sliceSize: [[0, 3], [3, 6], [6, 9], [9, 13]]
        },
        fields: {
            text: [
                { name: 'Sibling', required: true, isShow: false },
                { name: 'Sibling_Address', required: true, isShow: false },
                { name: 'Sibling_Current_Location', required: true, isShow: false },

                { name: 'Sibling1', required: true, isShow: false },
                { name: 'Sibling_Address1', required: true, isShow: false },
                { name: 'Sibling_Current_Location1', required: true, isShow: false },

                { name: 'Sibling2', required: true, isShow: false },
                { name: 'Sibling_Address2', required: true, isShow: false },
                { name: 'Sibling_Current_Location2', required: true, isShow: false },

                { name: 'Sibling3', required: true, isShow: false },
                { name: 'Sibling_Address3', required: true, isShow: false },
                { name: 'Sibling_Current_Location3', required: true, isShow: false },
            ],
            check: [
                { name: 'Sibling_Deceased', required: true, isShow: true },
                { name: 'Sibling_Deceased1', required: true, isShow: true },
                { name: 'Sibling_Deceased2', required: true, isShow: true },
                { name: 'Sibling_Deceased3', required: true, isShow: true },
            ]
        }
    },
]
export const aplicantPart_B_I = [
    {
        name: 'Marque lar razones por las que esta aplicando asilo. (todas las que apliquen)',
        fields: {
            check: [
                { name: 'WYA_Race', required: true, isShow: false },
                { name: 'WYA_Religion', required: true, isShow: false },
                { name: "WYA_Nationality", required: true, isShow: false },
                { name: "WYA_Political_Opinion", required: true, isShow: false },
                { name: "WYA_Member_Particular_Group", required: true, isShow: false },
                { name: "WYA_Torture", required: true, isShow: false },
            ],
        }
    },
    {
        name: '¿Alguna vez usted, su familia, amigos o colegas han sufrido daño, maltrato o amenazas?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [
                { name: 'Mistreatment_Explenation', required: true, isShow: false },
            ],
            radio: [
                {
                    "Mistreatment": ['Si', 'No']
                }
            ]
        }
    },
    {
        name: '¿Teme sufrir daño o maltrato si regresa a su país de origen?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [
                { name: 'fear_mistreatment_Explanation', required: true, isShow: false },

            ],
            radio: [
                {
                    "fear_mistreatment": ['Si', 'No']
                }
            ]
        }
    },
    {
        name: '¿Alguna vez usted o su familia fueron acusados, detenidos, interrogados, o torturads en otro país (incluso por infracciones migratorias)?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [
                { name: 'Family_Crimes_Explanation', required: true, isShow: false },
            ],
            radio: [
                {
                    "Family_Crimes": ['Si', 'No']
                }
            ]
        }
    },
    {
        name: '¿Usted o algún familiar ha pertenecido o estado ligado a alguna agrupación en su país por ejemplo, partido político, sindicato, grupo religioso, paramilitar o guerrilla?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [
                { name: 'Family_Group_Link_Explanation', required: true, isShow: false },
            ],
            radio: [
                {
                    "Family_Group_Link": ['Si', 'No']
                }
            ]
        }
    },
    {
        name: '¿Usted o sus familiares continúan participando de alguna manera en estas organizaciones o grupos?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [
                { name: 'Family_Group_Link_isActive_Explanation', required: true, isShow: false },
            ],
            radio: [
                {
                    "Family_Group_Link_isActive": ['Si', 'No']
                }
            ]
        }
    },
    {
        name: '¿Tiene usted miedo de ser sometido a tortura en su país de origen o en cualquier otro país al que pueda ser devuelto?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [
                { name: 'Afraid_of_Torture_Explanation', required: true, isShow: false },
            ],
            radio: [
                {
                    "Afraid_of_Torture": ['Si', 'No']
                }
            ]
        }
    },
]
export const aplicantPart_C_I = [
    {
        name: 'A  solicitado usted o algun familiar al Gobierno de EE. UU. estatus de refugiado, asilo o suspensión de deportación?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [
                { name: 'Family_Applied_asylum_Explanation', required: true, isShow: false }
            ],
            radio: [
                { 'Family_Applied_asylum': ['Si', 'No'] }
            ]
        }
    },
    {
        name: '¿Tras salir del país del que solicita asilo, usted, su cónyuge o hijos residieron o viajaron a otro país antes de ingresar a EE. UU.?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [

                { name: 'Stay_and_Legal_Status_Other_Countries_Explanation', required: true, isShow: false }

            ],
            radio: [
                { 'Stay_Other_Countries': ['Si', 'No'] },
                { 'Legal_Status_Other_Coutries': ['Si', 'No'] }
            ]
        }
    },
    {
        name: '¿Alguna vez usted, su cónyuge o hijos han dañado o ayudado a dañar a alguien por su raza, religión, nacionalidad, grupo social u opinión política?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [

                { name: 'Discriminatory_Actions_Against_Others_Explanation', required: true, isShow: false }

            ],
            radio: [
                { 'Discriminatory_Actions_Against_Others': ['Si', 'No'] },
            ]
        }
    },
    {
        name: 'Después de salir del país donde sufrió daño o teme sufrir daño, ¿regresó a ese país?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [

                { name: 'Return_Country__you_Fear_Explanation', required: true, isShow: false }

            ],
            radio: [
                { 'Return_Country__you_Fear': ['Si', 'No'] },
            ]
        }
    },
    {
        name: '¿Está presentando esta solicitud más de 1 año después de su última llegada a los Estados Unidos?',

        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        }, fields: {
            textArea: [

                { name: 'Expire_Time_Asaylum_Applicat_Explanation', required: true, isShow: false }

            ],
            radio: [
                { 'Expire_Time_Asaylum_Applicat': ['Si', 'No'] },
            ]
        }
    },
    {
        name: '¿Alguna vez usted o su familia han cometido un delito o sido arrestados, acusados, condenados o sentenciados en EEUU.?',
        extra: {
            type: 'conditional',
            Yes: [0, 1],
            No: [0, 0],
            question: [0],
            inputType: 'textArea'
        },
        fields: {
            textArea: [

                { name: 'Crimes_In_USA_Explanation', required: true, isShow: false }

            ],
            radio: [
                { 'Crimes_In_USA': ['Si', 'No'] },
            ]
        }
    },
];