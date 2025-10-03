import "../styles/Principal.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // importamos nuestro Navbar

export default function Principal() {
  const navigate = useNavigate();

  useEffect(() => {
    let done = false;

    const GO = () => {
      navigate("/home"); // usamos react-router para navegar
    };

    const fireOnce = () => {
      if (done) return;
      done = true;
      GO();
    };

    const keyHandler = (e) => {
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) fireOnce();
    };

    window.addEventListener("scroll", fireOnce, { passive: true });
    window.addEventListener("wheel", fireOnce, { passive: true });
    window.addEventListener("touchmove", fireOnce, { passive: true });
    window.addEventListener("keydown", keyHandler);

    // limpieza al desmontar el componente
    return () => {
      window.removeEventListener("scroll", fireOnce);
      window.removeEventListener("wheel", fireOnce);
      window.removeEventListener("touchmove", fireOnce);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [navigate]);

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="logo-anima.png" alt="Anima logo" />
          Anima
        </div>
        <Navbar /> {/* reemplazamos el nav estático por nuestro componente Navbar */}
      </header>

      <div className="container">
        <h1 className="title">JobPath</h1>
        <div className="arrow">&#8595;</div>
      </div>

      <div className="arrow" onClick={() => navigate("/home")}>
        &#8595;
      </div>
    </div>
  );
}
