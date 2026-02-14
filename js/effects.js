/* ============================================
   EFFECTS - Visual Effects & Animations
   ============================================ */

// Magnetic cursor effect on cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Mouse trail effect (throttled for performance)
const createTrail = (e) => {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(168, 85, 247, 0.6), transparent);
        pointer-events: none;
        left: ${e.clientX - 5}px;
        top: ${e.clientY - 5}px;
        animation: trailFade 0.5s ease-out forwards;
        z-index: 9999;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 500);
};

// Add trail animation CSS
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(trailStyle);

// Throttle mouse trail for performance
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 50) {
        createTrail(e);
        lastTrailTime = now;
    }
});

// Dynamic gradient animation on logo
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    if (logo) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            logo.style.filter = `drop-shadow(0 0 30px hsl(${hue}, 70%, 60%))`;
        }, 50);
    }
});

// Typing effect for subtitle
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle && subtitle.dataset.type === 'true') {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Split text animation for hero title
const splitText = (element) => {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px) rotateX(-90deg)';
        span.style.animation = `charReveal 0.6s ease forwards ${index * 0.05}s`;
        element.appendChild(span);
    });
};

// Add split text animation CSS
const splitStyle = document.createElement('style');
splitStyle.textContent = `
    @keyframes charReveal {
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }
    }
`;
document.head.appendChild(splitStyle);

// Apply to hero title if enabled
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && heroTitle.dataset.split === 'true') {
        setTimeout(() => splitText(heroTitle), 500);
    }
});
