// Animación de aparición para la sección About
const aboutSection = document.querySelector('#about');

const aboutObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    },
    {
        threshold: 0.15
    }
);

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}
