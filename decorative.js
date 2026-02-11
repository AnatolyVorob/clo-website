// Floating decorative elements
function createFloatingElements() {
    const container = document.createElement('div');
    container.className = 'floating-elements';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;

    // Create 15 floating shapes
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const size = Math.random() * 100 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        const colors = [
            'rgba(168, 85, 247, 0.1)',
            'rgba(99, 102, 241, 0.1)',
            'rgba(236, 72, 153, 0.1)',
            'rgba(6, 182, 212, 0.1)'
        ];
        
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: ${colors[i % colors.length]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '20%'};
            filter: blur(${Math.random() * 30 + 20}px);
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        container.appendChild(shape);
    }
    
    document.body.appendChild(container);
}

// Enhanced scroll reveal with stagger
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.about-card, .capability, .tech-item').forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// Magnetic cursor effect for cards
function initMagneticEffect() {
    const cards = document.querySelectorAll('.about-card, .capability');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `
                translateY(-15px) 
                scale(1.05) 
                rotateX(${deltaY * -10}deg) 
                rotateY(${deltaX * 10}deg)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Add CSS animation for floating
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(20px, -30px) rotate(5deg);
        }
        50% {
            transform: translate(-15px, -60px) rotate(-5deg);
        }
        75% {
            transform: translate(-30px, -30px) rotate(3deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    initScrollReveal();
    initMagneticEffect();
});
