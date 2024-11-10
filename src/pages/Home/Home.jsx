import { Forms } from "../../components/Forms/Forms"
import './../../assets/styles/main.css'
import i589 from './../../assets/PDF/i-589.pdf'

import { PDFDocument, PDFTextField } from 'pdf-lib'
import { useEffect, useState } from "react"

export function Home() {
    const [pdf, setPdf] = useState([])

    useEffect(() => {

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
            // a.style = 'display:none'
            // a.click()
            a.remove()
            setPdf(a)
        }


        const getPDF = async () => {
            const formURL = i589
            const formPDFBytes = await fetch(formURL).then((res) => res.arrayBuffer())

            const pdfDoc = await PDFDocument.load(formPDFBytes, { ignoreEncryption: true })

            const form = pdfDoc.getForm()
            const fields = form.getFields()

            form.getRadioGroup('Gender').select('Female')
            form.getRadioGroup('Marital_Status').select('Single')
            form.getCheckBox('dieciocho').check()
            form.getCheckBox('dieciocho_2').check()
            form.getCheckBox('dieciocho_3').check()

            // fields.forEach((field) => {
            //     const type = field.constructor.name
            //     const name = field.getName()
            //     console.log(`${type} | ${name}`)
            // })
            // console.log('-------------- --------------')
            const pdfBytes = await pdfDoc.save()
            downloadBlob(pdfBytes, 'output.pdf', 'application/pdf')
        }
        getPDF()
    }, [])
    return (
        <>
            <Forms />
            <object data={pdf} type="application/pdf" width='100%' height='800vh'>
            </object>
        </>
    )
}

