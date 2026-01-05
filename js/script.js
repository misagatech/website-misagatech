// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Smooth scrolling for anchor links
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
        }
    });
});

// Animated counter for statistics
const animateCounter = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// Intersection Observer for animations
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

// Observe elements for animations
const animateElements = document.querySelectorAll('.service-card, .about-stats, .contact-method');
animateElements.forEach(el => observer.observe(el));

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        contactForm.reset();
    });
}

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ============================================
// STICKY HEADER CON CLASE SCROLLED (MEJORADO)
// ============================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo');
    
    // Añadir/quitar clase .scrolled para el efecto de gradiente
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        
        // Efecto extra para el logo cuando hay scroll
        if (logo) {
            logo.style.transform = 'scale(0.95)';
            logo.style.transition = 'transform 0.3s ease';
        }
    } else {
        header.classList.remove('scrolled');
        
        // Restaurar tamaño del logo
        if (logo) {
            logo.style.transform = 'scale(1)';
        }
    }
});

// Add animation classes on page load
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    // Asegurarse de que el header tenga el estado inicial correcto
    const header = document.querySelector('.header');
    if (window.scrollY <= 50) {
        header.classList.remove('scrolled');
    } else {
        header.classList.add('scrolled');
    }
});
