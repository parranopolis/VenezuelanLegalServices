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
        extra: { id: 'ID', message: 'This is a message' }
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
        fields: {
            text: [
                { name: 'Street_Number_and_Name', required: true, isShow: false },
                { name: 'Apt_Number', required: true, isShow: false },
                { name: 'City', required: true, isShow: false },
                { name: 'State', required: true, isShow: false },
                { name: 'Zip_Code', required: true, isShow: false },
                { name: 'phone_Number_1', required: true, isShow: false },
                { name: 'In_Care_of', required: true, isShow: true },
                { name: 'phone_Number_2', required: true, isShow: true },
                { name: 'Street_Number_and_Name_POX', required: true, isShow: true },
                { name: 'Apt_Number_POX', required: true, isShow: true },
                { name: 'City_POX', required: true, isShow: true },
                { name: 'State_POX', required: true, isShow: true },
                { name: 'Zip_Code_POX', required: true, isShow: true },
            ],
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
            text: [{ name: 'Date_Of_Birth', required: true, isShow: false }]
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
        name: 'Informacion de Viaje',
        fields: {
            text: [
                { name: 'Leave_Your_Country', required: true, isShow: false },
                { name: 'I-94_Number', required: true, isShow: false },
                { name: 'Each_Entry_Date_1', required: true, isShow: false },
                { name: 'Each_Entry_Place_1', required: true, isShow: false },
                { name: 'Each_Entry_Date_2', required: true, isShow: true },
                { name: 'Each_Entry_Place_2', required: true, isShow: true },
                { name: 'Each_Entry_Date_3', required: true, isShow: true },
                { name: 'Each_Entry_Place_3', required: true, isShow: true },
                { name: 'Each_Entry_Date_Expires', required: true, isShow: true },
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
                { name: 'Passport_Country', required: true, isShow: false },
                { name: 'Passport_Number', required: true, isShow: false },
                { name: 'Passport_Expiration_Day', required: true, isShow: false },
                { name: 'Native_Language', required: true, isShow: false },
                { name: 'Other_Language', required: true, isShow: false },
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
            text: [
                { name: 'Spouse_Alien_Number', required: true, isShow: false },
                { name: 'Spouse_Passport_Number', required: true, isShow: false },
                { name: 'Spouse_SSN', required: true, isShow: false },
                { name: 'Spouse_Date_of_Birth', required: true, isShow: false },],
        }
    }, {
        name: 'Nombres y Apellidos del Conyuge',
        fields: {
            text: [
                { name: 'Spouse_Complete_Last_Name', required: true, isShow: false },
                { name: 'Spouse_First_Name', required: true, isShow: false },
                { name: 'Spouse_Middle_Name', required: true, isShow: false },
                { name: 'Spouse_Other_Names', required: true, isShow: false },]
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
                { name: 'Spouse_Specific_Location', required: true, isShow: false },
                //pero si marca que Si, debe mostrar los siguientes formularios
                { name: 'Spouse_Last_Entry', required: true, isShow: true },
                { name: 'Spouse_Date_Last_Entry', required: true, isShow: true },
                { name: 'Spouse_I-9', required: true, isShow: true },
                { name: 'Spouse_Status_Last_Admitted', required: true, isShow: true },
                { name: 'Spouse_Current_Status', required: true, isShow: true },
                { name: 'Spouse_Expiration_Date_Stay', required: true, isShow: true },
                { name: 'Spouse_Previous_arrival', required: true, isShow: true },
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
                { name: 'Spouse_Nationality', required: true, isShow: false }
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
                { name: 'Children_Total', required: true, isShow: false },
            ],
            // select: [{
            //     'Children_Total': ['1', '2', '3', '4']
            // }]
        }
    },
    {
        name: 'Identificacion del hijo 1',
        fields: {
            text: [
                { name: 'Children_Alien_Number', required: true, isShow: false },
                { name: 'Children_Passport_Number', required: true, isShow: false },
                { name: 'Children_SSN', required: true, isShow: false },
                { name: 'Children_Date_of_Birth', required: true, isShow: false },
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
                { name: 'Children_Complete_Last_Name', required: true, isShow: false },
                { name: 'Children_First_Name', required: true, isShow: false },
                { name: 'Children_Middle_Name', required: true, isShow: false },
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
                { name: 'Children_City_Country_of_Birth', required: true, isShow: false },
                { name: 'Children_Nationality', required: true, isShow: false },

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
                { name: 'Children_Specify_Location', required: true, isShow: false },
                //pero si marca que Si, debe mostrar los siguientes formularios
                { name: 'Children_Place_Last_Entry', required: true, isShow: false },
                { name: 'Children_Date_Last_Entry', required: true, isShow: false },
                { name: 'Children_I-94_Number', required: true, isShow: false },
                { name: 'Children_Status_Last_Admitted', required: true, isShow: false },
                { name: 'Children_Current_Status', required: true, isShow: false },
                { name: 'Children_Expiration_Day_Stay', required: true, isShow: false },
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
                { name: 'Children_Nationality', required: true, isShow: false }
            ]
        }
    },

]


