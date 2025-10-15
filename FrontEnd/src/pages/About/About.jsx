import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import './About.css';

/**
 * Página About - Migrado desde About Us/about.html
 * Información sobre JobPath y la comunidad
 */
const About = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  const goToSubscriptions = () => {
    navigate('/suscripciones');
  };

  const texts = {
    es: {
      title: 'Acerca De Nosotros',
      principal: 'Principal',
      inicio: 'Inicio',
      jovenes: 'Jóvenes',
      companias: 'Compañías',
      about: 'Acerca De..',
      perfil: 'PERFIL',
      joinTitle: 'Únete a nuestra',
      joinStrong: 'Comunidad',
      joinDesc: 'Descubre un espacio donde la colaboración y el conocimiento abren puertas a nuevas oportunidades. Aquí, jóvenes talentos, profesionales y empresas se conectan para crecer juntos, compartir experiencias y construir el futuro de sus carreras.',
      startButton: 'Empezar',
      centerDesc1: 'Más allá de la teoría, la programación es crear y colaborar. Al unirte a nuestra comunidad, no solo aprenderás a escribir código, sino que también te conectarás con otros programadores para construir juntos el futuro de la tecnología.',
      centerDesc2: 'JobPath es la innovación que busca brindar a los jóvenes una sólida introducción al mundo laboral, ayudándolos a desarrollar sus habilidades, ganar experiencia y abrirse camino en la industria tecnológica.',
      whyTitle: '¿Por qué estás aquí?',
      reason1: 'Buscando un trabajo',
      reason2: 'En busca de experiencia',
      reason3: 'Investigación de empresas',
      reason4: 'Investigación empresarial',
      reason5: 'Contratar gente joven',
      votes: '✅ Se compartirá el nombre | 0 votos',
      spanish: 'Español',
      english: 'English'
    },
    en: {
      title: 'About Us',
      principal: 'Main',
      inicio: 'Home',
      jovenes: 'Young People',
      companias: 'Companies',
      about: 'About Us..',
      perfil: 'PROFILE',
      joinTitle: 'Join our',
      joinStrong: 'Community',
      joinDesc: 'Discover a space where collaboration and knowledge open doors to new opportunities. Here, young talents, professionals and companies connect to grow together, share experiences and build the future of their careers.',
      startButton: 'Get Started',
      centerDesc1: 'Beyond theory, programming is about creating and collaborating. By joining our community, you will not only learn to write code, but you will also connect with other programmers to build the future of technology together.',
      centerDesc2: 'JobPath is the innovation that seeks to provide young people with a solid introduction to the working world, helping them develop their skills, gain experience and make their way in the tech industry.',
      whyTitle: 'Why are you here?',
      reason1: 'Looking for a job',
      reason2: 'Seeking experience',
      reason3: 'Company research',
      reason4: 'Business research',
      reason5: 'Hire young people',
      votes: '✅ Name will be shared | 0 votes',
      spanish: 'Spanish',
      english: 'English'
    }
  };

  const t = texts[language];

  return (
    <div className="about-page">
      <SimpleNavbar title="Job Path" />

      <div className="logo-bar">
        <div className="logo-jobpath">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADoCAMAAABVRrFMAAAAe1BMVEX///8bGxsAAAAaGhoXFxfo6Oienp7d3d1tbW0QEBDl5eWysrIJCQmFhYXr6+vz8/PQ0NAqKip2dnZfXl/DwsOmpqYTExMkJCQ0NDTLy8tsbGyhoaFISEi3t7c8PDxDQ0NWVlaKioqUlJR9fX3X19dPT09ZWVkoKCg3Nzd5vcsaAAAIDElEQVR4nO2dbZuyKBSA9UCZZtqLUc1k7zX7/3/hgqkpkmgz1wIu97ed1efiDjwiHMBxLBaLxWKxWCwWnZmPv7ZA8fezdKS6MH/H6EytfOxSEAEIT6nqEv0NwRIgs3qCEPJhsVZdqj/gG0Lk8iA43lQX7JfEJ2h6MQiYXW0eDoVeWbVdVZfuF3gueSdGgaXq8n1MTNrEqNpZdQk/5f62KRZqhob/C0jE6LMWqS7kJ3jVt9gbwpXqUn7CypeK0fY4V13M/tykbZHh31WXsz9LQdejCQLj+iIxxqiLGsxUl7QvCW2MnSrNVV3Svsxk77KyOQaqi9qTgzzk52amva07RUYGXFQXtR9RZ7PQsH6x19nM/1Jd1n70MDOsgzXcOuvxnE1Ul7Un3WOjaZ+f247vM/O+Pq8dK828Pkj6ZjSOB2PVJe1LFHZrjqF5Y3OTbl1i877PnHmnB40Y+E3tnLpUGiSqi/kBtw4xxH+oLuVHzKTtERsX8nOOknE5BFPVRfyQCCTj+uZF/AIvbFFDYFgvv4aH3zZIZPAkEyM6vgkjBMaqy/ZbLiB4ryE4GDigz+OtgOtDEgiNr7AnwWzD8kEQchHCIcDe7Mn3OrvLY4v80N8clusB5fDkxFEUqy6D5f9BHHhtlO2w/TLP0+4pvPxAK2WBZ+3XQfjQ62F8sEQChNlEpwhyKIs7BfElOewlrlKEZ/r8ysyKJqIyeC+fmYedQhOeY/vnihu+BoIj6cy8TjNqkWxgoDoQLPsVtJpRS2QtDLzXxV+yDBidZme+pWaVi6XpWDqZjSWFxT+Vi1OZWWiQmV+dI5NOGppUZ/VoJzXTaK5QalYbCf5HEhwNMkPV0CjPNTPIDLtxj6tNMiPH2tWyt59BZlynIhiOGXzXL1+0T4eaZMZ13u/twdEkMy53/do+Z6itGQrpl3Etrm+4y9f1H4J9SRth5i+jUe3z0j9xl+9qIjAfjWqu2pqFM+6DLeSToOtJWWzec2qmWXNmc1MNjiabNaZdassvzDUTLOs5V6831ww3M/KnwzBrhEZuZM5YMyQYZItrj6GpZoLQSHuOwzATZMNVg6OxZtgXzEBUR+aMNSOiCYh0CGbCMTZvCGbC+YeYoAGYCXMz92QAZp7ojolvvBkC2R2mmglDY21kzlSzN/n4gflm/IhcwQDM3kynv+Z0DTV7u6DntSrZUDO8eHPL+lWrhppt39xivJnr74V3pOZHEBdOghvSyq4oppohBPvGBxoVG0CPmIbHE3d5Uhv2N9gMQX2RGbdQ0lwzXi2pNkWzzdhqrFN5bcqJmW2GXhGyuWbXaDPWIJ+rA5OGmOFmTICpiVZZG2/Gak1QY0MwoxGSiNIljDejENEfB2EmxpopwZpZM9U+L6yZNVPt82IMPoVk+DAks3T1VWHNtvv+6bCzrc5mu++MdR36l9RLWnfG1tws8csljIz6qsZlJFtxoK9ZQhscWwApgvbsT0G3h61hpnynuTikpfrZLijbfypsGSF2YT3rtHEvM6utb1K+BRYtDaydmBHtKiQRtfYOhOzrWbVtZrXdiJSfKXCBcqY2rj1hseOMTgm4m25bXmXzUD+vSKp+m3NqVs5GfFdm3Fn+R7TdAepjVp3BUN0Ya2bOKlfLB017mznX4reBd/NS/x01M+cMQDCB/AcficxwKNxwKJ8VvWT/QAiqA6PDmzneef9zPOcZf9GxaUaO1+tJoFbM9waX/eJw1GETG86sRnxPMrPqK471J9eC9gn67cHQZrZidXbbbCuwhqqrWezdKlxDfLi9Yz6mESGZ14h0NUv33HYXyMUtu2G4z6U8FRbjWLSWWrVZvAfiIkROgaBnIdgMo/g/rOjjiK3LQhjc+Roau1EoNgtIlraHWErOpLHxQIsZrdgN66Rk/4UhaS5VU2y2zUeu2RqXZcdDAXJYsktuxjZsPPJfpGrNxkUj+qWZ6z8aHRO1Zhv8W7MyD+vGn5ag1GwO6I/MaDjhT7hQajb9OzP/a8o1R6Vm4z80W/FL4BWblcWwZtbMmlkza2bNrJk1s2bWzJpZM2tmzayZNbNm/42Z2iQJa/aJWWMPxAGZDfU5s2bWzJpZM2s2aDM+j0epWfp3ZuGVz3VRaVbZVufXuQUJf/aI2nyQcb/F3+eDv8tGfyCAv+qi1uxWrHJhGefSo2zqID9+HXwM0wv/uyjOuxoXGdD+8tGvymjQOFw3Rf70ymvuW6A4C3CcnxSLffGq6BYQ8Z+3YJhEm0aFqzZzdge2sIdkGS/ED2X4OXm6N2ErgtxpsGgeXaTcjD5sl+XkzmqMPCYyrsuc6509oWS1vF52sfCYIw3MGFkicIcDyqYFu/yOdD0b65pHnPEsp/SI87hcmfaVHfoGyRF0zv128oVizc3XeeI8GNJmmD7r7Ig1N4sBSIeDAONiB33sjiKkd3iQrdldN2K+NmZO8HVYyg9vLM1cmATL4yza+9qbdeNl5sI+TaZb3x2emcuCCXsNDs+swJrpjTWzZvpgzayZPlgza6YP1sw8M2fRHG2Fc3lefBVkmJngYEsYsxMGm2ZE/iGrE4KxfzbiFTT3iiJ3+b+mE82zcRFmdXNsjKQKT8rRmUblPA/P5Rd5vj80QVv4+b/coBE0dTr0vSNcuysaHddMMVG9nVB/gurWNAhWxd9nVTXUYSBdP7xNGeIxVNrcGUplXz6OriXxBEKMECbgj6t/TxZAEI2VIdxNix4lt/MWAO5r/l2crjCAezWxJVosFovFYrFYjOZfapCvr++1iGwAAAAASUVORK5CYII="
            alt="JobPath icon" />
          <span>JobPath</span>
        </div>

        {user && (
          <button 
            onClick={() => navigate('/feed')} 
            className="login-btn"
          >
            <img src="/img/usuario.png" alt="User" />
            {t.perfil}
          </button>
        )}
      </div>

      <main className="main-content">
        <section className="left-box">
          <h2>{t.joinTitle} <br /><strong>{t.joinStrong}</strong></h2>
          <p>{t.joinDesc}</p>
          <a href="#" onClick={goToSubscriptions} className="get-started">{t.startButton}</a>
        </section>

        <section className="center-box">
          <div className="icon">👥</div>
          <p>{t.centerDesc1}</p>
          <p>{t.centerDesc2}</p>
        </section>

        <section className="right-box">
          <h3>{t.whyTitle}</h3>
          <ul>
            <li>{t.reason1}</li>
            <li>{t.reason2}</li>
            <li>{t.reason3}</li>
            <li>{t.reason4}</li>
            <li>{t.reason5}</li>
          </ul>
          <small>{t.votes}</small>
        </section>
      </main>
    </div>
  );
};

export default About;
