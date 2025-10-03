import { NavLink } from 'react-router-dom';
import './Navbar.css'; // opcional, si quieres estilizarla

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/principal">Principal</NavLink>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/capacitaciones">Capacitaciones</NavLink>
      <NavLink to="/companias">Companies</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/perfil">Profile</NavLink>
    </nav>
  );
}
