import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import { getCompanyById } from '../../data/companiesData';
import './CompanyProfilePublic.css';

/**
 * CompanyProfilePublic - Perfil público de empresa
 * Migrado desde JobPath-HTML/companias/[empresa]/[empresa].html
 */
const CompanyProfilePublic = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const company = getCompanyById(companyId);

  const texts = {
    es: {
      back: 'Volver Atrás',
      contact: 'Contacto y Plantas',
      aboutTitle: 'Acerca De',
      spanish: 'Español',
      english: 'English'
    },
    en: {
      back: 'Go Back',
      contact: 'Contact and Plants',
      aboutTitle: 'About Us',
      spanish: 'Spanish',
      english: 'English'
    }
  };

  const t = texts[language];

  if (!company) {
    return (
      <div className="company-profile-public-page">
        <SimpleNavbar title="Job Path" />
        <div className="error-container-public">
          <h2>Empresa no encontrada</h2>
          <p>La empresa que buscas no existe.</p>
          <button onClick={() => navigate('/companias')} className="btn-back-error">
            Volver a Compañías
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="company-profile-public-page"
      style={{ '--primary-color': company.primaryColor, '--secondary-color': company.secondaryColor, '--light-color': company.lightColor }}
    >
      {/* Navbar personalizado con color de la empresa */}
      <header className="company-navbar" style={{ backgroundColor: company.primaryColor }}>
        <div className="company-logo-container">
          <span className="company-logo-text">{company.name.toUpperCase()}</span>
        </div>
        <nav className="company-nav-links">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Principal</a> |
          <a href="/companias" onClick={(e) => { e.preventDefault(); navigate('/companias'); }}>Compañías</a>
        </nav>
      </header>

      <div className="company-main-content">
        {/* Sidebar */}
        <aside className="company-sidebar">
          <button onClick={() => navigate('/companias')} className="btn-company-back">
            {t.back}
          </button>
          <div className="company-sidebar-icons">
            <a href="#" className="company-icon-link">
              <span className="material-icons-custom">{company.icon}</span>
            </a>
            <a href="#" className="company-icon-link">
              <span className="material-icons-custom">inventory</span>
            </a>
            <a href="#" className="company-icon-link">
              <span className="material-icons-custom">factory</span>
            </a>
          </div>
          <a href={company.contact} target="_blank" rel="noopener noreferrer" className="btn-company-locations">
            {t.contact}
          </a>
        </aside>

        {/* Contenido principal */}
        <main className="company-page-content">
          {/* Hero Section */}
          <div className="company-hero-section">
            <div className="company-image-gallery">
              <img src={company.images.main} alt={company.name} className="company-gallery-image" />
              <img 
                src={company.images.main} 
                alt={`${company.name} secundaria`} 
                className="company-gallery-image" 
                style={{ filter: 'brightness(0.9)' }}
              />
              <div className="company-logo-overlay" style={{ backgroundColor: company.secondaryColor }}>
                <span className="company-overlay-text">{company.logo}</span>
                <div className="company-logo-arrow"></div>
              </div>
            </div>
            <div className="company-team-info">
              <span className="material-icons-custom company-team-icon" style={{ color: company.primaryColor }}>
                {company.icon}
              </span>
              <span className="company-team-text">{company.type}</span>
            </div>
            <div className="company-alert-icon" style={{ backgroundColor: company.primaryColor }}>
              <span className="material-icons-custom">{company.alertIcon}</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="company-details-section">
            <div className="company-about-us-container">
              <h3 className="company-section-title" style={{ color: company.primaryColor }}>
                {t.aboutTitle}
              </h3>
              <div className="company-info-card" style={{ borderLeftColor: company.secondaryColor }}>
                <h4 className="company-card-title" style={{ color: company.secondaryColor }}>
                  {company.about.title}
                </h4>
                <p>{company.about.description}</p>
              </div>
            </div>

            <div className="company-more-info-container">
              <h3 className="company-section-title" style={{ color: company.primaryColor }}>
                {company.moreInfo.title}
              </h3>
              <div className="company-info-card" style={{ borderLeftColor: company.secondaryColor }}>
                <h4 className="company-card-title" style={{ color: company.secondaryColor }}>
                  {company.moreInfo.subtitle}
                </h4>
                <p>{company.moreInfo.description}</p>
              </div>
            </div>
          </div>

          {/* Images Right */}
          <div className="company-images-right">
            <img src={company.images.secondary} alt={`${company.name} productos`} className="company-img-large" />
            <img src={company.images.small} alt={`${company.name} planta`} className="company-img-small" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyProfilePublic;
