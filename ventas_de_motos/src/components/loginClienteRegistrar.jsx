import { useState } from "react";
import axios from 'axios';
import { useAuth } from "../contexts/AuthContexEmpleado";

//registrar un cliente (Vista)

export const LoginClienteRegistrar = () => {

    const [mensaje, setMensaje] = useState("");
    const { loginClientesRegistrar } = useAuth();


    const handleRegister = (e) => {
        e.preventDefault();
        registrar(e);
    };

    const registrar = async (e) => {
        e.preventDefault();
        //capturar los datos del formulario
        const form = e.target;
        const nombre = form.name.value;
        const telefono = form.regtelefono.value;
        const correo = form.regEmail.value;
        const contraseña = form.regPassword.value;

        try {
            //con axios
            const response = await axios.post('http://localhost:3001/api/clientes/registrarClientes', { nombre, telefono, correo, contraseña });

            const { message, clientes, token } = response.data;
            alert(message); // "Bienvenido"
            console.log('Clientes:', clientes);
            console.log('Token:', token);
            loginClientesRegistrar(clientes, token);

        } catch (error) {

            if (error.response) {
                // Error desde el servidor con status 4xx o 5xx
                alert(error.response.data.message);
            } else if (error.request) {
                // La petición se hizo pero no hubo respuesta
                console.error('No hubo respuesta del servidor');
            } else {
                // Fallo al construir la petición
                console.error('Error desconocido:', error.message);
            }
        }
    }

    return (
        <section className="bg-gray-950 min-h-screen flex items-center justify-center px-4 pt-28"> <div className="bg-gray-900 rounded-2xl shadow-[0_8px_20px_rgba(255,255,0,0.1)] p-10 w-full max-w-md text-white relative"> 
        {/* Logo */} <div className="absolute -top-14 left-1/2 transform -translate-x-1/2"> <img src="/logo_moto.png" alt="Logo" className="w-24 h-24 object-contain rounded-full bg-gray-800 border-4 border-yellow-400 shadow-md" /> </div>


            {/* Título */}
            < h2 className="text-2xl font-bold text-center mt-16 mb-2 text-yellow-400 tracking-wide" >
                Crear Cuenta
            </h2 >
            <p className="text-center text-sm text-gray-300 mb-6">
                ¡Es rápido y fácil!
            </p>

            {/* Formulario */}
            <form onSubmit={handleRegister} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
                        Nombre completo
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="regtelefono" className="block text-sm text-gray-300 mb-1">
                        Teléfono
                    </label>
                    <input
                        id="regtelefono"
                        type="tel"
                        placeholder="Ej: 301456..."
                        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="regEmail" className="block text-sm text-gray-300 mb-1">
                        Correo electrónico
                    </label>
                    <input
                        id="regEmail"
                        type="email"
                        placeholder="example@correo.com"
                        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="regPassword" className="block text-sm text-gray-300 mb-1">
                        Contraseña
                    </label>
                    <input
                        id="regPassword"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                    />
                </div>

                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition duration-200 shadow-md hover:shadow-yellow-500/40"
                    >
                        Registrarse
                    </button>
                </div>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-400 mt-6">
                ¿Ya tienes una cuenta?{" "}
                <a href="/loginClientes" className="text-yellow-400 hover:underline">Inicia sesión</a>
            </p>
        </div>

        </section>
    )

}
