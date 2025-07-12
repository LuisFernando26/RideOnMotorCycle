import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContexEmpleado";
import { data, useNavigate } from "react-router-dom";

export const HomeGeneral = () => {
  const [motos, setMotos] = useState([]);
  const [motosTemp, setMotosTemp] = useState([]);
  const [filtroModelo, setFiltroModelo] = useState("Todos");
  const [filtroMarca, setFiltroMarca] = useState("Todos");
  const [filtroCilindraje, setFiltroCilindraje] = useState("Todos");
  //creamos el estado para ocultar y mostrar el modal
  const [modalMotos, setModalMotos] = useState(false);
  const [modalRegistrarMoto, setModalRegistrarMoto] = useState(false);
  const [modalConfirmarEliminar, setModalConfirmarEliminar] = useState(false);
  const [motoAEliminar, setMotoAEliminar] = useState(null);

  const [loading, setLoading] = useState(true);
  const { empleados } = useAuth();
  const id_cliente = empleados.id;
  const navigate = useNavigate();

  //abrir el modal
  const openModalMoto = (moto) => {
    setMotosTemp(moto);
    setModalMotos(true);
  }
  //cerrar el modal
  const closedModalMoto = () => setModalMotos(false);

  const registrarMotomodal = (moto) => {
    setModalRegistrarMoto(true);
  }

  const closedModalRegistrarMoto = () => setModalRegistrarMoto(false);


  const abrirModalEliminar = (id_moto) => {
    setMotoAEliminar(id_moto);
    setModalConfirmarEliminar(true);
  };


  useEffect(() => {
    if (!id_cliente) {
      return;
    }
    axios.get("http://localhost:3001/api/motos/obtenerMotos")
      .then((res) => {
        setMotos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener las motos:", err);
        setLoading(false);
      });
  }, [id_cliente, modalMotos, modalRegistrarMoto]);


  const registraUnaMoto = async (e) => {
    e.preventDefault();
    //capturamos los datos del formulario 
    const form = e.target;

    const nombre = form.nombre.value;
    const marca = form.marca.value;
    const modelo = form.modelo.value;
    const cilindraje = form.cilindraje.value;
    const precio = form.precio.value;
    const imagen = form.imagen.value;
    const id_moto = motosTemp.id_moto;
    try {
      //con axios
      const response = await axios.post('http://localhost:3001/api/motos/registrarMotos', { nombre, marca, modelo, cilindraje, precio, imagen, id_moto });
      console.log(response.data);

      const { message } = response.data;
      alert(message); // "Bienvenido"
      closedModalRegistrarMoto();

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


  const actualizarMoto = async (e) => {
    e.preventDefault();
    //capturar los datos del formulario
    const form = e.target;

    const nombre = form.nombre.value;
    const marca = form.marca.value;
    const modelo = form.modelo.value;
    const cilindraje = form.cilindraje.value;
    const precio = form.precio.value;
    const imagen = form.imagen.value;
    const id_moto = motosTemp.id_moto;

    try {
      //con axios
      const response = await axios.put('http://localhost:3001/api/motos/actualizarMotos', { nombre, marca, modelo, cilindraje, precio, imagen, id_moto });
      console.log(response.data);

      const { message } = response.data;
      alert(message); // "Bienvenido"
      closedModalMoto();

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
  const motosFiltradas = motos.filter((nMotos) => nMotos.estado === 1).filter((moto) => {
    const coincideModelo = filtroModelo.toLowerCase() === "todos" || moto.modelo.toLowerCase() === filtroModelo.toLowerCase();
    const coincideMarca = filtroMarca.toLowerCase() === "todos" || moto.marca.toLowerCase() === filtroMarca.toLowerCase();
    const coincideCilindraje = filtroCilindraje.toLowerCase() === "todos" || moto.cilindraje.toLowerCase() === filtroCilindraje.toLowerCase();
    //const coincideBusqueda = motos.nombre.toLowerCase().includes(busqueda.toLowerCase()) || motos.marca.toLowerCase().includes(busqueda.toLowerCase());

    return coincideModelo && coincideMarca && coincideCilindraje;

  });
  const verHistorial = () => {
    navigate("/historialVentas");
  }
  const confirmarEliminar = async () => {

    const id_moto = motoAEliminar;
    try {
      const response = await axios.put('http://localhost:3001/api/motos/eliminarMotos',
        { id_moto }
      );
      alert(response.data.message);
      setMotos(prevMotos => prevMotos.filter(moto => moto.id_moto !== motoAEliminar));
    } catch (error) {
      alert("Ocurrió un error al eliminar la moto");
      console.error(error);
    } finally {
      setModalConfirmarEliminar(false);
      setMotoAEliminar(null);
    }
  };




  return (
    <div className="pt-28 bg-gray-950 min-h-screen text-white">

      {/* Filtros empleados */}
      <section className="flex flex-wrap justify-center gap-4 py-6 border-t border-gray-700 bg-gray-900">
        <select value={filtroModelo}
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
            motos.filter(moto => moto.estado === 1)
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

        <button
          onClick={verHistorial}
          className="px-6 py-2 font-bold text-white bg-gray-900 border border-white rounded-3xl hover:bg-yellow-400 hover:text-black transition"
        >
          Ver Historial de ventas
        </button>

        <button
          onClick={registrarMotomodal}
          className="px-6 py-2 font-bold text-white bg-gray-900 border border-white rounded-3xl hover:bg-yellow-400 hover:text-black transition"
        >
          Agregar Nueva Moto
        </button>
      </section>

      {/* Tarjetas de motos */}
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
                    MOTO
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {moto.nombre} - {moto.modelo}
                  </h3>
                  <p className="text-sm text-gray-600">Cilindraje: {moto.cilindraje}cc</p>
                  <p className="text-xl font-bold text-yellow-500">${moto.precio}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => openModalMoto(moto)}
                      className="w-full px-4 py-2 bg-white hover:bg-yellow-400 hover:text-black text-black font-semibold rounded-md transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => abrirModalEliminar(moto.id_moto)}
                      className="w-full px-4 py-2 bg-white hover:bg-[#da0d0d] hover:text-white text-black font-semibold rounded-md transition"
                    >
                      Eliminar
                    </button>
                  </div>
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

      {/*registrar moto*/}

      {modalRegistrarMoto && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative text-black">
            <button
              onClick={closedModalRegistrarMoto}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Registrar Nueva Moto</h2>

            <form onSubmit={registraUnaMoto} className="flex flex-col gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="p-2 border border-gray-400 rounded"
                required
              />
              <input
                type="text"
                name="marca"
                placeholder="Marca"
                className="p-2 border border-gray-400 rounded"
                required
              />
              <input
                type="text"
                name="modelo"
                placeholder="Modelo"
                className="p-2 border border-gray-400 rounded"
                required
              />
              <input
                type="number"
                name="cilindraje"
                placeholder="Cilindraje (cc)"
                className="p-2 border border-gray-400 rounded"
                required
              />
              <input
                type="number"
                name="precio"
                placeholder="Precio ($)"
                className="p-2 border border-gray-400 rounded"
                required
              />
              <input
                type="text"
                name="imagen"
                placeholder="URL de la imagen"
                className="p-2 border border-gray-400 rounded"
              />

              <button
                type="submit"
                className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition"
              >
                Registrar Moto
              </button>
            </form>
          </div>
        </div>

      )}

      {/*editar Moto*/}

      {modalMotos && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative text-black">
            <button
              onClick={closedModalMoto}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">Editar Moto</h2>

            <form onSubmit={actualizarMoto} className="flex flex-col gap-4">
              <input
                type="nombre"
                name="nombre"
                id="nombre"
                value={motosTemp?.nombre || ""}
                onChange={(e) => setMotosTemp({ ...motosTemp, nombre: e.target.value })}
                placeholder="Nombre"
                className="p-2 border border-gray-400 rounded"
              />

              <input
                type="marca"
                name="marca"
                id="marca"
                value={motosTemp?.marca || ""}
                onChange={(e) => setMotosTemp({ ...motosTemp, marca: e.target.value })}
                placeholder="Marca"
                className="p-2 border border-gray-400 rounded"
              />
              <input
                type="modelo"
                name="modelo"
                id="modelo"
                value={motosTemp?.modelo || ""}
                onChange={(e) => setMotosTemp({ ...motosTemp, modelo: e.target.value })}
                placeholder="Modelo"
                className="p-2 border border-gray-400 rounded"
              />
              <input
                type="cilindraje"
                name="cilindraje"
                id="cilindraje"
                value={motosTemp?.cilindraje || ""}
                onChange={(e) => setMotosTemp({ ...motosTemp, cilindraje: e.target.value })}
                placeholder="Cilindraje"
                className="p-2 border border-gray-400 rounded"
              />
              <input
                type="precio"
                name="precio"
                id="precio"
                value={motosTemp?.precio || ""}
                onChange={(e) => setMotosTemp({ ...motosTemp, precio: e.target.value })}
                placeholder="Precio"
                className="p-2 border border-gray-400 rounded"
              />
              <input
                type="imagen"
                name="imagen"
                id="imagen"
                value={motosTemp?.imagen || ""}
                onChange={(e) => setMotosTemp({ ...motosTemp, imagen: e.target.value })}
                placeholder="URL de la imagen"
                className="p-2 border border-gray-400 rounded"
              />

              <button
                type="submit"
                className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition"
              >
                Guardar cambios
              </button>
            </form>
          </div>

        </div>
      )}
      {/*eliminar moto*/}

      {modalConfirmarEliminar && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative text-black">
            <button
              onClick={() => setModalConfirmarEliminar(false)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Confirmar Eliminación</h2>

            <p className="mb-6 text-center text-black font-medium">
              ¿Estás seguro que deseas eliminar esta moto?
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setModalConfirmarEliminar(false)}
                className="px-6 py-2 rounded border border-gray-400 text-black hover:bg-gray-200 transition"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarEliminar}
                className="px-6 py-2 rounded bg-[#da0d0d] text-white font-bold hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

