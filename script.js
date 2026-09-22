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
    aboutObserver.observe(skillsSection);
}

// animacion Proyectos //

const projectsSection = document.querySelector('#projects');

if (projectsSection && typeof aboutObserver !== 'undefined') {
    aboutObserver.observe(projectsSection);
}

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector('.carrusel-track');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (!track) return;

    let dots = [];
    let scrollPositions = [];

    const getScrollPositions = () => {
        const cards = Array.from(track.querySelectorAll('.project'));

        if (cards.length === 0) return [];

        const maxScroll = track.scrollWidth - track.clientWidth;

        const positions = cards
            .map(card => Math.min(card.offsetLeft - track.offsetLeft, maxScroll))
            .filter((position, index, array) => {
                return index === 0 || position !== array[index - 1];
            });

        return [...new Set(positions)];
    };

    const setupDots = () => {

        if (!indicatorsContainer) return;
        scrollPositions = getScrollPositions();
        indicatorsContainer.innerHTML = '';
        dots = [];
        scrollPositions.forEach((position, index) => {

            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Ir al proyecto ${index + 1}`);

            if (index === 0) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            }

            dot.addEventListener('click', () => {
                track.scrollTo({
                    left: position,
                    behavior: 'smooth'
                });
            });

            indicatorsContainer.appendChild(dot);
            dots.push(dot);
        });

        updateDots();
    };

    const updateDots = () => {

        if (dots.length === 0 || scrollPositions.length === 0) return;

        const currentScroll = track.scrollLeft;
        let activeIndex = 0;
        let smallestDifference = Infinity;

        scrollPositions.forEach((position, index) => {
            const difference = Math.abs(currentScroll - position);

            if (difference < smallestDifference) {
                smallestDifference = difference;
                activeIndex = index;
            }
        });

        dots.forEach((dot, index) => {

            const isActive = index === activeIndex;
            dot.classList.toggle('active', isActive);

            if (isActive) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });
    };

    const goNext = () => {

        if (scrollPositions.length === 0) return;

        const currentScroll = track.scrollLeft;
        const nextPosition = scrollPositions.find(
            position => position > currentScroll + 5
        );

        if (nextPosition !== undefined) {
            track.scrollTo({
                left: nextPosition,
                behavior: 'smooth'
            });
        }
    };

    const goPrevious = () => {

        if (scrollPositions.length === 0) return;

        const currentScroll = track.scrollLeft;
        const previousPositions = scrollPositions.filter(
            position => position < currentScroll - 5
        );

        if (previousPositions.length > 0) {

            const previousPosition =
                previousPositions[previousPositions.length - 1];
            track.scrollTo({
                left: previousPosition,
                behavior: 'smooth'
            });
        }
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', goNext);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', goPrevious);
    }

    track.addEventListener('scroll', updateDots, { passive: true });
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setupDots();
        }, 150);
    });
    setTimeout(setupDots, 150);
});