//  animacion sobre mi  //
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


// script movil //
const mobileNav = document.getElementById('mobileNav');
if (mobileNav) {
    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const bsCollapse = bootstrap.Collapse.getInstance(mobileNav);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
    });
}

//  animacion del hero  //
const heroSection = document.getElementById('home');
if (heroSection) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { 
        threshold: 0.15 
    });
    sectionObserver.observe(heroSection);

    document.querySelectorAll('a[href="#home"], .brand-stamp').forEach(link => {
        link.addEventListener('click', () => {
            heroSection.classList.remove('is-visible');
            void heroSection.offsetWidth; 
            heroSection.classList.add('is-visible');
        });
    });
}

//  animacion Skills //
const skillsSection = document.querySelector('#skills');

if (skillsSection) {
    // Usamos el aboutObserver que ya creamos en el paso anterior
    aboutObserver.observe(skillsSection);
}