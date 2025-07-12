import axios from "axios";
import { useAuth } from "../contexts/AuthContexEmpleado";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export const LoginEmpleadosRegistrar = () => {

    const [mensaje, setMensaje] = useState("");
    const { loginEmpleadosRegistre } = useAuth();



    const handleRegister = (e) => {
        e.preventDefault();
        registrar(e);
    };

    const navigate = useNavigate();

    const registrar = async (e) => {
        e.preventDefault();
        //capturar los datos del formulario
        const form = e.target;
        const nombre = form.nombre.value;
        const cargo = form.cargo.value;
        const telefono = form.telefono.value;
        const correo = form.correo.value;
        const contraseña = form.contraseña.value;

        try {
            //con axios
            const response = await axios.post('http://localhost:3001/api/empleados/registrarEmpleados', { nombre, cargo, telefono, correo, contraseña });

            const { message, empleados, token } = response.data;
            alert(message); // "Bienvenido"
            console.log('Empleados:', empleados);
            console.log('Token:', token);
            loginEmpleadosRegistre(empleados, token);

            // Redireccionar al login
            navigate("/loginEmpleados");

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
            <div className="bg-gray-900 rounded-2xl shadow-[0_8px_20px_rgba(0,255,255,0.1)] p-10 w-full max-w-md text-white relative">

                {/* Logo */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <img src="/logo_moto.png" alt="Logo" className="w-24 h-24 object-contain rounded-full bg-gray-800 border-4 border-cyan-400 shadow-md" />
                </div>

                {/* Título */}
                <h2 className="text-2xl font-bold text-center mt-16 mb-2 text-cyan-400 tracking-wide">
                    Registrar Empleado
                </h2>
                <p className="text-sm text-gray-400 text-center mb-6">
                    Crea una cuenta para acceder al panel administrativo de RideOnMotorCycle
                </p>

                {/* Formulario */}
                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label htmlFor="nombre" className="block text-sm text-gray-300 mb-1">Nombre completo</label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            placeholder="Digite el nombre"
                            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="cargo" className="block text-sm text-gray-300 mb-1">Cargo</label>
                        <input
                            id="cargo"
                            name="cargo"
                            type="text"
                            placeholder="Digite el cargo"
                            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="telefono" className="block text-sm text-gray-300 mb-1">Teléfono</label>
                        <input
                            id="telefono"
                            name="telefono"
                            type="tel"
                            placeholder="3012345..."
                            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="correo" className="block text-sm text-gray-300 mb-1">Correo</label>
                        <input
                            id="correo"
                            name="correo"
                            type="email"
                            placeholder="empleado@rideon.com"
                            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Contraseña</label>
                        <input
                            id="contraseña"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="w-full py-2 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition duration-200 shadow-md hover:shadow-cyan-500/40"
                        >
                            Registrar Empleado
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6 italic">
                    Ya tienes una cuenta?{" "}
                    <a href="/loginEmpleados" className="text-yellow-400 hover:underline">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </section>


    )
}