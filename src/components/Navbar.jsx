import { NavLink } from 'react-router';

function Navbar () {
  return (
    <nav className="navbar flex justify-around">
      <NavLink 
        to="/Inicio"
      >
        Inicio
      </NavLink>
      <NavLink 
        to="/Servicios"
      >
        Servicios
      </NavLink>
      <NavLink 
        to="/Contacto"
      >
        Contacto
      </NavLink>
    </nav>
  )
}

export default Navbar;
