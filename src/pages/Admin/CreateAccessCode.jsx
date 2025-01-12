import { Header } from "../../components/Shared/Header"
import { query, collection, getDocs, where, addDoc } from "@firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function CreateAccessCode() {
    const [code, setCode] = useState(null)
    const [accessCodeData, setAccessCodeData] = useState([])
    const generateUniqueId = async () => {
        let unique = false;
        let newId;

        try {
            while (!unique) {
                newId = Math.floor(1000 + Math.random() * 9000); // Generar un número de 6 dígitos
                const q = query(collection(db, "accessCode"), where('code', '==', newId));
                const querySnapshot = await getDocs(q);
                unique = querySnapshot.empty;
            }

            await addDoc(collection(db, 'accessCode'), {
                code: newId,
                status: 'created',
                createdAt: new Date().toISOString()
            })
            console.log(newId)
            setCode(newId)

        } catch (error) {
            console.log(error)
        }
        return newId;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'accessCode'))
                const accessCodeData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setAccessCodeData(accessCodeData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [db])

    return (
        <>

            <div className="adminDashboard">
                <section>
                    <Header title='Create Access Code' />
                </section>
                <section className="">
                    <Button onClick={generateUniqueId}>Crear Codigo</Button>
                    <br />
                    {code && (
                        <div>
                            <span className='h3'>codigo generado {code} </span>
                        </div>
                    )}
                </section>
                <section className="accessCodeList">
                    <span className="h4">Lista de codigos disponibles</span>
                    <ul>
                        {accessCodeData.map(item => {
                            return (
                                <li key={item.id} className="accessCodeItem">
                                    <span className="h4"><strong>{item.code}</strong></span>&nbsp;|&nbsp;
                                    <span className="h6">Creado el: <strong>{item.createdAt}</strong></span>
                                </li>
                            )
                        })}
                    </ul>
                </section>
                {/* <section className="footer">Footer</section> */}
            </div>
        </>
    )
}
