// W3Schools-style slideshow logic, enhanced with autoplay, hover pause, and keyboard support.
// NOTE: First slide is visible by default via CSS for instant display on load.

let slideIndex = 1;
let timer = null;
const AUTOPLAY_MS = 15000; // keep your current timing; change to 20000 if you want 20s

const slides = () => Array.from(document.querySelectorAll('.mySlides'));
const dots   = () => Array.from(document.querySelectorAll('.dot'));

function showSlides(n) {
  const s = slides();
  const d = dots();
  if (s.length === 0) return;

  if (n > s.length) { slideIndex = 1; }
  else if (n < 1)   { slideIndex = s.length; }
  else              { slideIndex = n; }

  s.forEach(sl => sl.style.display = 'none');
  d.forEach(dot => dot.classList.remove('active'));
  d.forEach(dot => dot.setAttribute('aria-selected', 'false'));

  s[slideIndex - 1].style.display = 'block';
  d[slideIndex - 1]?.classList.add('active');
  d[slideIndex - 1]?.setAttribute('aria-selected', 'true');
}

function plusSlides(n) { showSlides(slideIndex + n); }
function currentSlide(n) { showSlides(n); }

function startAutoplay() {
  stopAutoplay();
  timer = setInterval(() => plusSlides(1), AUTOPLAY_MS);
}
function stopAutoplay() {
  if (timer) clearInterval(timer);
  timer = null;
}

document.addEventListener('DOMContentLoaded', () => {
  // First slide is already visible by CSS; this sets the correct state and dots
  showSlides(slideIndex);
  startAutoplay();

  document.querySelector('.prev')?.addEventListener('click', () => { plusSlides(-1); startAutoplay(); });
  document.querySelector('.next')?.addEventListener('click', () => { plusSlides(1); startAutoplay(); });
  dots().forEach((dot, i) => dot.addEventListener('click', () => { currentSlide(i + 1); startAutoplay(); }));

  const container = document.querySelector('.slideshow-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { plusSlides(-1); startAutoplay(); }
    if (e.key === 'ArrowRight') { plusSlides(1);  startAutoplay(); }
  });
});
