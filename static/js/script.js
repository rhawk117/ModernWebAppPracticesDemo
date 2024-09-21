const authorElement = document.getElementById("author-name");
const canvas = document.getElementById("animated-bg");
const ctx = canvas.getContext("2d");
const body = document.documentElement;
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navUl = document.querySelector("nav ul");
const heroTitle = document.querySelector(".hero h1");
const cardsTitle = document.querySelector(".card-section h2");
const modeToggle = document.querySelector(".dark-mode-toggle");

let particles = [];
const authorName = "rhawk117";

function typeAuthorName() {
  let i = 0;
  function type() {
    if (i < authorName.length) {
      authorElement.textContent += authorName.charAt(i);
      i++;
      setTimeout(type, 150);
    }
  }
  setTimeout(type, 1000);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const particleCount = 100;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = document.documentElement.classList.contains("dark-mode")
    ? "#ffffff"
    : "#000000";
  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();

    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > canvas.width) {
      particle.speedX *= -1;
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.speedY *= -1;
    }
  });
  requestAnimationFrame(drawParticles);
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");
  modeToggle.setAttribute("aria-checked", isDarkMode);
});

hamburgerMenu.addEventListener("click", () => {
  navUl.classList.toggle("show");
  hamburgerMenu.classList.toggle("active");
  hamburgerMenu.setAttribute("aria-expanded", navUl.classList.contains("show"));
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
    if (window.innerWidth <= 768) {
      navUl.classList.remove("show");
      hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
      hamburgerMenu.setAttribute("aria-expanded", "false");
    }
  });
});

function fadeInElement(element) {
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  }, 500);
}

window.addEventListener("load", () => {
  fadeInElement(heroTitle);
  setTimeout(() => {
    typeAuthorName();
    fadeInElement(cardsTitle);
  }, 1000);
  resizeCanvas();
  createParticles();
  drawParticles();
});

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});