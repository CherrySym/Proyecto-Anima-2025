# 📝 EJEMPLOS DE CÓDIGO - Para Completar Páginas Pendientes

## 🎯 Cómo Completar una Página

Sigue este patrón para completar Jovenes, Companias y About.

---

## 1️⃣ Estructura Básica de Página

```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './TuPagina.css';

/**
 * Descripción de tu componente
 */
const TuPagina = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialValue);

  // useEffect para lógica de montaje
  useEffect(() => {
    // Tu código aquí
  }, []);

  // Funciones del componente
  const handleClick = () => {
    // Lógica
  };

  return (
    <div className="tu-pagina">
      <Header showFullNav={true} title="Job Path" />
      
      <main className="content">
        {/* Tu contenido aquí */}
      </main>
    </div>
  );
};

export default TuPagina;
```

---

## 2️⃣ Ejemplo: Página con Carrusel

```jsx
import { useState } from 'react';
import Header from '../components/Header';
import './Carousel.css';

const PageWithCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const slides = [
    { id: 1, content: 'Slide 1' },
    { id: 2, content: 'Slide 2' },
    { id: 3, content: 'Slide 3' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel-page">
      <Header showFullNav={true} title="Job Path" />
      
      <div className="carousel-container">
        <button className="arrow prev-arrow" onClick={prevSlide}>
          ←
        </button>
        
        <div className="slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              {slide.content}
            </div>
          ))}
        </div>
        
        <button className="arrow next-arrow" onClick={nextSlide}>
          →
        </button>
      </div>
    </div>
  );
};

export default PageWithCarousel;
```

**CSS para Carrusel:**
```css
.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 40px;
}

.slides {
  display: flex;
  overflow: hidden;
  width: 800px;
  height: 400px;
}

.slide {
  min-width: 100%;
  transition: transform 0.5s ease;
  display: none;
}

.slide.active {
  display: block;
}

.arrow {
  background: #4b29d0;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
}

.arrow:hover {
  background: #3700b3;
}
```

---

## 3️⃣ Ejemplo: Página con Cards

```jsx
import { useState } from 'react';
import Header from '../components/Header';
import './Cards.css';

const PageWithCards = () => {
  const [likedCards, setLikedCards] = useState([]);

  const cards = [
    { id: 1, title: 'Card 1', description: 'Descripción 1', image: '/img/img1.png' },
    { id: 2, title: 'Card 2', description: 'Descripción 2', image: '/img/img1.png' },
    { id: 3, title: 'Card 3', description: 'Descripción 3', image: '/img/img1.png' },
  ];

  const toggleLike = (cardId) => {
    setLikedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  return (
    <div className="cards-page">
      <Header showFullNav={true} title="Job Path" />
      
      <main className="content">
        <h1>Nuestras Cards</h1>
        
        <div className="cards-grid">
          {cards.map(card => (
            <div key={card.id} className="card">
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button
                className={`like-button ${likedCards.includes(card.id) ? 'liked' : ''}`}
                onClick={() => toggleLike(card.id)}
              >
                {likedCards.includes(card.id) ? '❤️' : '🤍'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PageWithCards;
```

**CSS para Cards:**
```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 40px;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

.card h3 {
  margin: 10px 0;
  color: #333;
}

.card p {
  color: #666;
  line-height: 1.6;
}

.like-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.like-button:hover {
  transform: scale(1.2);
}

.like-button.liked {
  animation: heartBeat 0.3s ease;
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}
```

---

## 4️⃣ Ejemplo: Formulario Controlado

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Form.css';

const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Formulario enviado:', formData);
    alert('Formulario enviado con éxito!');
    
    // Resetear formulario
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="form-page">
      <Header showFullNav={true} title="Job Path" />
      
      <main className="content">
        <h1>Contáctanos</h1>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={errors.message ? 'error' : ''}
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
};

export default FormPage;
```

---

## 5️⃣ Ejemplo: Migrar HTML Existente

**HTML Original:**
```html
<div class="companies-section">
  <h2>Nuestras Compañías</h2>
  <div class="companies-grid">
    <div class="company-card">
      <img src="../img/globant.jpg" alt="Globant">
      <h3>Globant</h3>
      <p>Descripción de Globant</p>
      <button onclick="goToGlobant()">Ver más</button>
    </div>
  </div>
</div>

<script>
function goToGlobant() {
  window.location.href = 'globant.html';
}
</script>
```

**React Equivalente:**
```jsx
import { useNavigate } from 'react-router-dom';

const Companias = () => {
  const navigate = useNavigate();

  const companies = [
    {
      id: 1,
      name: 'Globant',
      image: '/img/globant.jpg',
      description: 'Descripción de Globant',
      route: '/companias/globant'
    }
  ];

  return (
    <div className="companies-section">
      <h2>Nuestras Compañías</h2>
      <div className="companies-grid">
        {companies.map(company => (
          <div key={company.id} className="company-card">
            <img src={company.image} alt={company.name} />
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <button onClick={() => navigate(company.route)}>
              Ver más
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 6️⃣ Hooks Útiles

### useState - Estado Local
```jsx
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
const [items, setItems] = useState([]);
```

### useEffect - Efectos Secundarios
```jsx
// Ejecutar al montar
useEffect(() => {
  console.log('Componente montado');
}, []);

// Ejecutar cuando cambie una dependencia
useEffect(() => {
  console.log('Count cambió:', count);
}, [count]);

// Cleanup al desmontar
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  
  return () => clearTimeout(timer);
}, []);
```

### useNavigate - Navegación
```jsx
const navigate = useNavigate();

navigate('/home');           // Ir a ruta
navigate(-1);               // Atrás
navigate('/user', { state: { id: 1 } }); // Con estado
```

### useRef - Referencias DOM
```jsx
const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current?.focus();
};

<input ref={inputRef} type="text" />
```

---

## 7️⃣ Patrones Comunes

### Loading State
```jsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Simular carga
  setTimeout(() => setLoading(false), 1000);
}, []);

if (loading) {
  return <div>Cargando...</div>;
}
```

### Conditional Rendering
```jsx
{user ? (
  <div>Bienvenido {user.name}</div>
) : (
  <div>Por favor inicia sesión</div>
)}

{items.length > 0 && (
  <div>Tienes {items.length} items</div>
)}
```

### Lists con Key
```jsx
{items.map(item => (
  <div key={item.id}>
    {item.name}
  </div>
))}
```

---

## 8️⃣ Tips de Debugging

```jsx
// Console log en render
console.log('Rendering con state:', state);

// Debugger
debugger;

// React DevTools
// Instalar extensión y ver estado/props
```

---

## 9️⃣ Errores Comunes y Soluciones

### Error: "Cannot read property of undefined"
```jsx
// ❌ Malo
<div>{user.name}</div>

// ✅ Bueno
<div>{user?.name}</div>
<div>{user && user.name}</div>
```

### Error: "Too many re-renders"
```jsx
// ❌ Malo (llama función en cada render)
<button onClick={handleClick()}>Click</button>

// ✅ Bueno (pasa referencia)
<button onClick={handleClick}>Click</button>
```

### Error: "Missing key prop"
```jsx
// ❌ Malo
{items.map(item => <div>{item}</div>)}

// ✅ Bueno
{items.map((item, index) => <div key={index}>{item}</div>)}
```

---

## 🎯 Checklist para Nueva Página

- [ ] Crear archivo `src/pages/NombrePagina.jsx`
- [ ] Crear archivo `src/pages/NombrePagina.css`
- [ ] Importar Header y configurarlo
- [ ] Copiar estructura HTML del original
- [ ] Convertir a JSX (className, onClick, etc)
- [ ] Extraer lógica JS a hooks
- [ ] Copiar estilos CSS
- [ ] Agregar ruta en `App.jsx`
- [ ] Probar en navegador
- [ ] Agregar comentarios

---

## 📚 Recursos

- [React Docs](https://react.dev)
- [React Hooks](https://react.dev/reference/react)
- [React Router](https://reactrouter.com)

---

**¡Ahora tienes todas las herramientas para completar las páginas! 🚀**
