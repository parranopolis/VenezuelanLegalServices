import { useEffect, useState } from "react"
import { Input } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { getDocs, query, collection, where } from 'firebase/firestore'
import { db } from "../../firebase/firebase-config"
import { Button } from "@chakra-ui/react"
import { CreateAccessCode } from "../../pages/Admin/CreateAccessCode"

export function AdminMainData() {

    const [cases, setCases] = useState([])
    // const dicRef = doc(db, 'cases')
    useEffect(() => {

        const fetchData = async () => {
            try {

                const querySnapshot = await getDocs(collection(db, 'cases'))
                const casesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setCases(casesData)
            } catch (error) {
                console.log(error)
            }

        }
        fetchData()
    }, [db])

    return (
        <>
            <section>
                <article>
                    <Field label={<span className="h4">Busca un documento</span>}>
                        <Input placeholder="23123"></Input>
                    </Field>
                </article>
                <article>
                    filters
                </article>
            </section>
            <section>
                <span className="h4">Lista de documentos</span>
                <ul>
                    {cases.map(item => {
                        return (<li key={item.id}>
                            <strong>ID:</strong> {item.id} <br />
                            <strong>Clave:</strong> {item.numericId} <br />
                            <strong>Status:</strong> {item.status} <br />
                            <strong>Name:</strong> {item.jsonData.Applicant.PDFTextField2.First_Name.value} <br />
                            <strong>Name:</strong> {item.jsonData.Applicant.PDFTextField2.Complete_Last_Name.value}
                            <br />
                            <Button>Ver</Button>
                            <Button>Borrar</Button>

                        </li>)
                    })}
                </ul>
            </section>
        </>
    )
}