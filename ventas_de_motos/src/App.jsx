import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProviderSCR } from "./contexts/AuthContexEmpleado";
import { PrivateRoute } from "./components/RoutesProtected/PrivateRoute";
import { PublicRoute } from "./components/RoutesProtected/PublicRoute";
import { PublicRouteClientes } from "./components/RoutesProtected/PublicRouteClientes";
import { LoginEmpleadosIniciarSesion } from "./components/loginEmpleados";
import { LoginEmpleadosRegistrar } from "./components/loginEmpleadosRegistrar";
import { LoginClientesIniciarSesion } from "./components/loginClientes";
import { LoginClienteRegistrar } from "./components/loginClienteRegistrar";
import { NavBar, NavBarCliente, NavBarDefault } from "./components/NavBar";
import { HomeGeneral } from "./components/Home/HomeGeneral";
import { HistorialVentas } from "./components/HistorialVentas";
import {HistorialVentasEmpleados} from "./components/HistorialTodasVentas";
import { VistaBienvenida } from "./components/Home/vistaBienvenida";





function App() {
  return (
    <Router>
      <AuthProviderSCR>
        <Routes>
          <Route path="/" element={
            <PublicRouteClientes>
              <NavBarDefault />
              <VistaBienvenida />
            </PublicRouteClientes>
          } />


          <Route path="/loginEmpleados" element={
            <PublicRoute>
              <LoginEmpleadosIniciarSesion />
            </PublicRoute>
          } />

          <Route path="/loginEmpleadoRegistrar" element={
            <PublicRouteClientes>
              <LoginEmpleadosRegistrar />
            </PublicRouteClientes>
          } />

          <Route path="/loginClientes" element={
            <PublicRouteClientes>
              <LoginClientesIniciarSesion />
            </PublicRouteClientes>
          } />

          <Route path="/loginClienteRegistrar" element={
            <PublicRouteClientes>
              <LoginClienteRegistrar />
            </PublicRouteClientes>
          } />


          <Route path="/home" element={
            <PrivateRoute>
              <NavBar />
              <HomeGeneral />
            </PrivateRoute>
          } />

          <Route path="/welcome" element={
            <PrivateRoute>
              <NavBarCliente />
              <VistaBienvenida />
            </PrivateRoute>
          } />
          <Route path="/historial" element={
            <PrivateRoute>
              <NavBarCliente />
              <HistorialVentas />
            </PrivateRoute>
          } />

          <Route path="/historialVentas" element={
            <PrivateRoute>
              <NavBar />
              <HistorialVentasEmpleados />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProviderSCR>
    </Router>
  )
}

export default App

