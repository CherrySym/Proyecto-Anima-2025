<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Path</title>
  <link rel="stylesheet" href="home.css">
</head>
<body>
  
  <header class="navbar">
    <h1 class="logo">Job Path</h1>
       <nav>
         <a href="../Principal/Principal.html">Principal</a>
         <a href="../home/home.html">Home</a>
         <a href="../Capacitaciones/Capacitaciones.html">Capacitaciones</a>
         <a href="../companias/companias.html">Companies</a>
         <a href="../About%20Us/about.html">About</a>
         <a href="../perfil/perfil.html">Profile</a>
    </nav>
  </header>

  
  <main class="main-content">
    <section class="text-section">
      <h2>✨ Conozca el futuro de los jóvenes</h2>
      <p>
        Trabajar en Amazon me enseñó a manejar la presión y a cumplir plazos ajustados, sin perder la organización.

      </p>
       <button onclick="window.location.href='file:../suscripciones/suscripciones.html'" class="subscribe-btn">
  Ir a Suscripciones
</button>
    </section>

   

    <section class="image-section">
      <img src="\Users\Alumno\Downloads\prefecionales.png" alt="Profesionales jóvenes" class="img-large">

    <script>
  const GO = () => location.href = "file:../jovenes/jovenes.html";

  let done = false;
  function fireOnce() {
    if (done) return;
    done = true;
    GO();
  }

  window.addEventListener("scroll", fireOnce, { passive: true });
  window.addEventListener("wheel", fireOnce, { passive: true });
  window.addEventListener("touchmove", fireOnce, { passive: true });
  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) fireOnce();
  });
</script>

  </main>
</body>
</html>
