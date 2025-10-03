import "../styles/Capacitaciones.css";

export default function Capacitaciones() {
  return (
    <div>
      <header>
        <h1>Capacitaciones</h1>
        <nav>
          <a href="../Principal/Principal.html">Principal</a>
          <a href="../home/home.html">Home</a>
          <a href="../Capacitaciones/Capacitaciones.html">Capacitaciones</a>
          <a href="../companias/companias.html">Companies</a>
          <a href="../About%20Us/about.html">About</a>
          <a href="../perfil/perfil.html">Profile</a>
        </nav>
      </header>

      <div className="container">
        <div className="cards">
          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDGNJjwCPiwOi6pfd3iUbkjnYAfCrmfRBIyg&s" alt="profile" />
            <p><strong>Juan - 29 - Amazon</strong></p>
            <p>Working at Amazon taught me how to handle pressure and meet tight deadlines while staying organized...</p>
            <button>Check Company</button>
          </div>

          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK50HwzkqCwb6DApIVsrGY2kwrJRdsRi8_sA&s" height="200px" alt="perfil" />
            <p><strong>María - 34 - Google</strong></p>
            <p>En Google aprendí a trabajar en equipo y desarrollar soluciones innovadoras para proyectos complejos.</p>
            <button>Ver Empresa</button>
          </div>

          <div className="card">
            <img src="" alt="" />
            <p><strong>Lucía - 27 - Apple</strong></p>
            <p>Trabajar en Apple me enseñó a cuidar cada detalle y mantener la excelencia en cada producto.</p>
            <button>Ver Empresa</button>
          </div>

          <div className="card">
            <img src="" alt="" />
            <p><strong>Diego - 32 - Meta</strong></p>
            <p>En Meta aprendí a enfrentar cambios rápidos y a crear experiencias digitales para millones de usuarios.</p>
            <button>Ver Empresa</button>
          </div>

          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHDOF2L7iB430CEfsP8EcNTcrBSk_Tkry_uw&s" height="200px" alt="perfil" />
            <p><strong>Ana - 30 - Netflix</strong></p>
            <p>Netflix me enseñó la importancia de la creatividad y la innovación en la industria del entretenimiento.</p>
            <button>Ver Empresa</button>
          </div>

          <div className="card">
            <img src="" alt="" />
            <p><strong>Martín - 36 - IBM</strong></p>
            <p>En IBM desarrollé soluciones tecnológicas que ayudaron a empresas a mejorar su rendimiento.</p>
            <button>Ver Empresa</button>
          </div>

          <div className="card">
            <img src="" alt="" />
            <p><strong>Laura - 25 - Spotify</strong></p>
            <p>Mi trabajo en Spotify me enseñó a combinar tecnología y música para mejorar la experiencia de los usuarios.</p>
            <button>Ver Empresa</button>
          </div>  

          <div className="card">
            <img src="" alt="" />
            <p><strong>Sebastián - 28 - Tesla</strong></p>
            <p>En Tesla aprendí a trabajar bajo presión y a innovar en el desarrollo de soluciones sostenibles.</p>
            <button>Ver Empresa</button>
          </div>
        </div>

        <div className="sidebar">
          <h3>Explore People</h3>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div className="person" key={idx}>
              <img src="https://via.placeholder.com/40" alt="user" />
              <span>@user234</span>
              <button>Follow</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
