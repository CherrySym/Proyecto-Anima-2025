import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Pago.css';

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
    <div className="pago-page">
      <div className="pago-container">
        <header className="pago-header">
          <nav className="language-nav-pago">
            <button onClick={() => changeLanguage('es')}>{t.spanish}</button>
            <button onClick={() => changeLanguage('en')}>{t.english}</button>
          </nav>
          <button onClick={() => navigate('/suscripciones')} className="btn-back">
            {t.backBtn}
          </button>
          <h1 className="pago-title">
            {t.title}
            <span className="crown">👑</span>
          </h1>
          <div className="purple-line"></div>
        </header>

        <main className="payment-layout">
          <form className="payment-form-card" onSubmit={handlePayment}>
            <div className="input-group">
              <label htmlFor="subscription-select">{t.selectSubscription}</label>
              <select
                id="subscription-select"
                className="custom-select"
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

            <div className="input-group">
              <label htmlFor="email">{t.email}</label>
              <div className="input-icon-wrapper">
                <span className="icon">📧</span>
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

            <div className="payment-method-selector">
              <div
                className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <span className="icon">💳</span> {t.card}
              </div>
              <div
                className={`payment-option ${paymentMethod === 'bank' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('bank')}
              >
                <span className="icon">🏦</span> {t.bank} <span className="badge">USD 5</span>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                <div className="input-group">
                  <label htmlFor="card-number">{t.cardNumber}</label>
                  <div className="card-input-wrapper">
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

                <div className="card-details-group">
                  <div className="input-group expiry">
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
                  <div className="input-group cvc">
                    <label htmlFor="cvc-code">{t.securityCode}</label>
                    <div className="cvc-input-wrapper">
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
                      <span className="icon-cvc">🎴</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="input-group">
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

            <button type="submit" className="btn-pay">
              {t.payBtn}
            </button>
            <p className="secure-text">{t.secure}</p>
          </form>

          <div className="summary-card">
            <div className="summary-info">
              <p className="plan-name-display">{t.summaryText}</p>
              <p className="price">${formData.subscription}</p>
            </div>
            <div className="total-section">
              <p className="label">{t.total}</p>
              <p className="price">${formData.subscription}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pago;
