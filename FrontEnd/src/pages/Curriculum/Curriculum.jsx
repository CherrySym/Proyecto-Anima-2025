import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import './Curriculum.css';

/**
 * Curriculum - Generador y editor de CV
 * Migrado desde Curriculum/Curriculum.html
 */
const Curriculum = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [cvContent, setCvContent] = useState('');

  const texts = {
    es: {
      title: 'Generador de Currículum',
      editBtn: 'Editar Currículum',
      saveBtn: 'Guardar CV',
      editAlert: '¡YA PUEDES MODIFICAR TU CURRÍCULUM!',
      saveAlert: '¡SE GUARDÓ TU CURRÍCULUM CORRECTAMENTE!',
      downloadBtn: 'Descargar PDF'
    },
    en: {
      title: 'Resume Generator',
      editBtn: 'Edit Resume',
      saveBtn: 'Save CV',
      editAlert: 'YOU CAN NOW MODIFY YOUR RESUME!',
      saveAlert: 'YOUR RESUME WAS SAVED SUCCESSFULLY!',
      downloadBtn: 'Download PDF'
    }
  };

  const t = texts[language];

  const defaultCVContent = `
    <header>
      <h1 id="cv-name">Nombre Apellido</h1>
      <p id="cv-title">Título Profesional / Puesto</p>
      <div class="contact-info">
        <span>📧 email@ejemplo.com</span> |
        <span>📞 +34 123 456 789</span> |
        <span>📍 Ciudad, País</span>
      </div>
    </header>
    
    <hr>

    <section>
      <h2>📝 Perfil Profesional</h2>
      <p>Soy un profesional con experiencia en [Área] y apasionado por [Tema]. Busco utilizar mis habilidades en [Habilidad 1] y [Habilidad 2] para contribuir al éxito de su proyecto.</p>
    </section>

    <section>
      <h2>💼 Experiencia Laboral</h2>
      <div class="job-entry">
        <h3>Puesto en Empresa A</h3>
        <p class="date-range">Enero 2020 – Actualidad</p>
        <ul>
          <li>Logro clave o responsabilidad principal 1.</li>
          <li>Logro clave o responsabilidad principal 2.</li>
        </ul>
      </div>
      <div class="job-entry">
        <h3>Puesto en Empresa B</h3>
        <p class="date-range">Marzo 2018 – Diciembre 2019</p>
        <ul>
          <li>Responsabilidad importante en la empresa B.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>🎓 Educación</h2>
      <div class="education-entry">
        <h3>Grado/Título en Universidad/Instituto</h3>
        <p class="date-range">2014 – 2018 | Ciudad, País</p>
      </div>
    </section>

    <section>
      <h2>💡 Habilidades</h2>
      <p>HTML, CSS, JavaScript, React, SQL, Comunicación, Liderazgo.</p>
    </section>
  `;

  // Cargar CV desde localStorage
  useEffect(() => {
    const cvStorageKey = user?.email ? `cv_${user.email}` : 'cv_default_anonimo';
    const savedCV = localStorage.getItem(cvStorageKey);
    
    if (savedCV) {
      setCvContent(savedCV);
    } else {
      setCvContent(defaultCVContent);
    }
  }, [user]);

  const handleToggleEdit = () => {
    if (isEditing) {
      // Guardar
      const cvStorageKey = user?.email ? `cv_${user.email}` : 'cv_default_anonimo';
      const cvElement = document.getElementById('cv-content');
      if (cvElement) {
        const content = cvElement.innerHTML;
        localStorage.setItem(cvStorageKey, content);
        setCvContent(content);
        alert(t.saveAlert);
      }
    } else {
      // Editar
      alert(t.editAlert);
    }
    setIsEditing(!isEditing);
  };

  const handleContentChange = (e) => {
    setCvContent(e.target.innerHTML);
  };

  return (
    <div className="curriculum-page">
      <SimpleNavbar title="Job Path" />

      <div className="curriculum-container">
        <div className="profile-section">
          <button onClick={handleToggleEdit} className="edit-toggle-btn">
            {isEditing ? t.saveBtn : t.editBtn}
          </button>
        </div>

        <div className="cv-container">
          <div
            id="cv-content"
            className="cv-content"
            contentEditable={isEditing}
            dangerouslySetInnerHTML={{ __html: cvContent }}
            onInput={handleContentChange}
            suppressContentEditableWarning={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
