import { Button } from "@chakra-ui/react"
import { Link, Navigate } from "react-router-dom"
import { EditDocument } from "../Edit Document/EditDocument"
export function UserFormPage() {

    const goToNewDocPage = () => {
        console.log('asdasd')
        // return <Navigate to='/' />
    }

    return (
        <>
            <span className="h1">User Form Page</span>
            <div>
                <Link to={'/'}> <button onClick={goToNewDocPage}>Create a New PDF</button></Link>


            </div>
            <div>
                <Button>Update</Button>

            </div>
            <div>
                <Button>Get a Copy</Button>

            </div>
        </>
    )
}