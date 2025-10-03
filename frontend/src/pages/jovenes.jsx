import "../styles/Jovenes.css";

export default function Jovenes() {
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
          <h2>✨ Encuentra a Jóvenes como empresa</h2>
          <p>
            Trabajar en Amazon me enseñó a manejar la presión y a cumplir con plazos ajustados y a mantenerme organizado...Trabajar en Amazon me enseñó a manejar la presión y a cumplir con plazos ajustados y a mantenerme organizado...Trabajar en Amazon me enseñó a manejar la presión y a cumplir con plazos ajustados y a mantenerme organizado...
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
            src="C:\\Users\\Alumno\\Desktop\\jajaji.gif" 
            alt="Profesionales jóvenes" 
            className="img-large" 
          />
        </section>
      </main>
    </div>
  );
}
