import { Link } from 'react-router-dom'
import { EditDocument } from '../Edit Document/EditDocument'
import './../../assets/styles/main.css'
import { handleLogout } from '../../utils/firebaseUtils'

export function HomePage() {
    // handleLogout()
    return (
        <>
            <section className='test'>
                <span className='h1'>Home Page</span>

                {/* <EditDocument /> */}
            </section>
            <section>
                <article>
                    <div>
                        <Link to={'/adminlogin'}>
                            <span className='h4'>Soy Administrador</span>
                        </Link>

                    </div>
                    <div>
                        <Link to='/accesCode'>
                            <span className='h4'>Soy Usuario</span>
                        </Link>

                    </div>
                </article>
            </section>
        </>
    )
}

