import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContexEmpleado";

export const VistaBienvenida = () => {
    const navigate = useNavigate();
    const [motos, setMotos] = useState([]);
    const [filtroModelo, setFiltroModelo] = useState("Todos");
    const [filtroMarca, setFiltroMarca] = useState("Todos");
    const [filtroCilindraje, setFiltroCilindraje] = useState("Todos");
    const { clientes } = useAuth();



    useEffect(() => {
        axios.get("http://localhost:3001/api/motos/obtenerMotos")
            .then((res) => {
                setMotos(res.data);
                console.log(res.data);
                //setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener las motos:", err);
                //setLoading(false);
            });
    }, []);

    const motosFiltradas = motos.filter((nMotos) => nMotos.estado === 1).filter((moto) => {
        const coincideModelo = filtroModelo.toLowerCase() === "todos" || moto.modelo.toLowerCase() === filtroModelo.toLowerCase();
        const coincideMarca = filtroMarca.toLowerCase() === "todos" || moto.marca.toLowerCase() === filtroMarca.toLowerCase();
        const coincideCilindraje = filtroCilindraje.toLowerCase() === "todos" || moto.cilindraje.toLowerCase() === filtroCilindraje.toLowerCase();
        //const coincideBusqueda = motos.nombre.toLowerCase().includes(busqueda.toLowerCase()) || motos.marca.toLowerCase().includes(busqueda.toLowerCase());

        return coincideModelo && coincideMarca && coincideCilindraje;

    });


    const comprarMoto = (id_moto) => {
        if (!clientes) {
            return navigate("/loginClientes");
        }
        const id_cliente = clientes.id;
        const fecha_estimada = new Date().toISOString().split("T")[0];
        const fecha_entrega = new Date().toISOString().split("T")[0];
        axios.post("http://localhost:3001/api/ventas/registrarVentas", { id_cliente, id_moto, fecha_estimada, fecha_entrega })
            .then((res) => {
                const { message } = res.data;
                alert(message);
            })
            .catch((err) => {
                console.error("Error al obtener las motos:", err);
                //setLoading(false);
            });
    }

    const verHistorial = () => {
        navigate("/historial");
    }


    return (
        <div className="pt-28 bg-gray-950 min-h-screen text-white">

            {/* Filtros */}
            <section className="flex flex-wrap justify-center gap-4 py-6 border-t border-gray-700 bg-gray-900">
                <select
                    value={filtroModelo}
                    onChange={(e) => setFiltroModelo(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white hover:border-yellow-400 focus:outline-none"
                >
                    <option value="Todos">Modelo (año)</option>
                    {[...new Set(
                        motos
                            .filter(moto => moto.estado === 1)
                            .map(moto => moto.modelo)
                    )].map((modelo, index) => (
                        <option key={index} value={modelo}>{modelo}</option>
                    ))}
                </select>

                <select value={filtroMarca}
                    onChange={(e) => setFiltroMarca(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white hover:border-yellow-400 focus:outline-none"
                >
                    <option value="Todos">Marca</option>
                    {[...new Set(
                        motos
                            .filter(moto => moto.estado === 1)
                            .map(moto => moto.marca.toLowerCase())
                    )].map((marca, index) => (
                        <option key={index} value={marca}>{marca}</option>
                    ))}
                </select>

                <select value={filtroCilindraje}
                    onChange={(e) => setFiltroCilindraje(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white hover:border-yellow-400 focus:outline-none"
                >
                    <option value="Todos">Cilindraje</option>
                    {[...new Set(
                        motos
                            .filter(moto => moto.estado === 1)
                            .map(moto => moto.cilindraje)
                    )].map((cilindraje, index) => (
                        <option key={index} value={cilindraje}>{cilindraje}</option>
                    ))}
                </select>

                {clientes ? <button onClick={verHistorial}
                    className="cursor-pointer px-8 py-3 font-bold text-white bg-gray-900 border border-white rounded-3xl hover:bg-yellow-400 hover:text-black transition"
                >
                    Ver Historial
                </button> : ""}

            </section>

            <main className="px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {motosFiltradas.length > 0 ? (
                        motosFiltradas.map((moto) => (
                            <div
                                key={moto.id_moto}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-yellow-500/50 border border-gray-200"
                            >
                                <div className="relative h-48 w-full bg-gray-100">
                                    <img
                                        src={moto.imagen || "/placeholder_moto.jpg"}
                                        alt={`Imagen de ${moto.marca} ${moto.modelo}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                                        ¡NUEVA!
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-gray-800">

                                        {moto.nombre} - {moto.modelo}
                                    </h3>
                                    <p className="text-sm text-gray-600">Cilindraje: {moto.cilindraje}cc</p>
                                    <p className="text-xl font-bold text-yellow-500">${moto.precio}</p>

                                    <button
                                        onClick={() => comprarMoto(moto.id_moto)}
                                        className="mt-3 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition"
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex items-center justify-center h-64 bg-gray-800 rounded-xl shadow-inner">
                            <p className="text-yellow-500 text-lg font-semibold text-center">
                                No existen motos con el filtro seleccionado
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>

    )
}