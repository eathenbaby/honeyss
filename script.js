/**
 * HONEY'S BRIDAL STUDIO — script.js
 * Clean, performant interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       LOADER
       ============================================ */
    const loader = document.getElementById('loader');
    const heroBg = document.querySelector('.hero-bg');

    const hideLoader = () => {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => { loader.style.display = 'none'; }, 900);
            document.body.classList.remove('no-scroll');
        }
        if (heroBg) heroBg.classList.add('loaded');
    };

    document.body.classList.add('no-scroll');

    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 1600);
    } else {
        window.addEventListener('load', () => setTimeout(hideLoader, 1600));
    }
    // Fallback
    setTimeout(hideLoader, 4000);


    /* ============================================
       NAV SCROLL STATE
       ============================================ */
    const nav = document.getElementById('nav');

    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();


    /* ============================================
       MOBILE MENU
       ============================================ */
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMenu = () => {
        mobileMenu.classList.add('open');
        document.body.classList.add('no-scroll');
    };
    const closeMenu = () => {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
    };

    if (burger) burger.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));


    /* ============================================
       SCROLL REVEAL (IntersectionObserver)
       ============================================ */
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => observer.observe(el));


    /* ============================================
       HERO PARALLAX (Desktop Only)
       ============================================ */
    const heroBgEl = document.querySelector('.hero-bg');

    if (heroBgEl && window.innerWidth > 768) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;
                    if (y < window.innerHeight) {
                        heroBgEl.style.transform = `scale(1) translateY(${y * 0.3}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }


    /* ============================================
       SMOOTH ANCHOR SCROLL
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = nav ? nav.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});
