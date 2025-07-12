import { useAuth } from "../contexts/AuthContexEmpleado"
import { useNavigate } from "react-router-dom";

//empleado
export const NavBar = () => {
    const { empleados, logoutEmpleados } = useAuth();

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between bg-black p-4 shadow-[0_4px_5px_rgba(0,0,0,0.5)] rounded-b-2xl fixed top-0 w-full z-50">
                <img className="w-20 h-20 object-contain" src="/logo_moto.png" alt="logo" />
                <h1 className="text-white text-xl font-semibold text-center pl-60 flex-1">RideOnMotorCycle</h1>
                <div className="flex items-center gap-4">
                    <span className="text-white">Bienvenido, <strong className="text-yellow-400">{empleados.nombre.toUpperCase()}</strong></span>
                    <img src="/empleado_logo.png" alt="Profile" className="w-10 h-10 object-cover" />
                    <div className="flex items-center justify-center w-30 h-8 bg-yellow-500 text-white rounded-2xl font-bold shadow-[0_4px_5px_rgba(0,0,0,0.5)] hover:text-yellow-500 hover:bg-white border-2 border-white">
                        <button
                            onClick={logoutEmpleados}
                            className="w-full h-full text-xs font-semibold focus:outline-none cursor-pointer">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


//Cliente

export const NavBarCliente = () => {
    const { clientes, logoutClientes } = useAuth();

    return (
        <div className="fixed top-0 w-full z-50 bg-black shadow-[0_4px_5px_rgba(0,0,0,0.5)] rounded-b-2xl">
            <div className="flex items-center justify-between p-4">
                <img className="w-16 h-16 object-contain" src="/logo_moto.png" alt="logo" />

                <h1 className="text-white text-xl font-bold text-center flex-1 pl-20">RideOnMotorCycle</h1>

                <div className="flex items-center gap-4">
                    <span className="text-white text-sm">
                        Bienvenido, <strong className="text-yellow-400">{clientes.nombre.toUpperCase()}</strong>
                    </span>
                    <img src="/empleado_logo.png" alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                    <button
                        onClick={logoutClientes}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-2xl font-semibold text-xs border-2 border-white hover:bg-white hover:text-yellow-500 transition">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export const NavBarDefault = () => {
    const navigate = useNavigate();

    const loginCliente = () => navigate("/loginClientes");
    const loginClienteRegistrar = () => navigate("/loginClienteRegistrar")

    return (
        <header className="fixed top-0 w-full z-50 bg-black shadow-[0_4px_5px_rgba(0,0,0,0.5)] rounded-b-2xl">
            <div className="flex items-center justify-between p-4">
                {/* Logo */}
                <img className="w-16 h-16 object-contain" src="/logo_moto.png" alt="logo" />

                {/* Título centrado */}
                <h1 className="text-white text-xl font-bold text-center flex-1 pl-20">RideOnMotorCycle</h1>

                {/* Acciones del usuario */}

                <div className="flex items-center gap-3">
                    <button
                        onClick={loginClienteRegistrar}
                        className="px-4 py-2 bg-gray-800 border border-white rounded hover:bg-yellow-400 text-yellow-400 hover:text-black text-sm font-medium transition">

                        Crea tu cuenta
                    </button>
                    <button
                        onClick={loginCliente}
                        className="px-4 py-2 bg-gray-800 border border-white rounded hover:bg-yellow-400 text-yellow-400 hover:text-black text-sm font-medium transition"
                    >
                        Iniciar sesión
                    </button>
                </div>

            </div>
        </header>
    )
}
