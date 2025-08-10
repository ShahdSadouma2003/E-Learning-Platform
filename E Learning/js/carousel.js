// W3Schools-style slideshow logic, enhanced with autoplay, hover pause, and keyboard support.

let slideIndex = 1;
let timer = null;
const AUTOPLAY_MS = 20000; // 20 seconds per slide

const slides = () => Array.from(document.querySelectorAll('.mySlides'));
const dots   = () => Array.from(document.querySelectorAll('.dot'));

function showSlides(n) {
  const s = slides();
  const d = dots();

  if (s.length === 0) return;

  // wrap-around
  if (n > s.length) { slideIndex = 1; }
  else if (n < 1)   { slideIndex = s.length; }
  else              { slideIndex = n; }

  // hide all
  s.forEach(sl => sl.style.display = 'none');
  d.forEach(dot => dot.classList.remove('active'));
  d.forEach(dot => dot.setAttribute('aria-selected', 'false'));

  // show current
  s[slideIndex - 1].style.display = 'block';
  d[slideIndex - 1].classList.add('active');
  d[slideIndex - 1].setAttribute('aria-selected', 'true');
}

function plusSlides(n) { showSlides(slideIndex + n); }
function currentSlide(n) { showSlides(n); }

// autoplay
function startAutoplay() {
  stopAutoplay();
  timer = setInterval(() => plusSlides(1), AUTOPLAY_MS);
}
function stopAutoplay() {
  if (timer) clearInterval(timer);
  timer = null;
}

// init
document.addEventListener('DOMContentLoaded', () => {
  // first render
  showSlides(slideIndex);
  startAutoplay();

  // controls
  document.querySelector('.prev')?.addEventListener('click', () => { plusSlides(-1); startAutoplay(); });
  document.querySelector('.next')?.addEventListener('click', () => { plusSlides(1); startAutoplay(); });
  dots().forEach((dot, i) => dot.addEventListener('click', () => { currentSlide(i + 1); startAutoplay(); }));

  // hover pause on the container
  const container = document.querySelector('.slideshow-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
  }

  // keyboard support (left/right)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { plusSlides(-1); startAutoplay(); }
    if (e.key === 'ArrowRight') { plusSlides(1);  startAutoplay(); }
  });
});
