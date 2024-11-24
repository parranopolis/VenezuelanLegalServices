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

export const aplicantPart_A_II = [
    {
        name: 'Prueba 2',
        fields: {
            select: [
                {
                    'Race_Ethnic_Tribal_Group': ['Hispano', 'AfroAmericano', 'Negro', 'Indigena', 'Asiatico']
                }
            ],
            text: ['City_and_Country_of_Birth', 'Present_Nacionality', 'Nationality_at_Birth', 'Religion'],
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