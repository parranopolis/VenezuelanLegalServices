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
export const aplicantPart_A_III_Background = [
    {
        name: 'Liste donde vivio antes de venir a los Estados Unidos',
        fields: {
            text: [
                { name: 'BG_Number_Street', required: true, isShow: false },
                { name: 'BG_City', required: true, isShow: false },
                { name: 'BG_State', required: true, isShow: false },
                { name: 'BG_Country', required: true, isShow: false },
                { name: 'BG_Date_From', required: true, isShow: false },
                { name: 'BG_Date_To', required: true, isShow: false },

                { name: 'BG_Number_Street1', required: true, isShow: true },
                { name: 'BG_City2', required: true, isShow: true },
                { name: 'BG_State2', required: true, isShow: true },
                { name: 'BG_Country2', required: true, isShow: true },
                { name: 'BG_Date_From2', required: true, isShow: true },
                { name: 'BG_Date_To2', required: true, isShow: true },
            ]
        }
    },
    {
        name: 'Indique sus direcciones de los ultimos 5 años empezando por la mas actual',
        fields: {
            text: [
                { name: 'BG_Number_Street_5Y', required: true, isShow: false },
                { name: 'BG_City_5Y', required: true, isShow: false },
                { name: 'BG_State_5Y', required: true, isShow: false },
                { name: 'BG_Country_5Y', required: true, isShow: false },
                { name: 'BG_Date_From_5Y', required: true, isShow: false },
                { name: 'BG_Date_To_5Y', required: true, isShow: false },


                { name: 'BG_Number_Street_5Y-1', required: true, isShow: true },
                { name: 'BG_City_5Y-1', required: true, isShow: true },
                { name: 'BG_State_5Y-1', required: true, isShow: true },
                { name: 'BG_Country_5Y-1', required: true, isShow: true },
                { name: 'BG_Date_From_5Y1', required: true, isShow: true },
                { name: 'BG_Date_To_5Y1', required: true, isShow: true },

                { name: 'BG_Number_Street_5Y-2', required: true, isShow: true },
                { name: 'BG_City_5Y-2', required: true, isShow: true },
                { name: 'BG_State_5Y-2', required: true, isShow: true },
                { name: 'BG_Country_5Y-2', required: true, isShow: true },
                { name: 'BG_Date_From_5Y2', required: true, isShow: true },
                { name: 'BG_Date_To_5Y2', required: true, isShow: true },

                { name: 'BG_Number_Street_5Y-3', required: true, isShow: true },
                { name: 'BG_City_5Y-3', required: true, isShow: true },
                { name: 'BG_State_5Y-3', required: true, isShow: true },
                { name: 'BG_Country_5Y-3', required: true, isShow: true },
                { name: 'BG_Date_From_5Y3', required: true, isShow: true },
                { name: 'BG_Date_To_5Y3', required: true, isShow: true },

                { name: 'BG_Number_Street_5Y-4', required: true, isShow: true },
                { name: 'BG_City_5Y-4', required: true, isShow: true },
                { name: 'BG_State_5Y-4', required: true, isShow: true },
                { name: 'BG_Country_5Y-4', required: true, isShow: true },
                { name: 'BG_Date_From_5Y4', required: true, isShow: true },
                { name: 'BG_Date_To_5Y4', required: true, isShow: true },
            ]
        }
    },
    {
        name: 'Informacion sobre su educación',
        fields: {
            text: [
                { name: 'BG_School', required: true, isShow: false },
                { name: 'BG_Type_School', required: true, isShow: false },
                { name: 'BG_Location', required: true, isShow: false },
                { name: 'BG_Education_From', required: true, isShow: false },
                { name: 'BG_Education_To', required: true, isShow: false },

                { name: 'BG_School2', required: true, isShow: true },
                { name: 'BG_Type_School2', required: true, isShow: true },
                { name: 'BG_Location2', required: true, isShow: true },
                { name: 'BG_Education_From-1', required: true, isShow: true },
                { name: 'BG_Education_To-1', required: true, isShow: true },

                { name: 'BG_School3', required: true, isShow: true },
                { name: 'BG_Type_School3', required: true, isShow: true },
                { name: 'BG_Location3', required: true, isShow: true },
                { name: 'BG_Education_From-2', required: true, isShow: true },
                { name: 'BG_Education_To-2', required: true, isShow: true },

                { name: 'BG_School4', required: true, isShow: true },
                { name: 'BG_Type_School4', required: true, isShow: true },
                { name: 'BG_Location4', required: true, isShow: true },
                { name: 'BG_Education_From-3', required: true, isShow: true },
                { name: 'BG_Education_To-3', required: true, isShow: true },
            ]
        }
    },
    {
        name: 'Información de su empleo durante los ultimos 5 años. El mas reciente PRIMERO',
        fields: {
            text: [
                { name: 'BG_Employment_Addres', required: true, isShow: false },
                { name: 'BG_Employment_Occupation', required: true, isShow: false },
                { name: 'BG_Employment_Date_From', required: true, isShow: false },
                { name: 'BG_Employment_Date_To', required: true, isShow: false },

                { name: 'BG_Employment_Addres1', required: true, isShow: true },
                { name: 'BG_Employment_Occupation1', required: true, isShow: true },
                { name: 'BG_Employment_Date_From1', required: true, isShow: true },
                { name: 'BG_Employment_Date_To1', required: true, isShow: true },

                { name: 'BG_Employment_Addres2', required: true, isShow: true },
                { name: 'BG_Employment_Occupation2', required: true, isShow: true },
                { name: 'BG_Employment_Date_From2', required: true, isShow: true },
                { name: 'BG_Employment_Date_To2', required: true, isShow: true },

            ]
        }
    },
    {
        name: "Información de sus padres y hermanos",
        fields: {
            text: [
                { name: 'Parents_Mother', required: true, isShow: false },
                { name: 'Parent_Mother_Address', required: true, isShow: false },
                { name: 'Parent_Mother_Current_Location', required: true, isShow: false },

                { name: 'Parents_Father', required: true, isShow: false },
                { name: 'Parent_Father_Address', required: true, isShow: false },
                { name: 'Parent_Father_Current_Location', required: true, isShow: false },

                { name: 'Sibling', required: true, isShow: false },
                { name: 'Sibling_Address', required: true, isShow: false },
                { name: 'Sibling_Current_Location', required: true, isShow: false },

                { name: 'Sibling1', required: true, isShow: true },
                { name: 'Sibling_Address1', required: true, isShow: true },
                { name: 'Sibling_Current_Location1', required: true, isShow: true },
                { name: 'Sibling2', required: true, isShow: true },
                { name: 'Sibling_Address2', required: true, isShow: true },
                { name: 'Sibling_Current_Location2', required: true, isShow: true },
                { name: 'Sibling3', required: true, isShow: true },
                { name: 'Sibling_Address3', required: true, isShow: true },
                { name: 'Sibling_Current_Location3', required: true, isShow: true },
            ],
            check: [
                { name: 'Parent_Mother_Deceased', required: true, isShow: true },
                { name: 'Parent_Father_Deceased', required: true, isShow: true },
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
            // textArea: [
            //     { name: 'Mistreatment_Explenation', required: true, isShow: false },
            // ],
        }
    },
    {
        name: '¿Usted, su familia, sus amigos cercanos o sus colegas han sufrido alguna vez daño, maltrato o amenazas en el pasado por parte de alguien?',
        fields: {
            textArea: [
                { name: 'Mistreatment_Explenation', required: true, isShow: false },

            ],
            radio: [
                {
                    "Mistreatment": ['Yes', 'No']
                }
            ]
        }
    },
    {
        name: '¿Teme sufrir daño o maltrato si regresa a su país de origen?',
        fields: {
            textArea: [
                { name: 'fear_mistreatment_Explanation', required: true, isShow: false },

            ],
            radio: [
                {
                    "fear_mistreatment": ['Yes', 'No']
                }
            ]
        }
    },
    {
        name: '¿Alguna vez usted o algún miembro de su familia ha sido acusado, imputado, arrestado, detenido, interrogado, condenado y sentenciado, o encarcelado en algúnpaís que no sea Estados Unidos (incluso por una violación de la ley de inmigración)?',
        fields: {
            textArea: [
                { name: 'Family_Crimes_Explanation', required: true, isShow: false },

            ],
            radio: [
                {
                    "Family_Crimes": ['Yes', 'No']
                }
            ]
        }
    },
    {
        name: '¿Usted o algún miembro de su familia alguna vez ha pertenecido o ha estado asociado con alguna organización o grupo en su país de origen, como, pero no limitado a, un partido político, grupo estudiantil, sindicato, organización religiosa, grupo militar o paramilitar, patrulla civil, organización guerrillera, grupo étnico, grupo de derechos humanos, o la prensa o medios de comunicación?',
        fields: {
            textArea: [
                { name: 'Family_Group_Link_Explanation', required: true, isShow: false },
            ],
            radio: [
                {
                    "Family_Group_Link": ['Yes', 'No']
                }
            ]
        }
    },
    {
        name: '¿Usted o sus familiares continúan participando de alguna manera en estas organizaciones o grupos?',
        fields: {
            textArea: [
                { name: 'Family_Group_Link_isActive_Explanation', required: true, isShow: false },
            ],
            radio: [
                {
                    "Family_Group_Link_isActive": ['Yes', 'No']
                }
            ]
        }
    },
    {
        name: 'Are you afraid of being subjected to torture in your home country or any other country to which you may be returned?',
        fields: {
            textArea: [
                { name: 'Afraid_of_Torture_Explanation', required: true, isShow: false },
            ],
            radio: [
                {
                    "Afraid_of_Torture": ['Yes', 'No']
                }
            ]
        }
    },
]
export const aplicantPart_C_I = [
    {
        name: '¿Usted, su cónyuge, sus hijos, sus padres o sus hermanos han solicitado alguna vez al Gobierno de los Estados Unidos el estatus de refugiado, asilo o la suspensión de deportación?',
        fields: {
            textArea: [
                { name: 'Family_Applied_asylum_Explanation', required: false, isShow: false }
            ],
            radio: [
                { 'Family_Applied_asylum': ['Yes', 'No'] }
            ]
        }
    },
    {
        name: 'Después de salir del país del cual solicita asilo, ¿usted o su cónyuge o hijo(s) que ahora están en los Estados Unidos viajaron o residieron en algún otro país antes de ingresar a los Estados Unidos?',
        fields: {
            textArea: [

                { name: 'Stay_and_Legal_Status_Other_Countries_Explanation', required: false, isShow: false }

            ],
            radio: [
                { 'Stay_Other_Countries': ['Yes', 'No'] },
                { 'Legal_Status_Other_Coutries': ['Yes', 'No'] }
            ]
        }
    },
    {
        name: '¿Usted, su cónyuge o sus hijos alguna vez han ordenado, incitado, ayudado o participado de otro modo en causar daño o sufrimiento a alguna persona debido a su raza, religión, nacionalidad, pertenencia a un grupo social particular o creencia en una opinión política particular?',
        fields: {
            textArea: [

                { name: 'Discriminatory_Actions_Against_Others_Explanation', required: false, isShow: false }

            ],
            radio: [
                { 'Discriminatory_Actions_Against_Others': ['Yes', 'No'] },
            ]
        }
    },
    {
        name: 'Después de salir del país donde sufrió daño o teme sufrir daño, ¿regresó a ese país?',
        fields: {
            textArea: [

                { name: 'Return_Country__you_Fear_Explanation', required: false, isShow: false }

            ],
            radio: [
                { 'Return_Country__you_Fear': ['Yes', 'No'] },
            ]
        }
    },
    {
        name: '¿Está presentando esta solicitud más de 1 año después de su última llegada a los Estados Unidos?',
        fields: {
            textArea: [

                { name: 'Expire_Time_Asaylum_Applicat_Explanation', required: false, isShow: false }

            ],
            radio: [
                { 'Expire_Time_Asaylum_Applicat': ['Yes', 'No'] },
            ]
        }
    },
    {
        name: '¿Usted o algún miembro de su familia incluido en la solicitud ha cometido alguna vez algún delito y/o ha sido arrestado, acusado, condenado o sentenciado por algún delito en los Estados Unidos (incluso por una violación de la ley de inmigración)?',
        fields: {
            textArea: [

                { name: 'Crimes_In_USA_Explanation', required: false, isShow: false }

            ],
            radio: [
                { 'Crimes_In_USA': ['Yes', 'No'] },
            ]
        }
    },
]