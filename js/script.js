// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // Cambiar aria-label para accesibilidad
        menuToggle.setAttribute('aria-label', 
            navMenu.classList.contains('active') ? 'Cerrar menú' : 'Abrir menú');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Actualizar navegación activa
            updateActiveNavLink(targetId);
        }
    });
});

// Actualizar enlace activo en navegación
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ============================================
// ANIMATED COUNTER FOR STATISTICS
// ============================================
const animateCounter = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-stats')) {
                animateCounter();
            }
            
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
const animateElements = document.querySelectorAll('.service-card, .about-stats, .contact-method');
animateElements.forEach(el => observer.observe(el));

// ============================================
// FORM SUBMISSION HANDLING CON FORMSPREE
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Limpiar formulario al cargar la página
    window.addEventListener('load', function() {
        contactForm.reset();
    });
    
    // También limpiar si el usuario vuelve atrás
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            contactForm.reset();
        }
    });
    
    contactForm.addEventListener('submit', function(e) {
        // Mostrar estado de carga para mejor experiencia de usuario
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Después de 5 segundos, restaurar el botón (fallback)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}

// ============================================
// MEJORAR VISIBILIDAD DE BOTONES EN HERO
// ============================================
function improveHeroButtons() {
    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection || heroButtons.length === 0) return;
    
    // Asegurar que los botones tengan buena visibilidad
    heroButtons.forEach(button => {
        // Efecto adicional al hover
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Añadir clase para efectos adicionales
    setTimeout(() => {
        heroButtons.forEach(btn => {
            btn.classList.add('hero-btn-optimized');
        });
    }, 100);
}

// ============================================
// VERIFICAR IMAGEN DE FONDO DEL HERO
// ============================================
function checkHeroBackground() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Verificar si la imagen de fondo se cargó correctamente
    const img = new Image();
    img.src = 'images/heroimagen.png';
    
    img.onload = function() {
        console.log('✅ Imagen del hero cargada correctamente');
        heroSection.classList.add('bg-loaded');
    };
    
    img.onerror = function() {
        console.warn('⚠️ Error al cargar imagen del hero, usando color sólido');
        // Cambiar a un fondo de color sólido si falla la imagen
        heroSection.style.background = 'linear-gradient(135deg, #163F72 0%, #2A5699 100%)';
        heroSection.style.backgroundImage = 'none';
        heroSection.classList.add('bg-fallback');
    };
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    // Añadir/quitar clase .scrolled para el efecto CSS
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Actualizar navegación activa según scroll
    updateActiveNavOnScroll();
});

// Actualizar navegación según posición de scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

// ============================================
// INICIALIZAR TODO CUANDO EL DOM ESTÉ LISTO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 MisaGatech - Sitio cargado');
    
    // Mejorar botones del hero
    improveHeroButtons();
    
    // Verificar imagen de fondo
    checkHeroBackground();
    
    // Actualizar año en copyright
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Asegurar estado inicial del header
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Actualizar navegación inicial
    updateActiveNavOnScroll();
    
    // Añadir clase loaded al body para transiciones
    document.body.classList.add('loaded');
});

// ============================================
// OPTIMIZACIÓN DE CARGA - LAZY LOADING
// ============================================
// Opcional: Si agregas más imágenes en el futuro
document.addEventListener('DOMContentLoaded', function() {
    // Configurar Intersection Observer para lazy loading de imágenes
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observar imágenes para lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
});
