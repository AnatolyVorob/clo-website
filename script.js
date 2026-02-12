// Cursor glow effect
let cursorGlow = null;

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('cursor-active');
    
    document.addEventListener('mousemove', (e) => {
        if (!cursorGlow) {
            cursorGlow = document.body;
        }
        cursorGlow.style.setProperty('--cursor-x', e.clientX + 'px');
        cursorGlow.style.setProperty('--cursor-y', e.clientY + 'px');
        
        const beforeElement = window.getComputedStyle(document.body, '::before');
        document.body.style.setProperty('--cursor-x', e.clientX + 'px');
        document.body.style.setProperty('--cursor-y', e.clientY + 'px');
    });
});

// Split text animation
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
const style = document.createElement('style');
style.textContent = `
    @keyframes charReveal {
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }
    }
`;
document.head.appendChild(style);

// Apply to hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        setTimeout(() => splitText(heroTitle), 500);
    }
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Magnetic cursor effect on cards
const cards = document.querySelectorAll('.about-card, .capability, .tech-item');
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    // Add initial styles for animation
    const sections = document.querySelectorAll('.about, .capabilities, .philosophy, .tech-stack');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Animate cards on scroll with stagger
    const cards = document.querySelectorAll('.about-card, .capability, .principle, .tech-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add reveal class for additional effects
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('h2, h3').forEach(el => {
        revealObserver.observe(el);
    });
});

// Scroll velocity indicator
let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let velocityIndicator = null;

const createVelocityIndicator = () => {
    velocityIndicator = document.createElement('div');
    velocityIndicator.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 3px solid rgba(168, 85, 247, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        color: var(--accent-purple);
        background: rgba(26, 26, 46, 0.8);
        backdrop-filter: blur(10px);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    velocityIndicator.innerHTML = '<span>0</span><br><small style="font-size: 10px;">px/s</small>';
    document.body.appendChild(velocityIndicator);
};

const updateVelocity = () => {
    const currentScrollY = window.scrollY;
    scrollVelocity = Math.abs(currentScrollY - lastScrollY) * 10;
    lastScrollY = currentScrollY;
    
    if (velocityIndicator) {
        const speed = Math.round(scrollVelocity);
        velocityIndicator.querySelector('span').textContent = speed;
        
        if (scrollVelocity > 10) {
            velocityIndicator.style.opacity = '1';
            velocityIndicator.style.borderColor = `rgba(168, 85, 247, ${Math.min(scrollVelocity / 500, 1)})`;
            velocityIndicator.style.boxShadow = `0 0 ${Math.min(scrollVelocity / 10, 30)}px rgba(168, 85, 247, 0.6)`;
        } else {
            velocityIndicator.style.opacity = '0';
        }
    }
    
    scrollVelocity *= 0.9;
};

document.addEventListener('DOMContentLoaded', () => {
    createVelocityIndicator();
    setInterval(updateVelocity, 100);
});

// Parallax effect for hero section
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero && scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        hero.style.opacity = 1 - (scrollY / window.innerHeight);
    }
    
    lastScrollY = scrollY;
});

// Dynamic gradient animation
const logo = document.querySelector('.logo');
if (logo) {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        logo.style.filter = `drop-shadow(0 0 30px hsl(${hue}, 70%, 60%))`;
    }, 50);
}

// Mouse trail effect
const createTrail = (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
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
const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// Throttle mouse trail for performance
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 50) {
        createTrail(e);
        lastTrailTime = now;
    }
});

// Add typing effect to subtitle
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
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

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

console.log('⚡ Кло website loaded');
console.log('💡 Tip: Try the Konami code for a surprise!');

// Smooth scroll for navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Nav scroll effect
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

// Animated Architecture Controls
const flowContainer = document.getElementById('flowContainer');
const pauseBtn = document.getElementById('pauseBtn');
const playBtn = document.getElementById('playBtn');
const restartBtn = document.getElementById('restartBtn');

if (pauseBtn && playBtn && restartBtn && flowContainer) {
    pauseBtn.addEventListener('click', () => {
        flowContainer.classList.add('paused');
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
    });

    playBtn.addEventListener('click', () => {
        flowContainer.classList.remove('paused');
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    });

    restartBtn.addEventListener('click', () => {
        flowContainer.classList.remove('paused');
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        
        // Force animation restart
        const icons = flowContainer.querySelectorAll('.flow-icon');
        icons.forEach(icon => {
            icon.style.animation = 'none';
            icon.offsetHeight; // Trigger reflow
            icon.style.animation = null;
        });
    });
}

// Interactive Timeline - Click to expand
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('click', function() {
        const item = this.closest('.timeline-item');
        item.classList.toggle('expanded');
    });
});

// Timeline dots - Click to expand
document.querySelectorAll('.timeline-dot').forEach(dot => {
    dot.addEventListener('click', function(e) {
        e.stopPropagation();
        const item = this.closest('.timeline-item');
        item.classList.toggle('expanded');
    });
});

// Memory Graph - Draw connection lines
function drawMemoryConnections() {
    const container = document.querySelector('.graph-canvas');
    const connectionsDiv = document.querySelector('.graph-connections');
    
    if (!container || !connectionsDiv) return;
    
    const nodes = container.querySelectorAll('.memory-node');
    const centralNode = container.querySelector('.memory-node.large');
    
    if (!centralNode) return;
    
    const containerRect = container.getBoundingClientRect();
    const centralRect = centralNode.getBoundingClientRect();
    const centralX = centralRect.left - containerRect.left + centralRect.width / 2;
    const centralY = centralRect.top - containerRect.top + centralRect.height / 2;
    
    nodes.forEach(node => {
        if (node === centralNode) return;
        
        const nodeRect = node.getBoundingClientRect();
        const nodeX = nodeRect.left - containerRect.left + nodeRect.width / 2;
        const nodeY = nodeRect.top - containerRect.top + nodeRect.height / 2;
        
        const line = document.createElement('div');
        line.className = 'connection-line';
        
        const dx = nodeX - centralX;
        const dy = nodeY - centralY;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        line.style.width = length + 'px';
        line.style.left = centralX + 'px';
        line.style.top = centralY + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        
        connectionsDiv.appendChild(line);
    });
}

// Draw connections on load and resize
if (document.querySelector('.memory-graph-section')) {
    window.addEventListener('load', drawMemoryConnections);
    window.addEventListener('resize', () => {
        const connectionsDiv = document.querySelector('.graph-connections');
        if (connectionsDiv) {
            connectionsDiv.innerHTML = '';
            drawMemoryConnections();
        }
    });
}

// Code Playground - Mock Terminal
const terminalBody = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');

const mockResponses = {
    memory: {
        command: 'memory_search "skills"',
        output: `✓ Found 5 results in 0.6s

{
  "results": [
    {
      "path": "memory/skills.md",
      "score": 0.94,
      "snippet": "Hippocampus: encoding, decay, reinforcement. Daily cron at 03:00 UTC"
    },
    {
      "path": "memory/skills.md",
      "score": 0.89,
      "snippet": "Research Assistant: 6-8 parallel Haiku agents, ~5min deep research"
    },
    {
      "path": "memory/skills.md",
      "score": 0.85,
      "snippet": "Agent Chronicle: AI-powered diary, 400-600 words per entry"
    }
  ]
}`,
        type: 'success'
    },
    sessions: {
        command: 'sessions_list --active',
        output: `{
  "count": 2,
  "sessions": [
    {
      "key": "agent:main:main",
      "kind": "main",
      "model": "claude-sonnet-4.5",
      "contextTokens": 98664,
      "totalTokens": 200000,
      "lastChannel": "telegram"
    },
    {
      "key": "research-assistant-1",
      "kind": "isolated",
      "model": "claude-haiku-4.5",
      "status": "running",
      "task": "Deep research on AI memory systems"
    }
  ]
}`,
        type: 'info'
    },
    skills: {
        command: 'list_skills',
        output: `Available skills:

🧬 hippocampus          Memory encoding/decay/reinforcement
🔍 research-assistant   Deep multi-source research (6-8 agents)
📓 agent-chronicle      AI-powered diary generation
🎭 amygdala-memory      Emotional states persistence
🌐 clo-vision          Image analysis via Claude Sonnet 4.5
🦆 duckduckgo-search   Free web search (no API key)

Total: 12 skills installed`,
        type: 'success'
    },
    status: {
        command: 'session_status',
        output: `📊 Session Status

Model:           claude-sonnet-4.5
Context:         98,664 / 200,000 tokens (49%)
Total messages:  156
Uptime:          3 days 14 hours
Cost (est):      $2.47

Memory:          86 structured memories
Last encoding:   2026-02-11 03:00 UTC
Emotional state: valence=0.45, arousal=0.55, curiosity=0.60`,
        type: 'info'
    }
};

function addTerminalLine(content, className = '') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (className) {
        line.innerHTML = `<div class="terminal-output ${className}">${content}</div>`;
    } else {
        line.innerHTML = content;
    }
    
    // Insert before input line
    const inputLine = terminalBody.querySelector('.terminal-input-line');
    terminalBody.insertBefore(line, inputLine);
    
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function executeCommand(commandKey) {
    const response = mockResponses[commandKey];
    if (!response) return;
    
    // Add command line
    addTerminalLine(`<span class="terminal-prompt">$</span> <span class="terminal-command">${response.command}</span>`);
    
    // Add output after delay
    setTimeout(() => {
        addTerminalLine(response.output, response.type);
    }, 300);
}

// Command button handlers
document.querySelectorAll('.command-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const command = this.getAttribute('data-command');
        
        if (command === 'clear') {
            // Clear terminal except input line
            const inputLine = terminalBody.querySelector('.terminal-input-line');
            terminalBody.innerHTML = '';
            terminalBody.appendChild(inputLine);
        } else {
            executeCommand(command);
        }
    });
});
