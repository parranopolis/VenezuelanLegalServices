import { useEffect, useState } from "react"
import { Input } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { getDocs, query, collection, where } from 'firebase/firestore'
import { db } from "../../firebase/firebase-config"
import { Button } from "@chakra-ui/react"
import { CreateAccessCode } from "../../pages/Admin/CreateAccessCode"
import './Admin.css'
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
                    <br />
                    <Field label={<span className="h4">Busca un documento</span>}>
                        <Input placeholder="Usa el código de 4 digitos"></Input>
                    </Field>
                </article>
                {/* <article>
                    filters
                </article> */}
            </section>
            <section>
                <div className="itemTitle">
                    <span className="h4">Lista de documentos</span>
                </div>
                <div className="itemList">
                    <ul>
                        {cases.map(item => {
                            return (<li key={item.id}>
                                <section className="liBox1">
                                    <div className="status">
                                        <span className="h6">{item.status}</span>
                                    </div>
                                    <div className="names">
                                        <span className="h4">
                                            {item.jsonData.Applicant.PDFTextField2.First_Name.value}&nbsp;
                                        </span>
                                        <span className="h4">
                                            {item.jsonData.Applicant.PDFTextField2.Complete_Last_Name.value}
                                        </span>
                                    </div>
                                    <div className="dbId">
                                        <span className="clave h5">Clave: {item.numericId} </span>
                                    </div>
                                </section>
                                <section className="liBox2">
                                    <div>
                                        <span className="h6">
                                            id: {item.id}
                                        </span>
                                    </div>
                                    <div className="liBox2-Buttons">
                                        <Button>Ver</Button>
                                        <Button>Borrar</Button>
                                    </div>

                                </section>
                            </li>)
                        })}
                    </ul>
                </div>
            </section>
        </>
    )
}