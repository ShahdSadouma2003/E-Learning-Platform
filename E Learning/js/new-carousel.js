let currentSlideIndex = 1;
let autoplayTimer = null;
const AUTOPLAY_INTERVAL = 5000; // 5 seconds

function showSlide(n) {
    const slides = document.querySelectorAll('.new-carousel-slide');
    const dots = document.querySelectorAll('.new-carousel-dot');

    if (slides.length === 0) return;

    if (n > slides.length) {
        currentSlideIndex = 1;
    } else if (n < 1) {
        currentSlideIndex = slides.length;
    } else {
        currentSlideIndex = n;
    }

    // Hide all slides and remove active classes
    slides.forEach(slide => {
        slide.classList.remove('active-slide');
        slide.style.display = 'none';
    });
    dots.forEach(dot => dot.classList.remove('active'));

    // Show the current slide and add active classes
    slides[currentSlideIndex - 1].style.display = 'block';
    slides[currentSlideIndex - 1].classList.add('active-slide');
    dots[currentSlideIndex - 1].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
}

function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
}

function initializeCarousel() {
    showSlide(currentSlideIndex);
    startAutoplay();

    document.querySelector('.new-carousel-next').addEventListener('click', () => {
        nextSlide();
        startAutoplay();
    });
    document.querySelector('.new-carousel-prev').addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
        startAutoplay();
    });

    document.querySelectorAll('.new-carousel-dot').forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideId = parseInt(event.target.dataset.slideId, 10);
            showSlide(slideId);
            startAutoplay();
        });
    });

    const carousel = document.querySelector('.new-carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }
}

document.addEventListener('DOMContentLoaded', initializeCarousel);