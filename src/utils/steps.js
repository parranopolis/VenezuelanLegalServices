//dictionary to segment the fields and their different types that should be displayed together
export const aplicantPart_A_I = [
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

export const aplicantPart_A_II_Spouse = [
    {
        name: 'Identificacion del Conyuge',
        fields: {
            text: ['Spouse_Alien_Number', 'Spouse_Passport_Number', 'Spouse_SSN', 'Spouse_Date_of_Birth'],
        }
    }, {
        name: 'Nombres y Apellidos del Conyuge',
        fields: {
            text: ['Spouse_Complete_Last_Name',
                'Spouse_First_Name',
                'Spouse_Middle_Name',
                'Spouse_Other_Names',]
        }
    },
    {
        name: 'Información del Matrimonio',
        fields: {
            text: [
                'Spouse_Date_og_Marriage',
                'Spouse_Place_Marriage',
                'Spouse_City_Country_of_Birth',

            ]
        }
    }, {
        name: 'Datos Demograficos del Conyuge',
        fields: {
            text: [
                'Spouse_Nationality'
            ],
            select: [
                {
                    'Spouse_Race': ['Hispano', 'AfroAmericano', 'Negro', 'Indigena', 'Asiatico']
                }],
            radio: [
                { 'Spouse_Gender': ['Mujer', 'Hombre'] }
            ]
        },
    },
    {
        name: 'Ubicación actual de Conyugue',
        fields: {
            text: [
                //en "Spouse_Location_US" si marca que no, solo debe aparecer esta:
                'Spouse_Specific_Location',
                //pero si marca que Si, debe mostrar los siguientes formularios
                'Spouse_Last_Entry',
                'Spouse_Date_Last_Entry',
                'Spouse_I-94_Number',
                'Spouse_Status_Last_Admitted',
                'Spouse_Current_Status',
                'Spouse_Expiration_Date_Stay',
                'Spouse_Previous_arrival'
            ],
            // select: [
            //     {
            //         //debe ser mostrado con los demas campos si marco si en 'Spouse_Location_US'
            //         'Spouse_Status_Last_Admitted': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
            //     }
            // ],
            radio: [
                { 'Spouse_Location_US': ['Yes', 'No'] },
                { 'Spouse_Court': ['Yes', 'No'] }
            ]
        },
    },
    {
        name: 'Inclusion',
        fields: {
            radio: [
                { 'Spouse_Include_Application': ['Yes', 'No'] }
            ],
            //modificar esto
            text: [
                'Spouse_Nationality'
            ]
        }
    },

]
export const aplicantPart_A_II_Children = [
    {
        name: 'Hijos',
        fields: {
            radio: [
                { 'Children': ['Yes', 'No'] }
            ],
            text: [
                //si en children se marca que si, debe mostrarse este campo pero en formato Select
                'Children_Total',
            ],
            select: [{
                'Children_Total': ['1', '2', '3', '4']
            }]
        }
    },
    {
        name: 'Identificacion del hijo 1',
        fields: {
            text: [
                'Children_Alien_Number',
                'Children_Passport_Number',
                'Children_SSN',
                'Children_Date_of_Birth'
            ],
            select: [
                { 'Children_Marital_Status': ['Casado', 'Soltero', 'Divorciado', 'Viudo'] }
            ]
        }
    },
    {
        name: 'Nombres del Hijo 1',
        fields: {
            text: [
                'Children_Complete_Last_Name',
                'Children_First_Name',
                'Children_Middle_Name',
            ],
            radio: [
                { 'Children_Gender': ['Female', 'Male'] }
            ]
        }
    },
    {
        name: 'Demografia',
        fields: {
            text: [
                'Children_City_Country_of_Birth',
                'Children_Nationality',

            ],
            select: [
                { 'Children_Race': ['Hispano', 'AfroAmericano', 'Negro', 'Indigena', 'Asiatico'] }
            ]
        }
    },
    {
        name: 'Ubicación actual de Niño',
        fields: {
            text: [
                //en "Children_Location" si marca que no, solo debe aparecer esta:
                'Children_Specify_Location',
                //pero si marca que Si, debe mostrar los siguientes formularios
                'Children_Place_Last_Entry',
                'Children_Date_Last_Entry',
                'Children_I-94_Number',
                'Children_Status_Last_Admitted',
                'Children_Current_Status',
                'Children_Expiration_Day_Stay',
                // 'Children_Previous_arrival'
            ],
            // select: [
            //     {
            //         //debe ser mostrado con los demas campos si marco si en 'Children_Location_US'
            //         'Children_Status_Last_Admitted': ['Entregado en La frontera | No expira', 'CBP1', 'Visa de Turista', 'Visa de Estudiante', 'Parole Humanitario'],
            //     }
            // ],
            radio: [
                { 'Children_Location': ['Yes', 'No'] },
                { 'Children_Court': ['Yes', 'No'] }
            ]
        },
    },
    {
        name: 'Inclusion',
        fields: {
            radio: [
                { 'Children_Included': ['Yes', 'No'] }
            ],
            //modificar esto
            text: [
                'Children_Nationality'
            ]
        }
    },

]

export const aplicantPart_A_III = [
    {
        name: 'Prueba 3',
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
]