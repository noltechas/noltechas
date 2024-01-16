// Example of dynamically loading projects
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});

function loadProjects() {
    const projects = [
        {
            title: 'Project 1',
            link: 'https://example.com/project1',
            imageUrl: 'https://via.placeholder.com/600x400?text=Project+1'
        },
        {
            title: 'Project 2',
            link: 'https://example.com/project2',
            imageUrl: 'https://via.placeholder.com/600x400?text=Project+2'
        }
        // Add more projects as needed
    ];

    const swiperWrapper = document.querySelector('.swiper-wrapper');

    projects.forEach(project => {
        const slide = document.createElement('a');
        slide.className = 'swiper-slide';
        slide.href = project.link;
        slide.style.backgroundImage = `url('${project.imageUrl}')`;
        slide.innerHTML = `<div class="project-title">${project.title}</div>`;
        swiperWrapper.appendChild(slide);
    });

    new Swiper('.swiper-container', {
        // Swiper options
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

document.addEventListener('DOMContentLoaded', loadProjects);

function setupCanvas() {
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
}

let stars = []; // Array to hold star data

function createStars(count, layer, size) {
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            radius: size + Math.random() * 0.25,
            layer: layer
        });
    }
}

function drawStars() {
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupCanvas();
    createStars(50, 1, 1); // Layer 1: fewer, smaller stars
    createStars(30, 2, 2); // Layer 2: medium
    createStars(20, 3, 3); // Layer 3: more, larger stars
    drawStars(); // Draw the stars for the first time
});

function parallaxStars() {
    const scroll = window.pageYOffset;

    stars.forEach(star => {
        let parallaxOffset = scroll * (star.layer * 0.1);
        star.y += parallaxOffset % star.layer;
    });

    drawStars(); // Redraw the stars with the new positions
}

window.addEventListener('scroll', parallaxStars);
