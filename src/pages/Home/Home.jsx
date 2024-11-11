import { Forms } from "../../components/Forms/Forms"
import './../../assets/styles/main.css'
import i589 from './../../assets/PDF/i-589.pdf'

import { PDFDocument, PDFTextField } from 'pdf-lib'
import { useEffect, useState } from "react"
import json from './../../services/initialFormValues.json'
export function Home() {
    const [pdf, setPdf] = useState([])
    const [formData, setFormData] = useState(json)


    const handleHelp = () => {
        alert('Este es un Ejemplo para mostrar mensajes de ayuda')
    }
    const handleSubmitEvent = (e) => {
        e.preventDefault()
        console.log(formData)
        getPDF()
        // console.log(formData.Applicant.PDFTextField2)

    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        let newValue;

        if (type === 'radio') {
            newValue = value
            setFormData((prevFormData) => ({
                ...prevFormData,
                Applicant: {
                    ...prevFormData.Applicant,
                    PDFRadioGroup2: {
                        ...prevFormData.Applicant.PDFRadioGroup2,
                        [name]: newValue
                    }
                }
            }))
        } else if (type === 'checkbox') {
            newValue = value
            newValue = checked;
            setFormData((prevFormData) => ({
                ...prevFormData,
                Applicant: {
                    ...prevFormData.Applicant,
                    PDFCheckBox2: {
                        ...prevFormData.Applicant.PDFCheckBox2,
                        [name]: newValue,
                    },
                },
            }));
        } else {
            newValue = value;
            setFormData((prevFormData) => ({
                ...prevFormData,
                Applicant: {
                    ...prevFormData.Applicant,
                    PDFTextField2: {
                        ...prevFormData.Applicant.PDFTextField2,
                        [name]: newValue,
                    },
                },
            }));
        }
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
        a.click()
        a.remove()
        setPdf(a)
    }

    const getPDF = async () => {
        const formURL = i589
        const formPDFBytes = await fetch(formURL).then((res) => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(formPDFBytes, { ignoreEncryption: true })

        const form = pdfDoc.getForm()



        const fieldsToUpdateTextField = formData.Applicant.PDFTextField2
        Object.keys(fieldsToUpdateTextField).forEach((key) => {
            const field = form.getTextField(key)
            if (field) {
                field.setText(fieldsToUpdateTextField[key])
            }
        })

        const fieldsToUpdateRadioGroup = formData.Applicant.PDFRadioGroup2
        Object.keys(fieldsToUpdateRadioGroup).forEach((key) => {
            const radioGroup = form.getRadioGroup(key)
            if (radioGroup) {
                const value = fieldsToUpdateRadioGroup[key]
                if (value) {
                    radioGroup.select(value)
                }
            }
        })

        const fieldsToUpdateCheckBox = formData.Applicant.PDFCheckBox2
        Object.keys(fieldsToUpdateCheckBox).forEach((key) => {
            const checkbox = form.getCheckBox(key)
            if (checkbox) {
                const isChecked = fieldsToUpdateCheckBox[key]
                if (isChecked) {
                    checkbox.check()
                } else {
                    checkbox.uncheck()
                }
            }
        })
        const pdfBytes = await pdfDoc.save()
        downloadBlob(pdfBytes, 'output.pdf', 'application/pdf')
    }

    return (
        <>
            <Forms />
            {/* <div>
                <form>
                    <span className="h4">Información Personal</span>
                    <br />
                    <div>
                        <label htmlFor="Alien_Number">Numero A </label>
                        <a title="Hi, I'm a help text" onClick={handleHelp} >
                            <img src="https://shots.jotform.com/kade/Screenshots/blue_question_mark.png" height="13px" />
                        </a>
                        <br />
                        A<input onChange={handleChange} type="number" id="Alien_Number" name="Alien_Number" />
                        <br />
                        <label htmlFor="SSN">Numero de Seguro Social (Si lo tiene)</label>
                        <br />
                        <input onChange={handleChange} type="number" name="SSN" id="SSN" />
                    </div>
                    <hr />
                    <div>
                        <label htmlFor="Complete_Last_Name">Complete Last Name</label>
                        <br />
                        <input onChange={handleChange} type="text" name="Complete_Last_Name" id="Complete_Last_Name" />
                        <br />
                        <label htmlFor="First_Name">First Name</label>
                        <br />
                        <input onChange={handleChange} type="text" name="First_Name" id="First_Name" value={formData.Applicant.PDFTextField2.First_Name} />
                        <br />
                        <label htmlFor="Middle_Name">MiddleName</label>
                        <br />
                        <input onChange={handleChange} type="text" name="Middle_Name" id="Middle_Name" />

                    </div>
                    <div>
                        <label className="h5" htmlFor="Gender">Gender: </label>
                        <br />
                        <input onChange={handleChange} type="radio" name="Gender" id="Male" />
                        <label htmlFor="Male">Male</label>

                        <input onChange={handleChange} type="radio" name="Gender" id="Female" />
                        <label htmlFor="Female">Female</label>

                    </div>
                    <div>
                        <label className="h5" htmlFor="Marital_Status">Estado Civil</label>
                        <br />
                        <input onChange={handleChange} type="radio" name="Marital_Status" id="Single" />
                        <label htmlFor="Single">Single</label>

                        <input onChange={handleChange} type="radio" name="Marital_Status" id="Married" />
                        <label htmlFor="Married">Married</label>

                        <input onChange={handleChange} type="radio" name="Marital_Status" id="Divorced" />
                        <label htmlFor="Divorced">Divorced</label>

                        <input onChange={handleChange} type="radio" name="Marital_Status" id="Widowed" />
                        <label htmlFor="Widowed">Widowed</label>
                    </div>
                    <button onClick={handleSubmitEvent}>submit</button>
                </form>
            </div> */}

            <div>
                <form>
                    <span className="h4">Información Personal</span>
                    <br />
                    <div>
                        <label htmlFor="Alien_Number">Numero A </label>
                        <a title="Hi, I'm a help text" href="#" >
                            <img src="https://shots.jotform.com/kade/Screenshots/blue_question_mark.png" height="13px" />
                        </a>
                        <br />
                        <input
                            onChange={handleChange}
                            type="number"
                            id="Alien_Number"
                            name="Alien_Number"
                        />
                        <br />
                        <label htmlFor="SSN">Numero de Seguro Social (Si lo tiene)</label>
                        <br />
                        <input
                            onChange={handleChange}
                            type="number"
                            name="SSN"
                            id="SSN"
                        />
                    </div>
                    <hr />
                    <div>
                        <label htmlFor="Complete_Last_Name">Complete Last Name</label>
                        <br />
                        <input
                            onChange={handleChange}
                            type="text"
                            name="Complete_Last_Name"
                            id="Complete_Last_Name"
                        />
                        <br />
                        <label htmlFor="First_Name">First Name</label>
                        <br />
                        <input
                            onChange={handleChange}
                            type="text"
                            name="First_Name"
                            id="First_Name"
                        />
                        <br />
                        <label htmlFor="Middle_Name">Middle Name</label>
                        <br />
                        <input
                            onChange={handleChange}
                            type="text"
                            name="Middle_Name"
                            id="Middle_Name"
                        />
                    </div>
                    <div>
                        <label className="h5" htmlFor="Gender">Gender: </label>
                        <br />
                        <input
                            onChange={handleChange}
                            type="radio"
                            name="Gender"
                            id="Male"
                            value="Male"
                        />
                        <label htmlFor="Male">Male</label>

                        <input
                            onChange={handleChange}
                            type="radio"
                            name="Gender"
                            id="Female"
                            value="Female"
                        />
                        <label htmlFor="Female">Female</label>
                    </div>
                    <div>
                        <label className="h5" htmlFor="Marital_Status">Estado Civil</label>
                        <br />
                        <input
                            onChange={handleChange}
                            type="radio"
                            name="Marital_Status"
                            id="Single"
                            value="Single"
                        />
                        <label htmlFor="Single">Single</label>

                        <input
                            onChange={handleChange}
                            type="radio"
                            name="Marital_Status"
                            id="Married"
                            value="Married"
                        />
                        <label htmlFor="Married">Married</label>

                        <input
                            onChange={handleChange}
                            type="radio"
                            name="Marital_Status"
                            id="Divorced"
                            value="Divorced"
                        />
                        <label htmlFor="Divorced">Divorced</label>

                        <input
                            onChange={handleChange}
                            type="radio"
                            name="Marital_Status"
                            id="Widowed"
                            value="Widowed"
                        />
                        <label htmlFor="Widowed">Widowed</label>
                    </div>
                    <div>
                        <span className="h6">
                            Check the box, a through c, that applies:
                        </span>
                        <br />
                        <label htmlFor="dieciocho">a. I have never been in Immigration Court proceedings.</label>
                        <input onChange={handleChange} type="checkbox" name="dieciocho" id="dieciocho" />
                        <br />
                        <label htmlFor="dieciocho_2">
                            b. I am now in Immigration Court proceedings.
                        </label>
                        <input onChange={handleChange} type="checkbox" name="dieciocho_2" id="dieciocho_2" />
                        <br />
                        <label htmlFor="dieciocho_3">
                            c. I am not now in Immigration Court proceedings, but I have been in the past.
                        </label>
                        <input onChange={handleChange} type="checkbox" name="dieciocho_3" id="dieciocho_3" />
                    </div>
                    <button onClick={handleSubmitEvent}>Download PDF</button>
                </form>
            </div>
            <hr />
            <a href={pdf} target="_blank" rel="noopener noreferrer">
                Ver PDF
            </a>
            <div>
                <object data={pdf} type="application/pdf" width='100%' height='800vh'></object>
            </div>
        </>
    )
}

