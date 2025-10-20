import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../../context/LanguageContext';
import { useAuth } from '../../../../context/AuthContext';
import SimpleNavbar from '../../../../components/layout/SimpleNavbar/SimpleNavbar';
import styles from './Suscripciones.module.css';
// import './Suscripciones.css'; // respaldo: comentado para migración a CSS Modules

/**
 * Página Suscripciones - Planes y precios
 * Migrado desde suscripciones/suscripciones.html
 */
const Suscripciones = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useAuth();

  const texts = {
    es: {
      title: 'Planes y Suscripciones',
      subtitle: 'Elige el plan que mejor se adapte a tus necesidades',
      free: 'Gratis',
      month: '/mes',
      year: '/año',
      select: 'Seleccionar Plan',
      current: 'Plan Actual',
      popular: 'Más Popular',
      basic: {
        name: 'Básico',
        price: 'Gratis',
        features: [
          'Acceso a cursos gratuitos',
          'Perfil básico',
          'Foro comunitario',
          'Acceso a desafíos básicos',
          'Soporte por email'
        ]
      },
      premium: {
        name: 'Premium',
        price: '$9.99',
        features: [
          'Todos los cursos disponibles',
          'Certificados verificados',
          'Perfil destacado',
          'Acceso a todos los desafíos',
          'Soporte prioritario 24/7',
          'Sin anuncios',
          'Acceso anticipado a nuevos cursos',
          'Descuentos en eventos'
        ]
      },
      business: {
        name: 'Empresarial',
        price: 'Personalizado',
        features: [
          'Todo lo de Premium',
          'Gestión de equipo',
          'Análisis y reportes avanzados',
          'Integración con API',
          'Publicación ilimitada de ofertas',
          'Acceso a base de datos de talento',
          'Soporte dedicado',
          'Capacitación personalizada'
        ]
      },
      guarantee: '💯 Garantía de satisfacción de 30 días',
      questions: '¿Tienes preguntas?',
      contact: 'Contáctanos'
    },
    en: {
      title: 'Plans and Subscriptions',
      subtitle: 'Choose the plan that best fits your needs',
      free: 'Free',
      month: '/month',
      year: '/year',
      select: 'Select Plan',
      current: 'Current Plan',
      popular: 'Most Popular',
      basic: {
        name: 'Basic',
        price: 'Free',
        features: [
          'Access to free courses',
          'Basic profile',
          'Community forum',
          'Access to basic challenges',
          'Email support'
        ]
      },
      premium: {
        name: 'Premium',
        price: '$9.99',
        features: [
          'All available courses',
          'Verified certificates',
          'Featured profile',
          'Access to all challenges',
          '24/7 priority support',
          'No ads',
          'Early access to new courses',
          'Event discounts'
        ]
      },
      business: {
        name: 'Business',
        price: 'Custom',
        features: [
          'Everything in Premium',
          'Team management',
          'Advanced analytics and reports',
          'API integration',
          'Unlimited job postings',
          'Access to talent database',
          'Dedicated support',
          'Personalized training'
        ]
      },
      guarantee: '💯 30-day satisfaction guarantee',
      questions: 'Have questions?',
      contact: 'Contact Us'
    }
  };

  const t = texts[language];

  const plans = [
    {
      id: 'basic',
      name: t.basic.name,
      price: t.basic.price,
      features: t.basic.features,
      recommended: false,
      color: '#6c757d'
    },
    {
      id: 'premium',
      name: t.premium.name,
      price: t.premium.price,
      period: t.month,
      features: t.premium.features,
      recommended: true,
      color: '#4f4fcf'
    },
    {
      id: 'business',
      name: t.business.name,
      price: t.business.price,
      features: t.business.features,
      recommended: false,
      color: '#28a745'
    }
  ];

  const handleSelectPlan = (planId) => {
    if (!user) {
      navigate('/register');
      return;
    }

    if (planId === 'basic') {
      alert('Ya tienes acceso al plan básico');
      return;
    }

    if (planId === 'business') {
      navigate('/contacto');
      return;
    }

    // Para premium, redirigir a página de pago
    navigate('/pago');
  };

  return (
    <div className={styles['suscripciones-page']}>
      <SimpleNavbar title="Job Path" />

      <main className={styles['suscripciones-content']}>
        <div className={styles['header-section']}>
          <h1>{t.title}</h1>
          <p className={styles['subtitle']}>{t.subtitle}</p>
        </div>

        <div className={styles['plans-grid']}>
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`${styles['plan-card']} ${plan.recommended ? styles.recommended : ''}`}
              style={{ borderTopColor: plan.color }}
            >
              {plan.recommended && (
                <div className={styles['badge']} style={{ backgroundColor: plan.color }}>
                  ⭐ {t.popular}
                </div>
              )}

              <div className={styles['plan-header']}>
                <h2>{plan.name}</h2>
                <div className={styles['price-section']}>
                  <span className={styles['price']}>{plan.price}</span>
                  {plan.period && <span className={styles['period']}>{plan.period}</span>}
                </div>
              </div>

              <ul className={styles['features-list']}>
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <span className={styles['check-icon']}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={styles['select-button']}
                style={{ backgroundColor: plan.color }}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {t.select}
              </button>
            </div>
          ))}
        </div>

        <div className={styles['guarantee-section']}>
          <p>{t.guarantee}</p>
        </div>

        <div className={styles['contact-section']}>
          <h3>{t.questions}</h3>
          <button 
            className={styles['contact-button']}
            onClick={() => navigate('/contacto')}
          >
            {t.contact}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Suscripciones;
