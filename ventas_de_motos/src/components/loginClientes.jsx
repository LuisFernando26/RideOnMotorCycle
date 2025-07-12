import { useState } from "react";
import axios from 'axios';
import { useAuth } from "../contexts/AuthContexEmpleado";

export const LoginClientesIniciarSesion = () => {

    const [mensaje, setMensaje] = useState("");
    const { loginClientes } = useAuth();

    const handleSumbit = (e) => {
        e.preventDefault();
        iniciarSesion(e);
    };


    const iniciarSesion = async (e) => {
        e.preventDefault();
        //capturar los datos del formulario
        const form = e.target;
        const correo = form.email.value;
        const contraseña = form.password.value;

        try {
            //con axios
            const response = await axios.post('http://localhost:3001/api/clientes/validarClientes', { correo, contraseña });

            const { message, cliente, token } = response.data;
            console.log(message); // "Bienvenido"
            console.log('Cliente:', cliente);
            setMensaje(cliente);
            console.log('Token:', token);
            loginClientes(cliente, token);

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

        <section className="bg-gray-950 min-h-screen flex items-center justify-center px-4 pt-28">
            <div className="bg-gray-900 rounded-2xl shadow-[0_8px_20px_rgba(255,255,0,0.1)] p-10 w-full max-w-md text-white relative">
                {/* Logo */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <img src="/logo_moto.png" alt="Logo" className="w-24 h-24 object-contain rounded-full bg-gray-800 border-4 border-yellow-400 shadow-md" />
                </div>

                {/* Título */}
                <h2 className="text-2xl font-bold text-center mt-16 mb-6 text-yellow-400 tracking-wide">
                    Iniciar Sesión
                </h2>

                {/* Formulario */}
                <form onSubmit={handleSumbit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@correo.com"
                            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
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
                            Iniciar Sesión
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    ¿No tienes una cuenta?{" "}
                    <a href="/loginClienteRegistrar" className="text-yellow-400 hover:underline">Regístrate</a>
                </p>
            </div>
        </section>

    )
}



