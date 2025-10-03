import "../styles/Companias.css";

export default function Companias() {
  return (
    <div>
      <header className="header">
        <div className="about-title">Companies</div>
        <nav>
          <a href="../Principal/Principal.html">Principal</a>
          <a href="../home/home.html">Home</a>
          <a href="../Capacitaciones/Capacitaciones.html">Capacitaciones</a>
          <a href="../companias/companias.html">Companies</a>
          <a href="../About%20Us/about.html">About</a>
          <a href="../perfil/perfil.html">Profile</a>
        </nav>
      </header>

      <div className="cards-container"></div>

      <section className="cards-wrapper">
        <button className="nav-arrow" onClick={() => window.location.href='../home/home.html'}>
          &#8249;
        </button>

        <div className="card">
          <img src="C:\\Users\\Alumno\\Downloads\\juan-web.jpg" alt="Factory" />
          <p>La programación es el proceso de crear instrucciones que una computadora sigue para realizar tareas específicas. Al escribir código, los programadores crean aplicaciones, automatizan procesos y desarrollan software.</p>
          <div className="icons">
            <span>🤍</span><span>📄</span><span>📘</span>
          </div>
          <button className="show-more">Show more ▼</button>
        </div>

        <div className="card">
          <img src="" alt="" />
          <p>La programación es el proceso de crear instrucciones que una computadora sigue para realizar tareas específicas. Al escribir código, los programadores crean aplicaciones, automatizan procesos y desarrollan software.</p>
          <div className="icons">
            <span>🤍</span><span>📄</span><span>📘</span>
          </div>
          <button className="show-more">Show more ▼</button>
        </div>

        <div className="card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQMm62vrS931eATbzAI83K30SQceQwsnoOFg&s" alt="Office" />
          <p>La programación es el proceso de crear instrucciones que una computadora sigue para realizar tareas específicas. Al escribir código, los programadores crean aplicaciones, automatizan procesos y desarrollan software.</p>
          <div className="icons">
            <span>🤍</span><span>📄</span><span>📘</span>
          </div>
          <button className="show-more">Show more ▼</button>
        </div>

        <button className="nav-arrow" onClick={() => window.location.href='page2.html'}>
          &#8250;
        </button>
      </section>
    </div>
  );
}
