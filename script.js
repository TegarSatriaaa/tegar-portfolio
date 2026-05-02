// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    follower.style.width = '50px';
    follower.style.height = '50px';
    follower.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.opacity = '0.6';
  });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navbar.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navbar.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// ===== TYPED TEXT =====
const phrases = ['Web Developer', 'UI/UX Designer', 'AI Enthusiast', 'Frontend Dev', 'Apps Developer'];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');
function typeLoop() {
  const phrase = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = phrase.substring(0, charIdx--);
    if (charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 60);
  } else {
    typedEl.textContent = phrase.substring(0, charIdx++);
    if (charIdx > phrase.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 110);
  }
}
typeLoop();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== SKILL BARS ANIMATE =====
const skillFills = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.getPropertyValue('--w') || '0%';
    } else {
      entry.target.style.width = '0%';
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => {
  f.style.width = '0%';
  barObserver.observe(f);
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim() || 'Pesan dari Portfolio';
    const message = form.querySelector('#message').value.trim();
    const mailtoLink = `mailto:tegarsatria481@gmail.com?subject=${encodeURIComponent(subject + ' - dari ' + name)}&body=${encodeURIComponent('Nama: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    window.open(mailtoLink);
    const btn = form.querySelector('.form-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="bx bx-check"></i> Terkirim!';
    btn.style.background = '#2ecc71';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 3000);
  });
}

// ===== SMOOTH SCROLL POLYFILL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== SECTION NUMBERS COUNTER =====
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
