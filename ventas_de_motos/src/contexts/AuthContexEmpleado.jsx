import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//creamos el contexto
const AuthContexEmpleado = createContext();

//creamos la función para almacenar y borrar la información del empleado
export function AuthProviderSCR({ children }) {
    //guardamos el Empleado
    const [empleados, setEmpleados] = useState(null);
    // cliente
    const [clientes, setClientes] = useState(null);
    //guardamos el token
    const [token, setToken] = useState(null);
    //guardamos el estado
    const [cargando, setCargando] = useState(true); // 👈 Nuevo
    //creamos una constante para navegar entre componentes.

    const navigate = useNavigate();

    //empleado
    useEffect(() => {
        const storageClientes = localStorage.getItem("Clientes");
        const storageEmpleados = localStorage.getItem("Empleados");
        const storageToken = localStorage.getItem("token");

        if (storageEmpleados && storageToken) {
            console.log(storageEmpleados);
            const parsedEmpleados = JSON.parse(storageEmpleados);  // Convierte el string JSON de vuelta a un objeto
            setEmpleados(parsedEmpleados);  // Setea el objeto
            setToken(storageToken);
            setCargando(false);
            return
        }

        if(storageClientes && storageToken){
            console.log(storageClientes);
            const parsedClientes = JSON.parse(storageClientes);  // Convierte el string JSON de vuelta a un objeto
            setClientes(parsedClientes);  // Setea el objeto
            setToken(storageToken);
            setCargando(false);
            return 
        }

        setCargando(false);

    }, []);


    //empleados
    const loginEmpleados = (empleados, token) => {
        //setea las variables del useState
        setEmpleados(empleados);
        setToken(token);
        //guarda los datos en el localStorage
        localStorage.setItem("Empleados", JSON.stringify(empleados));
        localStorage.setItem("token", token);
        navigate("/home");
    }
    //cierra los datos de la sesión.
    const logoutEmpleados = () => {
        //setea las variables del useState a null
        setEmpleados(null);
        setToken(null);
        //remueve los datos guardoados en localStorage
        localStorage.removeItem("Empleados");
        localStorage.removeItem("token");
        //lo envía al login.
        navigate("/loginEmpleados");
    };

    const loginClientes = (clientes, token) => {
        //setea las variables del useState
        setClientes(clientes);
        setToken(token);
        //guarda los datos en el localStorage
        localStorage.setItem("Clientes", JSON.stringify(clientes));
        localStorage.setItem("token", token);
        navigate("/welcome");
    }
    //cierra los datos de la sesión.
    const logoutClientes = () => {
        //setea las variables del useState a null
        setClientes(null);
        setToken(null);
        //remueve los datos guardoados en localStorage
        localStorage.removeItem("Clientes");
        localStorage.removeItem("token");
        //lo envía al login.
        navigate("/");
    };


    return (
        //enviamos al authprovider los valores que pueden consultar sus children, en este caso
        //todas las etiquetas declaradas debajo en el App.jsx
        <AuthContexEmpleado.Provider value={{ empleados, clientes, token, loginEmpleados, logoutEmpleados, loginClientes, logoutClientes, cargando }}>
            {children}
        </AuthContexEmpleado.Provider>
    );

}

// Hook para usar el contexto
export function useAuth() {
    return useContext(AuthContexEmpleado);
}