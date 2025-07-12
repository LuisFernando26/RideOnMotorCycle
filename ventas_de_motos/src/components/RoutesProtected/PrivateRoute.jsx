import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexEmpleado";

export function PrivateRoute({ children }) {
  const { token, cargando } = useAuth();

  if (cargando) {
    return <div className="text-center mt-10">Cargando...</div>;
  }
  return token ? children : <Navigate to="/" />;
}
