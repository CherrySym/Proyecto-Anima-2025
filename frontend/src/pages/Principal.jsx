<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Principal</title>
  <link rel="stylesheet" href="Principal.css" />
</head>
<body>
  <header class="header">
    <div class="logo">
      <img src="logo-anima.png" alt="Anima logo" />
      Anima
    </div>
      <nav>
      <a href="Principal.html" class="active">PRINCIPAL</a>

    </nav>
  </header>

  <div class="container">
    <h1 class="title">JobPath</h1>
    <div class="arrow">&#8595;</div>
  </div>

  <script>
  
  const GO = () => location.href = "../home/home.html";

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
<div class="arrow" onclick="location.href='../home/home.html'">&#8595;</div>
</body>
</html>
