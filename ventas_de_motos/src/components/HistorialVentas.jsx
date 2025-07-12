import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContexEmpleado";
import axios from "axios";
import { HomeGeneral } from "./Home/HomeGeneral";
import { useNavigate } from "react-router-dom";




export const HistorialVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");
    const { clientes } = useAuth();
    const id_cliente = clientes.id;
    const navigate = useNavigate();


    useEffect(() => {
        axios.post("http://localhost:3001/api/ventas/obtenerVentasporID", { id_cliente })
            .then((res) => {
                setVentas(res.data);
                console.log(res.data);

            })
            .catch((err) => {
                console.error("Error al obtener las Ventas:", err);
            });
    }, []);

    const ventasFiltradas = ventas.filter((venta) => {
        const coincideEstado = filtroEstado.toLowerCase() === "todos" || venta.estado.toLowerCase() === filtroEstado.toLowerCase();
        const coincideBusqueda = venta.nombre.toLowerCase().includes(busqueda.toLowerCase()) || venta.marca.toLowerCase().includes(busqueda.toLowerCase());

        return coincideEstado && coincideBusqueda;

    });

    const volveralHome = () => {
        navigate("/welcome");
    }
    return (
        <div className="px-8 py-10 mt-5 w-full mx-auto text-white bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-yellow-400">Historial de Ventas de Motos</h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Buscar por cliente o modelo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <select
                    className="w-full md:w-1/4 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    <option value="Todos">Todos</option>
                    <option value="Completada">Completada</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cancelada">Cancelada</option>
                </select>
            </div>
            {ventasFiltradas.length > 0 ?
                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-black">
                            <tr>
                                {["ID", "Nombre", "Marca", "Fecha Estimada", "Precio", "Estado"].map((header) => (
                                    <th key={header} className="px-6 py-3 text-left text-sm font-bold text-yellow-400 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-700">
                            {ventasFiltradas.map((venta) => (
                                <tr key={venta.id_venta}>
                                    <td className="px-6 py-4 text-sm font-bold">{venta.id_venta}</td>
                                    <td className="px-6 py-4 text-sm font-bold">{venta.nombre}</td>
                                    <td className="px-6 py-4 text-sm font-bold">{venta.marca}</td>
                                    <td className="px-6 py-4 text-sm font-bold">{venta.fecha_estimada.split("T")[0]}</td>
                                    <td className="px-6 py-4 text-sm font-bold">{venta.precio}</td>
                                    <td
                                        className={`px-6 py-4 text-sm font-medium ${venta.estado.toLowerCase() === "completada"
                                            ? "text-green-400"
                                            : venta.estado.toLowerCase() === "pendiente"
                                                ? "text-blue-400"
                                                : venta.estado.toLowerCase() === "cancelada"
                                                    ? "text-yellow-500"
                                                    : "text-white"
                                            }`}
                                    >
                                        {venta.estado}
                                    </td>
                                </tr>
                            ))


                            }
                        </tbody>
                    </table>


                </div>
                : < div className="w-full flex justify-center mt-20">
                    <div className="bg-gray-800 px-8 py-6 rounded-2xl shadow-lg border border-gray-700 max-w-md text-center">
                        <p className="text-yellow-400 text-xl font-semibold tracking-wide">
                            Todavía no has realizado compras
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                            Explora nuestros productos y encuentra lo que estás buscando.
                        </p>
                    </div>
                </div>
            }

            <div className="flex justify-center mt-10 ">
                <button
                    onClick={volveralHome}
                    className="cursor-pointer px-8 py-3 font-bold text-white bg-gray-900 border border-white rounded-3xl hover:bg-yellow-400 hover:text-black transition"


                >
                    Volver
                </button>
            </div>
        </div >

    )
}
