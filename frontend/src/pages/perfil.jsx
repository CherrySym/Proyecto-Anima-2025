import "../styles/Perfil.css";

export default function Perfil() {
  return (
    <div>
      <header>
        <div><strong>Mi Perfil</strong></div>
        <nav>
          <a href="../Principal/Principal.html" className="active">Principal</a>
          <a href="../home/home.html">Inicio</a>
          <a href="../Capacitaciones/Capacitaciones.html">Capacitaciones</a>
          <a href="../companias/companias.html">Companies</a>
          <a href="../About%20Us/about.html">Acerca de</a>
          <a href="../perfil/perfil.html" className="active">Perfil</a>
        </nav>
      </header>

      <div className="profile-container">
        <h2 className="username">Wendy Pereyra</h2>

        <div className="stats">
          <div>
            <strong>18</strong><br />publications
          </div>
          <div>
            <strong>10.394</strong><br />followers
          </div>
          <div>
            <strong>50</strong><br />points
          </div>
        </div>

        <div className="top-right-buttons">
          <button className="edit-btn">Editar</button>
          <button className="settings-btn">⚙️</button>
        </div>
      </div>

      <div className="main-container">
        <div className="publications">
          <img src="https://picsum.photos/200/200?random=1" alt="" />
          <img src="https://picsum.photos/200/200?random=2" alt="" />
          <img src="https://picsum.photos/200/200?random=3" alt="" />
          <img src="https://picsum.photos/200/200?random=4" alt="" />
          <img src="https://picsum.photos/200/200?random=5" alt="" />
          <img src="https://picsum.photos/200/200?random=6" alt="" />
        </div>

        <div className="working">
          <h3>Currently working on</h3>
          <div className="company-card">
            <img src="https://picsum.photos/400/200?random=7" alt="" />
            <button>Check Company</button>
          </div>
        </div>
      </div>
    </div>
  );
}
