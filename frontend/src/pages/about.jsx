import "../styles/About.css";

const About = () => {
  return (
    <div>
      <header className="header">
        <h1 className="about-title">About Us</h1>
        <nav>
          <a href="../Principal/Principal.html">Principal</a>
          <a href="../home/home.html">Home</a>
          <a href="../Capacitaciones/Capacitaciones.html">Capacitaciones</a>
          <a href="../companias/companias.html">Companies</a>
          <a href="../About%20Us/about.html">About</a>
          <a href="../perfil/perfil.html">Profile</a>
        </nav>
      </header>

      <div className="logo-bar">
        <div className="logo-jobpath">
          <img alt="JobPath Logo" />
          <span>JobPath</span>
        </div>
        <button className="login-btn">
          <img alt="User Icon" />
          Log In
        </button>
      </div>

      <main className="main-content">
        <section className="left-box">
          <h2>
            Join our <br />
            <strong>Comunidad</strong>
          </h2>
          <p>
            La programación es el proceso de crear instrucciones que una computadora sigue para
            realizar tareas específicas. Al escribir código, los programadores crean
            aplicaciones, automatizan procesos y desarrollan software.
          </p>
          <button className="get-started">Get Started</button>
        </section>

        <section className="center-box">
          <div className="icon">👥</div>
          <p>
            La programación es el proceso de crear instrucciones que una computadora sigue para
            realizar tareas específicas. Al escribir código, los programadores crean
            aplicaciones, automatizan procesos y desarrollan software. La programación es el
            proceso de crear instrucciones...
          </p>
        </section>

        <section className="right-box">
          <h3>¿Por qué estás aquí?</h3>
          <ul>
            <li>Buscando un trabajo</li>
            <li>En busca de experiencia</li>
            <li>Investigación de empresas</li>
            <li>Investigación empresarial</li>
            <li>Contratar gente joven</li>
          </ul>
          <small>✅ Se compartirá el nombre | 0 votos</small>
        </section>
      </main>
    </div>
  );
};

export default About;
