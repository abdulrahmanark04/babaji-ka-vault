// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Wait for 1.5 seconds to show the text, then trigger the "cloth cut" reveal
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.add('ready');
        
        // Remove from DOM after animation completes (1.2s transition)
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1200);
    }, 1500);
});

// Starfield Canvas Logic
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 70;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1
    });
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill background (Pure Pitch Black for maximum contrast)
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Crimson Red particles (230, 0, 0)
        ctx.fillStyle = `rgba(230, 0, 0, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y -= p.speedY;

        if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
        }
    }
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==================================
// CUSTOM CURSOR LOGIC
// ==================================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const interactables = document.querySelectorAll('a, .card, .btn, i');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Snappy cursor
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
});

// Smooth follower animation
function animateFollower() {
    // Easing formula for smooth trailing
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.classList.add('hovering');
        cursor.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        follower.classList.remove('hovering');
        cursor.classList.remove('hovering');
    });
});
