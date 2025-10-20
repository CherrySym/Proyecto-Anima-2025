import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Pago.module.css';
// import './Pago.css'; // comentado: backup

/**
 * Pago - Página de pago de suscripciones
 * Migrado desde Pago/Pago.html
 */
const Pago = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  
  const [formData, setFormData] = useState({
    subscription: '16.25',
    planName: 'Master',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const texts = {
    es: {
      title: 'SUSCRIPCIONES',
      backBtn: 'Volver Atrás',
      selectSubscription: 'Seleccionar Suscripción',
      email: 'Email',
      cardNumber: 'Número de tarjeta',
      expiryDate: 'Fecha de Vencimiento',
      securityCode: 'Código de Seguridad',
      country: 'País',
      selectCountry: 'Selecciona un País',
      payBtn: 'Pagar',
      secure: '🔒 JobPath--Pago',
      summaryText: 'Este es el precio de la suscripción que usted está por comprar ahora, verifique antes de hacer el pago:',
      total: 'Total',
      card: 'Tarjeta',
      bank: 'Banco',
      spanish: 'Español',
      english: 'English'
    },
    en: {
      title: 'SUBSCRIPTIONS',
      backBtn: 'Go Back',
      selectSubscription: 'Select Subscription',
      email: 'Email',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      securityCode: 'Security Code',
      country: 'Country',
      selectCountry: 'Select a Country',
      payBtn: 'Pay',
      secure: '🔒 JobPath--Payment',
      summaryText: 'This is the price of the subscription you are about to purchase, please verify before payment:',
      total: 'Total',
      card: 'Card',
      bank: 'Bank',
      spanish: 'Spanish',
      english: 'English'
    }
  };

  const t = texts[language];

  const plans = [
    { value: '4.85', name: 'Expert' },
    { value: '8.50', name: 'Pro' },
    { value: '16.25', name: 'Master' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubscriptionChange = (e) => {
    const selectedValue = e.target.value;
    const selectedPlan = plans.find(p => p.value === selectedValue);
    setFormData(prev => ({
      ...prev,
      subscription: selectedValue,
      planName: selectedPlan?.name || ''
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.email || !formData.cardNumber || !formData.expiryDate || !formData.cvc || !formData.country) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Aquí iría la integración con pasarela de pago (Stripe, PayPal, etc.)
    alert(`Pago de $${formData.subscription} procesado exitosamente para el plan ${formData.planName}`);
    navigate('/suscripciones');
  };

  return (
    <div className={styles['pago-page']}>
      <div className={styles['pago-container']}>
        <header className={styles['pago-header']}>
          <nav className={styles['language-nav-pago']}>
            <button onClick={() => changeLanguage('es')}>{t.spanish}</button>
            <button onClick={() => changeLanguage('en')}>{t.english}</button>
          </nav>
          <button onClick={() => navigate('/suscripciones')} className={styles['btn-back']}>
            {t.backBtn}
          </button>
          <h1 className={styles['pago-title']}>
            {t.title}
            <span className={styles.crown}>👑</span>
          </h1>
          <div className={styles['purple-line']}></div>
        </header>

        <main className={styles['payment-layout']}>
          <form className={styles['payment-form-card']} onSubmit={handlePayment}>
            <div className={styles['input-group']}>
              <label htmlFor="subscription-select">{t.selectSubscription}</label>
              <select
                id="subscription-select"
                className={styles['custom-select']}
                value={formData.subscription}
                onChange={handleSubscriptionChange}
              >
                {plans.map(plan => (
                  <option key={plan.value} value={plan.value}>
                    {plan.name} - ${plan.value}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles['input-group']}>
              <label htmlFor="email">{t.email}</label>
              <div className={styles['input-icon-wrapper']}>
                <span className={styles.icon}>📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@ejemplo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles['payment-method-selector']}>
              <div
                className={`${styles['payment-option']} ${paymentMethod === 'card' ? styles.selected : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <span className={styles.icon}>💳</span> {t.card}
              </div>
              <div
                className={`${styles['payment-option']} ${paymentMethod === 'bank' ? styles.selected : ''}`}
                onClick={() => setPaymentMethod('bank')}
              >
                <span className={styles.icon}>🏦</span> {t.bank} <span className={styles.badge}>USD 5</span>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                <div className={styles['input-group']}>
                  <label htmlFor="card-number">{t.cardNumber}</label>
                  <div className={styles['card-input-wrapper']}>
                    <input
                      type="text"
                      id="card-number"
                      name="cardNumber"
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength="19"
                      required
                    />
                  </div>
                </div>

                <div className={styles['card-details-group']}>
                  <div className={`${styles['input-group']} ${styles.expiry}`}>
                    <label htmlFor="expiry-date">{t.expiryDate}</label>
                    <input
                      type="text"
                      id="expiry-date"
                      name="expiryDate"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className={`${styles['input-group']} ${styles.cvc}`}>
                    <label htmlFor="cvc-code">{t.securityCode}</label>
                    <div className={styles['cvc-input-wrapper']}>
                      <input
                        type="text"
                        id="cvc-code"
                        name="cvc"
                        placeholder="CVC"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        maxLength="4"
                        required
                      />
                      <span className={styles['icon-cvc']}>🎴</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className={styles['input-group']}>
              <label htmlFor="country">{t.country}</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">{t.selectCountry}</option>
                <option value="UY">Uruguay</option>
                <option value="AR">Argentina</option>
                <option value="BR">Brasil</option>
                <option value="CL">Chile</option>
                <option value="CO">Colombia</option>
                <option value="MX">México</option>
                <option value="PE">Perú</option>
                <option value="ES">España</option>
                <option value="US">Estados Unidos</option>
              </select>
            </div>

            <button type="submit" className={styles['btn-pay']}>
              {t.payBtn}
            </button>
            <p className={styles['secure-text']}>{t.secure}</p>
          </form>

          <div className={styles['summary-card']}>
            <div className={styles['summary-info']}>
              <p className={styles['plan-name-display']}>{t.summaryText}</p>
              <p className={styles.price}>${formData.subscription}</p>
            </div>
            <div className={styles['total-section']}>
              <p className={styles.label}>{t.total}</p>
              <p className={styles.price}>${formData.subscription}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pago;
