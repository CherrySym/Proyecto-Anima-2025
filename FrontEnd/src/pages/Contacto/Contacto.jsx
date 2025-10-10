import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import './Contacto.css';

/**
 * Página Contacto - Formulario de contacto y soporte
 * Migrado desde OrientacionV/perzonalizado/perzonalizado.html
 */
const Contacto = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: 'general',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const texts = {
    es: {
      title: 'Contacto y Soporte',
      subtitle: 'Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos pronto.',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      subject: 'Asunto',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado! Te contactaremos pronto.',
      subjects: {
        general: 'Consulta General',
        support: 'Soporte Técnico',
        business: 'Consulta Empresarial',
        courses: 'Información sobre Cursos',
        other: 'Otro'
      },
      info: {
        title: 'Información de Contacto',
        email: 'Email: contacto@jobpath.com',
        phone: 'Teléfono: +598 XX XXX XXX',
        hours: 'Horario: Lun-Vie 9:00-18:00',
        social: 'Síguenos en redes sociales'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        q1: '¿Cómo creo una cuenta?',
        a1: 'Puedes crear una cuenta desde el botón "Registrarse" en la página principal.',
        q2: '¿Los cursos son gratuitos?',
        a2: 'Tenemos cursos gratuitos y premium. Puedes ver todos nuestros planes en la sección de Suscripciones.',
        q3: '¿Ofrecen certificados?',
        a3: 'Sí, al completar un curso recibirás un certificado digital verificable.'
      }
    },
    en: {
      title: 'Contact and Support',
      subtitle: 'We are here to help. Send us your inquiry and we will respond soon.',
      name: 'Full name',
      email: 'Email address',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent! We will contact you soon.',
      subjects: {
        general: 'General Inquiry',
        support: 'Technical Support',
        business: 'Business Inquiry',
        courses: 'Course Information',
        other: 'Other'
      },
      info: {
        title: 'Contact Information',
        email: 'Email: contact@jobpath.com',
        phone: 'Phone: +598 XX XXX XXX',
        hours: 'Hours: Mon-Fri 9:00-18:00',
        social: 'Follow us on social media'
      },
      faq: {
        title: 'Frequently Asked Questions',
        q1: 'How do I create an account?',
        a1: 'You can create an account from the "Sign Up" button on the main page.',
        q2: 'Are the courses free?',
        a2: 'We have both free and premium courses. You can see all our plans in the Subscriptions section.',
        q3: 'Do you offer certificates?',
        a3: 'Yes, upon completing a course you will receive a verifiable digital certificate.'
      }
    }
  };

  const t = texts[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular envío (en producción, aquí iría la llamada al backend)
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nombre: '',
        email: '',
        asunto: 'general',
        mensaje: ''
      });
    }, 3000);
  };

  return (
    <div className="contacto-page">
      <SimpleNavbar title="Job Path" />

      <main className="contacto-content">
        <div className="header-section">
          <h1>{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>

        <div className="contacto-grid">
          {/* Formulario */}
          <div className="form-section">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>{t.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="nombre">{t.name}</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="asunto">{t.subject}</label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">{t.subjects.general}</option>
                    <option value="support">{t.subjects.support}</option>
                    <option value="business">{t.subjects.business}</option>
                    <option value="courses">{t.subjects.courses}</option>
                    <option value="other">{t.subjects.other}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">{t.message}</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  {t.send}
                </button>
              </form>
            )}
          </div>

          {/* Información de contacto */}
          <div className="info-section">
            <div className="info-box">
              <h3>{t.info.title}</h3>
              <div className="info-item">
                <span className="icon">📧</span>
                <p>{t.info.email}</p>
              </div>
              <div className="info-item">
                <span className="icon">📞</span>
                <p>{t.info.phone}</p>
              </div>
              <div className="info-item">
                <span className="icon">🕐</span>
                <p>{t.info.hours}</p>
              </div>
              <div className="social-links">
                <p>{t.info.social}</p>
                <div className="social-icons">
                  <a href="#" className="social-icon">📘</a>
                  <a href="#" className="social-icon">📷</a>
                  <a href="#" className="social-icon">🐦</a>
                  <a href="#" className="social-icon">💼</a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="faq-box">
              <h3>{t.faq.title}</h3>
              <div className="faq-item">
                <h4>{t.faq.q1}</h4>
                <p>{t.faq.a1}</p>
              </div>
              <div className="faq-item">
                <h4>{t.faq.q2}</h4>
                <p>{t.faq.a2}</p>
              </div>
              <div className="faq-item">
                <h4>{t.faq.q3}</h4>
                <p>{t.faq.a3}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contacto;
