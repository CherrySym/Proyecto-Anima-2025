import "../styles/Suscripciones.css";

export default function Suscripciones() {
  return (
    <div>
      <header>
        <h1>SUSCRIPCIONES</h1>
        <nav>
          <a href="../Principal/Principal.html" className="active">Principal</a>
          <a href="../home/home.html">inicio</a>
          <a href="../Capacitaciones/Capacitaciones.html">Capacitaciones</a>
          <a href="../companias/companias.html">Companies</a>
          <a href="../About%20Us/about.html">Acerca de</a>
          <a href="../perfil/perfil.html">Perfil</a>
        </nav>
      </header>

      <h2 className="title">¿Qué tipo de plan prefieres?</h2>

      <div className="plans">
        <div className="plan">
          <h3>Gratis</h3>
          <p>
            Información sobre el plan y el precio. Información sobre el plan y el precio. Información sobre el plan y el precio. Información sobre el plan y el precio.
            Información sobre el plan y el precio. Información sobre el plan y el precio.
          </p>
          <div className="price">4,85</div>
          <a href="#">Something <span>Here</span></a>
        </div>

        <div className="plan">
          <h3>Pro</h3>
          <p>
            Información sobre el plan y el precio. Información sobre el plan y el precio. Información sobre el plan y el precio. Información sobre el plan y el precio. Información sobre el plan y el precio. Información sobre el plan y el precio.
          </p>
          <div className="price">8,50</div>
          <a href="#">Something <span>Here</span></a>
        </div>

        <div className="plan">
          <h3>Master</h3>
          <p>
            Información sobre el plan y el precio. Información sobre el plan y el precio. Información sobre el plan y el precio. Información sobre el plan y el precio.
            Información sobre el plan y el precio.
          </p>
          <div className="price">16,25</div>
          <a href="#">Something <span>Here</span></a>
        </div>
      </div>
    </div>
  );
}
