import { Link } from 'react-router-dom'
import { EditDocument } from '../Edit Document/EditDocument'
import './../../assets/styles/main.css'
import { handleLogout } from '../../utils/firebaseUtils'
import './Shared.css'
import { Header } from '../../components/Shared/Header'

export function HomePage() {
    // handleLogout()
    return (
        <>
            <section className='test'>
                {/* <span className='h1'>Home Page</span> */}
                <Header title='Bienvenido' />

                {/* <EditDocument /> */}
            </section>
            <section className='container'>
                <article>
                    <div>
                        <Link to={'/adminlogin'}>
                            <span className='h4'>Iniciar Sesion</span>
                        </Link>
                    </div>
                    <div>
                        <Link to='/form'>
                            <span className='h4'>Crear Documentos</span>
                        </Link>
                    </div>
                </article>
            </section>
        </>
    )
}

