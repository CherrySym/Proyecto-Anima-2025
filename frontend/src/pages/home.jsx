import "../styles/Home.css";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    let done = false;
    const GO = () => {
      window.location.href = "file:../jovenes/jovenes.html";
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
  }, []);

  return (
    <div>
      <header className="navbar">
        <h1 className="logo">Job Path</h1>
        <nav>
          <a href="../Principal/Principal.html">Principal</a>
          <a href="../home/home.html">Home</a>
          <a href="../Capacitaciones/Capacitaciones.html">Capacitaciones</a>
          <a href="../companias/companias.html">Companies</a>
          <a href="../About%20Us/about.html">About</a>
          <a href="../perfil/perfil.html">Profile</a>
        </nav>
      </header>

      <main className="main-content">
        <section className="text-section">
          <h2>✨ Conozca el futuro de los jóvenes</h2>
          <p>
            Trabajar en Amazon me enseñó a manejar la presión y a cumplir plazos ajustados, sin perder la organización.
          </p>
          <button 
            className="subscribe-btn" 
            onClick={() => window.location.href='file:../suscripciones/suscripciones.html'}
          >
            Ir a Suscripciones
          </button>
        </section>

        <section className="image-section">
          <img 
            src="\Users\Alumno\Downloads\prefecionales.png" 
            alt="Profesionales jóvenes" 
            className="img-large" 
          />
        </section>
      </main>
    </div>
  );
}
