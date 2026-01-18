/* ========================================
   INITIALIZATION & VARIABLES
   ======================================== */

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-top');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contact-form');

/* ========================================
   NAVIGATION FUNCTIONALITY
   ======================================== */

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ========================================
   SCROLL TO TOP FUNCTIONALITY
   ======================================== */

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ========================================
   PORTFOLIO FILTER FUNCTIONALITY
   ======================================== */

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter portfolio items with animation
        portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            // Hide all items first
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            }, 300);
        });
    });
});

/* ========================================
   CONTACT FORM FUNCTIONALITY
   ======================================== */

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';
    submitButton.disabled = true;
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Success message
        submitButton.innerHTML = '<i class="fas fa-check"></i> Mensagem enviada!';
        submitButton.style.backgroundColor = '#4caf50';
        
        // Log form data (in production, send to server)
        console.log('Form submitted:', formData);
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
            
            // Show alert
            showNotification('Mensagem enviada com sucesso! Entraremos em contacto brevemente.', 'success');
        }, 2000);
    }, 1500);
});

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 1rem;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ========================================
   SMOOTH SCROLL POLYFILL FOR ALL BROWSERS
   ======================================== */

// Handle all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   PARALLAX EFFECT FOR HERO SECTION
   ======================================== */

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});

/* ========================================
   COUNTER ANIMATION FOR STATS
   ======================================== */

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16); // 60 FPS
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats section is in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(stat, number, 2000);
            });
        }
    });
}, observerOptions);

const sobreStats = document.querySelector('.sobre-stats');
if (sobreStats) {
    statsObserver.observe(sobreStats);
}

/* ========================================
   LOADING ANIMATION
   ======================================== */

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Refresh AOS after page load
    AOS.refresh();
});

/* ========================================
   FORM INPUT ANIMATION FIX
   ======================================== */

// Handle form inputs that are filled by browser autocomplete
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Check if input has value on load
    if (input.value) {
        input.classList.add('filled');
    }
    
    // Check on input change
    input.addEventListener('change', () => {
        if (input.value) {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
    });
});

/* ========================================
   PORTFOLIO ITEM CLICK HANDLER
   ======================================== */

portfolioItems.forEach(item => {
    const btn = item.querySelector('.portfolio-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const title = item.querySelector('h3').textContent;
            const category = item.querySelector('.portfolio-category').textContent;
            
            // In a real application, this would open a modal or navigate to project page
            showNotification(`Ver projeto: ${title} (${category})`, 'success');
            
            console.log('Portfolio item clicked:', { title, category });
        });
    }
});

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */

// Throttle scroll events for better performance
let scrollTimeout;
const originalScrollHandler = window.onscroll;

window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll handling code here
    });
}, { passive: true });

/* ========================================
   LAZY LOADING FOR IMAGES (Future Enhancement)
   ======================================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ========================================
   CONSOLE MESSAGE
   ======================================== */

console.log('%c Marina Carvalho Arquitectura ', 'background: #d4af37; color: #ffffff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Website desenvolvido com ❤️ ', 'background: #1a1a1a; color: #d4af37; font-size: 14px; padding: 5px;');

/* ========================================
   ACCESSIBILITY ENHANCEMENTS
   ======================================== */

// Trap focus in mobile menu when open
document.addEventListener('keydown', (e) => {
    if (!navMenu.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add keyboard navigation for portfolio filters
filterButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextButton = filterButtons[index + 1] || filterButtons[0];
            nextButton.focus();
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevButton = filterButtons[index - 1] || filterButtons[filterButtons.length - 1];
            prevButton.focus();
        }
    });
});

/* ========================================
   EXPORT FOR TESTING (if needed)
   ======================================== */

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        animateCounter
    };
}