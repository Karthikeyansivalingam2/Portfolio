// Typing Animation
const words = ["Full Stack Developer", "MERN Stack Specialist", "Creative Developer", "Problem Solver"];
let idx = 0;
let charIdx = 0;
let isDeleting = false;
const typingText = document.getElementById("typingText");

function type() {
    const currentWord = words[idx];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingText.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        idx = (idx + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});

// Canvas Spider Web Background
const canvas = document.getElementById("webCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = Math.random() > 0.5 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 68, 255, 0.5)';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        // Mouse interaction
        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                // Subtle push effect
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                this.x -= forceDirectionX * force * 2;
                this.y -= forceDirectionY * force * 2;
            }
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

function init() {
    particles = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let dx = (Math.random() - 0.5) * 1.5;
        let dy = (Math.random() - 0.5) * 1.5;
        particles.push(new Particle(x, y, dx, dy, size));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
            
            if (distance < (canvas.width / 6) * (canvas.height / 6)) {
                opacityValue = 1 - (distance / 30000);
                // Multiverse colorful webs
                if (particles[a].color.includes('255, 0, 0')) {
                    ctx.strokeStyle = `rgba(255, 50, 50, ${opacityValue * 0.3})`;
                } else {
                    ctx.strokeStyle = `rgba(50, 150, 255, ${opacityValue * 0.3})`;
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    connect();
}

init();
animateCanvas();

// Sticky Navbar & Cursor Glow Color Change
const navbar = document.getElementById('navbar');
const cursorGlow = document.getElementById('cursorGlow');
const cursorDot = document.getElementById('cursorDot');
const spiderPet = document.getElementById('spiderPet');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Custom Cursor & Spider Pet Follow
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let spiderX = window.innerWidth / 2;
let spiderY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    // Toggle cursor glow and dot shadow color based on screen side
    if (mouseX < window.innerWidth / 2) {
        cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 0, 0, 0.4) 0%, transparent 70%)';
        cursorDot.style.boxShadow = '0 0 10px #fff, 0 0 20px rgba(255, 0, 0, 0.7)';
    } else {
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 68, 255, 0.4) 0%, transparent 70%)';
        cursorDot.style.boxShadow = '0 0 10px #fff, 0 0 20px rgba(0, 68, 255, 0.7)';
    }
});

// Spider Pet Animation (follows cursor with delay)
function animateSpider() {
    let dx = mouseX - spiderX;
    let dy = mouseY - spiderY;
    
    // Smooth follow
    spiderX += dx * 0.05;
    spiderY += dy * 0.05;
    
    // Calculate rotation angle to look at cursor
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    // Offset spider slightly so it doesn't hide exactly under cursor
    // But calculate it based on rotation for more natural feel
    const offset = 25;
    const rad = (angle + 90) * (Math.PI / 180);
    
    spiderPet.style.left = (spiderX - Math.sin(rad) * offset) + 'px';
    spiderPet.style.top = (spiderY + Math.cos(rad) * offset) + 'px';
    spiderPet.style.transform = `rotate(${angle + 90}deg)`; // +90 because emoji points up

    requestAnimationFrame(animateSpider);
}
animateSpider();

// Hover Effects for Cursor
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-form input, .contact-form textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorDot.style.opacity = '0.5';
        cursorGlow.style.opacity = '0.6';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.opacity = '1';
        cursorGlow.style.opacity = '0.4';
    });
});


// Scroll Observation for Fade-in & Progress animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.section-hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Web Shooter Effect on "Enter My Universe" Button
const enterBtn = document.querySelector('.hero .btn');

if (enterBtn) {
    enterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const btnRect = this.getBoundingClientRect();
        
        // Target section to scroll to
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Create the web line
        const webLine = document.createElement('div');
        webLine.classList.add('web-shoot');
        document.body.appendChild(webLine);

        // Calculate starting point (center of the button)
        const startX = btnRect.left + btnRect.width / 2;
        const startY = btnRect.top + btnRect.height / 2;
        
        webLine.style.left = startX + 'px';
        webLine.style.top = startY + 'px';
        webLine.style.height = '2px';
        webLine.style.width = '0px';

        // Set target point to the top-right corner to simulate hanging on a building
        const targetX = window.innerWidth * 0.9;
        const targetY = -(window.innerHeight * 0.5); // Shoot out of bounds upwards

        const angle = Math.atan2(targetY - startY, targetX - startX) * 180 / Math.PI;
        const distance = Math.sqrt(Math.pow(targetX - startX, 2) + Math.pow(targetY - startY, 2));

        webLine.style.transform = `rotate(${angle}deg)`;

        // Trigger animation
        setTimeout(() => {
            webLine.style.width = distance + 'px';
        }, 10);

        // Trigger scroll once the web is "attached"
        setTimeout(() => {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            webLine.style.opacity = '0';
        }, 250);

        // Clean up DOM
        setTimeout(() => {
            webLine.remove();
        }, 600);
    });
}
