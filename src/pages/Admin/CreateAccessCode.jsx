import { Header } from "../../components/Shared/Header"
import { query, collection, getDocs, where, addDoc } from "@firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export function CreateAccessCode() {
    const [code, setCode] = useState(null)
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
        // Verificar si el ID ya existe
        // unique = querySnapshot.empty; // Si no hay resultados, es único
        return newId;
    };

    return (
        <>

            <div className="adminDashboard">
                <section>
                    <Header title='Create Access Code' />
                </section>
                <section className="">
                    {code ? '' : <Button onClick={generateUniqueId}>Crear Codigo</Button>}
                    <br />
                    {code && (
                        <div>
                            <span className='h3'>codigo generado {code} </span>
                        </div>
                    )}
                </section>
                {/* <section className="footer">Footer</section> */}
            </div>
        </>
    )
}
