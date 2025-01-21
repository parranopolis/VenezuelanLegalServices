import { Link } from 'react-router-dom'
import { EditDocument } from '../Edit Document/EditDocument'
import './../../assets/styles/main.css'
import { handleLogout } from '../../utils/firebaseUtils'
import './Shared.css'
import { Header, HomeHeader } from '../../components/Shared/Header'
import { Button } from '@chakra-ui/react'

export function HomePage() {
    // handleLogout()

    // const menuToggle = document.querySelector('.menu-toggle');
    // const navLinks = document.querySelector('.nav-links');

    // menuToggle.addEventListener('click', () => {
    //     navLinks.classList.toggle('active');
    // });

    const onProcess = () => {
        alert('Lo siento, esta ruta no esta disponible en estos momentos')
    }

    return (
        <>
            <section className=''>
                <HomeHeader />
                {/* <EditDocument /> */}
            </section>
            <article className='mainPage'>
                <section className="needHelp shadow">
                    <h1 className=''>¿Necesitas Ayuda con tu Proceso Migratorio?</h1>
                    <Button onClick={onProcess}>Habla con Nosotros</Button>
                </section>

                <section className='actions'>
                    <div>
                        <h4>Acciones con Documentoss</h4>
                    </div>
                    <div>
                        <Button><Link to={'/accesCode'}>Crear</Link></Button>
                        <Button onClick={onProcess}>Actualizar</Button>
                        <Button onClick={onProcess}>Copia</Button>
                    </div>
                </section>

                <section className="fillForm shadow">
                    <h3>Llena tu formulario de forma fácil y asistida.</h3>
                    <Button onClick={onProcess}>Pregunta Cómo</Button>
                </section>

                <footer className='shadow'>
                    <p>¿Con qué podemos ayudarte?</p>
                    <div className="help-options">
                        <a href="#">Asilos Políticos</a>
                        <a href="#">TPS</a>
                        <a href="#">Permiso de Trabajo</a>
                    </div>
                </footer>
            </article>
        </>
    )
}