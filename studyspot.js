window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;

  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

const heroVisualWrap = document.getElementById('heroVisualWrap');
const heroImageLayer = document.getElementById('heroImageLayer');

if (heroVisualWrap && heroImageLayer) {
  heroVisualWrap.addEventListener('mousemove', (event) => {
    const rect = heroVisualWrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

    const moveX = -(offsetX / rect.width) * 18;
    const moveY = -(offsetY / rect.height) * 18;

    heroImageLayer.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
  });

  heroVisualWrap.addEventListener('mouseleave', () => {
    heroImageLayer.style.transform = 'translate(0px, 0px) scale(1)';
  });
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach((element) => revealObserver.observe(element));

const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = -((y - centerY) / centerY) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});