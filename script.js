window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;

  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

const heroVisualWrap = document.getElementById('heroVisualWrap');
const portraitLayer = document.getElementById('portraitLayer');

if (heroVisualWrap && portraitLayer) {
  heroVisualWrap.addEventListener('mousemove', (event) => {
    const rect = heroVisualWrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

    const moveX = -(offsetX / rect.width) * 18;
    const moveY = -(offsetY / rect.height) * 18;

    portraitLayer.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
  });

  heroVisualWrap.addEventListener('mouseleave', () => {
    portraitLayer.style.transform = 'translate(0px, 0px) scale(1)';
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