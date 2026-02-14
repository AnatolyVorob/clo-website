/* ============================================
   MAIN SCRIPT - Core Functionality
   ============================================ */

// Cursor glow effect
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('cursor-active');
    
    document.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--cursor-x', e.clientX + 'px');
        document.body.style.setProperty('--cursor-y', e.clientY + 'px');
    });
});

// Scroll Progress Bar
const updateScrollProgress = () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
};

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (nav && window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else if (nav) {
        nav.classList.remove('scrolled');
    }
});

// Mobile hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements with scroll-reveal class
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Add reveal class for section headers
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.section-header').forEach(el => {
        revealObserver.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero && scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        hero.style.opacity = 1 - (scrollY / window.innerHeight);
    }
});

// Console messages
console.log('⚡ Кло website loaded');
console.log('💡 Built with love and AI');
