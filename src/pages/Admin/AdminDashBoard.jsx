import { Button } from "@chakra-ui/react";
import { handleLogout } from "../../utils/firebaseUtils";
import { auth } from "../../firebase/firebase-config";
import { getAuth, signOut } from 'firebase/auth'
import { AdminMainData } from "../../components/Admin/AdminMainData";
import { AdminOptionSide } from "../../components/Admin/AdminOptioSide";
import { CreateAccessCode } from "./CreateAccessCode";
import './Admin.css'
import { useState } from "react";
import { Header } from "../../components/Shared/Header";
export function AdminDashBoard() {


    const [selectedPage, setSelectedPage] = useState("default")

    const handlePageChange = (page) => {
        setSelectedPage(page)
    }

    return (
        <>
            <div className="adminDashboard">
                <Header title='Admin Dashboard' />
                <section className="content">
                    <article className="blackLine">
                        <AdminOptionSide onPageChange={handlePageChange} />
                    </article>
                    <article className="blackLine">
                        <ActualPage page={selectedPage} />
                    </article>
                </section>
                <section className="footer">Footer</section>
            </div>
        </>
    )
}


export function ActualPage({ page }) {

    const renderContent = () => {
        switch (page) {
            case 'CreateAccesCode':
                return <CreateAccessCode />
            default:
                return <AdminMainData />
        }
    }
    return renderContent()
}