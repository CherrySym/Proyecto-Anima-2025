import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../../context/LanguageContext';
import SimpleNavbar from '../../../../components/layout/SimpleNavbar/SimpleNavbar';
import { getCompanyById } from '../../../../data/companiesData';
import styles from './CompanyProfilePublic.module.css';
// import './CompanyProfilePublic.css'; // comentado: backup

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
      <div className={styles['company-profile-public-page']}>
        <SimpleNavbar title="Job Path" />
        <div className={styles['error-container-public']}>
          <h2>Empresa no encontrada</h2>
          <p>La empresa que buscas no existe.</p>
          <button onClick={() => navigate('/companias')} className={styles['btn-back-error']}>
            Volver a Compañías
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={styles['company-profile-public-page']}
      style={{ '--primary-color': company.primaryColor, '--secondary-color': company.secondaryColor, '--light-color': company.lightColor }}
    >
      {/* Navbar personalizado con color de la empresa */}
      <header className={styles['company-navbar']} style={{ backgroundColor: company.primaryColor }}>
        <div className={styles['company-logo-container']}>
          <span className={styles['company-logo-text']}>{company.name.toUpperCase()}</span>
        </div>
        <nav className={styles['company-nav-links']}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Principal</a> |
          <a href="/companias" onClick={(e) => { e.preventDefault(); navigate('/companias'); }}>Compañías</a>
        </nav>
      </header>

      <div className={styles['company-main-content']}>
        {/* Sidebar */}
        <aside className={styles['company-sidebar']}>
          <button onClick={() => navigate('/companias')} className={styles['btn-company-back']}>
            {t.back}
          </button>
          <div className={styles['company-sidebar-icons']}>
            <a href="#" className={styles['company-icon-link']}>
              <span className={styles['material-icons-custom']}>{company.icon}</span>
            </a>
            <a href="#" className={styles['company-icon-link']}>
              <span className={styles['material-icons-custom']}>inventory</span>
            </a>
            <a href="#" className={styles['company-icon-link']}>
              <span className={styles['material-icons-custom']}>factory</span>
            </a>
          </div>
          <a href={company.contact} target="_blank" rel="noopener noreferrer" className={styles['btn-company-locations']}>
            {t.contact}
          </a>
        </aside>

        {/* Contenido principal */}
        <main className={styles['company-page-content']}>
          {/* Hero Section */}
          <div className={styles['company-hero-section']}>
            <div className={styles['company-image-gallery']}>
              <img src={company.images.main} alt={company.name} className={styles['company-gallery-image']} />
              <img 
                src={company.images.main} 
                alt={`${company.name} secundaria`} 
                className={styles['company-gallery-image']} 
                style={{ filter: 'brightness(0.9)' }}
              />
              <div className={styles['company-logo-overlay']} style={{ backgroundColor: company.secondaryColor }}>
                <span className={styles['company-overlay-text']}>{company.logo}</span>
                <div className={styles['company-logo-arrow']}></div>
              </div>
            </div>
            <div className={styles['company-team-info']}>
              <span className={`${styles['material-icons-custom']} ${styles['company-team-icon']}`} style={{ color: company.primaryColor }}>
                {company.icon}
              </span>
              <span className={styles['company-team-text']}>{company.type}</span>
            </div>
            <div className={styles['company-alert-icon']} style={{ backgroundColor: company.primaryColor }}>
              <span className={styles['material-icons-custom']}>{company.alertIcon}</span>
            </div>
          </div>

          {/* Details Section */}
          <div className={styles['company-details-section']}>
            <div className={styles['company-about-us-container']}>
              <h3 className={styles['company-section-title']} style={{ color: company.primaryColor }}>
                {t.aboutTitle}
              </h3>
              <div className={styles['company-info-card']} style={{ borderLeftColor: company.secondaryColor }}>
                <h4 className={styles['company-card-title']} style={{ color: company.secondaryColor }}>
                  {company.about.title}
                </h4>
                <p>{company.about.description}</p>
              </div>
            </div>

            <div className={styles['company-more-info-container']}>
              <h3 className={styles['company-section-title']} style={{ color: company.primaryColor }}>
                {company.moreInfo.title}
              </h3>
              <div className={styles['company-info-card']} style={{ borderLeftColor: company.secondaryColor }}>
                <h4 className={styles['company-card-title']} style={{ color: company.secondaryColor }}>
                  {company.moreInfo.subtitle}
                </h4>
                <p>{company.moreInfo.description}</p>
              </div>
            </div>
          </div>

          {/* Images Right */}
          <div className={styles['company-images-right']}>
            <img src={company.images.secondary} alt={`${company.name} productos`} className={styles['company-img-large']} />
            <img src={company.images.small} alt={`${company.name} planta`} className={styles['company-img-small']} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyProfilePublic;
