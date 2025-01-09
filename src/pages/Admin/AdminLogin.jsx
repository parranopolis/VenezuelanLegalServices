import { AdminDashBoard } from "./AdminDashBoard"

import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
export function AdminLogin() {
    // cuando se haga el login hay que ir a AdminDashBoard
    // en el proceso se validara si el usuario es administrador 


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos
        setLoading(true); // Activar estado de carga

        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // console.log("Usuario autenticado:", user);
            // Redirigir a la página principal o dashboard
            navigate('/dashboard')
        } catch (error) {
            const errorCode = error.code;

            // Manejar errores comunes de Firebase
            switch (errorCode) {
                case "auth/user-not-found":
                    setError("El usuario no existe. Por favor, verifica tu correo electrónico.");
                    break;
                case "auth/wrong-password":
                    setError("Contraseña incorrecta. Intenta nuevamente.");
                    break;
                case "auth/too-many-requests":
                    setError("Demasiados intentos fallidos. Intenta más tarde.");
                    break;
                case "auth/invalid-email":
                    setError("El correo electrónico no es válido.");
                    break;
                default:
                    setError("Error al iniciar sesión. Intenta nuevamente.");
            }

            console.error("Error al iniciar sesión:", error);
        } finally {
            setLoading(false); // Desactivar estado de carga
        }
    };
    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem", textAlign: "center" }}>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo"
                        required
                        style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                        style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
                    />
                </div>
                {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: loading ? "#ccc" : "#007bff",
                        color: "#fff",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
            </form>
            <br />
            <Link to={'/'}>Volver al inicio</Link>
        </div>
    );
};

