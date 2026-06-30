const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    icon.classList.replace('fa-sun', 'fa-moon');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
  }
});

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  });
});

const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

const skillSection = document.getElementById('skills');
const skillFills = document.querySelectorAll('.skill-item__fill');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillFills.forEach(fill => {
        const width = fill.dataset.width;
        fill.style.width = width + '%';
      });
    }
  });
}, { threshold: 0.3 });

skillObserver.observe(skillSection);

const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const nameError = name.nextElementSibling;
  const emailError = email.nextElementSibling;
  const messageError = message.nextElementSibling;

  [name, email, message].forEach(el => el.classList.remove('error'));
  [nameError, emailError, messageError].forEach(el => el.textContent = '');

  if (name.value.trim().length < 2) {
    name.classList.add('error');
    nameError.textContent = 'Name must be at least 2 characters.';
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    email.classList.add('error');
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (message.value.trim().length < 10) {
    message.classList.add('error');
    messageError.textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (valid) {
    formSuccess.classList.add('visible');
    form.reset();
    setTimeout(() => formSuccess.classList.remove('visible'), 4000);
  }
});
