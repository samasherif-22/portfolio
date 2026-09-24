/* ============================================
   SAMA SHERIF — PORTFOLIO JAVASCRIPT
   Smooth interactions & scroll animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll behavior ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.navbar-links a');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // --- Active nav link on scroll ---
  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  // --- Subtle parallax on hero floating elements ---
  const floats = document.querySelectorAll('.hero-float');

  if (floats.length && window.innerWidth > 968) {
    window.addEventListener(
      'mousemove',
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        floats.forEach((el, i) => {
          const factor = (i + 1) * 6;
          el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
      },
      { passive: true }
    );
  }

  // --- Skill pill hover micro-interaction ---
  document.querySelectorAll('.skill-pill').forEach((pill) => {
    pill.addEventListener('mouseenter', function () {
      this.style.transition = 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

  // --- Console greeting ---
  console.log(
    '%c✓ Sama Sherif — Portfolio loaded successfully.',
    'color: #7c3aed; font-weight: bold; font-size: 14px;'
  );
  console.log(
    '%cBuilt with care and attention to detail.',
    'color: #8e8599; font-size: 12px;'
  );
});
