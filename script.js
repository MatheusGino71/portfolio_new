import './src/style.css';

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initializePortfolio();
});

// Mobile Menu Toggle
function initializePortfolio() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.style.display === 'block';
      if (isOpen) {
        mobileMenu.style.maxHeight = '0px';
        setTimeout(() => { mobileMenu.style.display = 'none'; }, 300);
      } else {
        mobileMenu.style.display = 'block';
        requestAnimationFrame(() => {
          mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        });
      }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.maxHeight = '0px';
        setTimeout(() => { mobileMenu.style.display = 'none'; }, 300);
      });
    });
  }

  // Carousel Logic
  setupCarousel();
  
  // Filter Logic
  setupFilter();
  
  // Scroll Animations
  setupScrollAnimations();
  
  // About Scroll Syncing
  setupAboutScroll();
  
  // Video Autoplay
  setupVideoAutoplay();

  // Active Nav on Scroll
  setupActiveNav();

  // Back-to-top
  setupBackToTop();
}

// Carousel Setup
function setupCarousel() {
  const scroller = document.getElementById('work-carousel');
  if (!scroller) return;

  const cards = Array.from(scroller.querySelectorAll('article'));

  function setActiveCard() {
    const centerX = scroller.scrollLeft + scroller.clientWidth / 2;
    let closest = { el: null, dist: Infinity, idx: -1 };
    
    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - window.innerWidth / 2);
      if (dist < closest.dist) closest = { el: card, dist, idx };
    });
    
    cards.forEach((card, idx) => {
      const isActive = card === closest.el;
      card.style.transform = isActive ? 'scale(1)' : 'scale(0.94)';
      card.style.opacity = isActive ? '1' : '0.55';
    });
  }

  scroller.addEventListener('scroll', () => requestAnimationFrame(setActiveCard));
  window.addEventListener('load', () => requestAnimationFrame(setActiveCard));
}

// Filter Logic
function setupFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.classList.replace('text-white/80', 'text-white/60');
      });

      btn.classList.add('active');
      btn.classList.replace('text-white/60', 'text-white/80');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Scroll Animations
function setupScrollAnimations() {
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('animate');
          animObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animObserver.observe(el);
  });
}

// About Scroll Syncing
function setupAboutScroll() {
  const aboutScroller = document.querySelector('#aboutScroll');
  if (!aboutScroller) return;

  const slides = [...aboutScroller.querySelectorAll('.about-content-item')];
  const images = [...document.querySelectorAll('.about-image')];
  const dots = [...document.querySelectorAll('.about-dot')];
  let currentIdx = 0;

  function setDot(idx) {
    dots.forEach((d, i) => {
      d.style.background = i === idx ? 'white' : 'rgba(255,255,255,0.25)';
      d.style.width = i === idx ? '20px' : '8px';
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.idx, 10);
      slides[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  const ioAbout = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const idx = slides.indexOf(visible.target);
      if (idx === -1 || idx === currentIdx) return;

      slides[currentIdx].classList.remove('active');
      slides[idx].classList.add('active');

      images[currentIdx].classList.remove('active');
      images[currentIdx].style.opacity = '0';
      images[currentIdx].style.transform = 'translateY(-24px)';

      images[idx].style.transform = 'translateY(24px)';
      requestAnimationFrame(() => {
        images[idx].classList.add('active');
        images[idx].style.opacity = '1';
        images[idx].style.transform = 'translateY(0)';
      });

      currentIdx = idx;
      setDot(idx);
    },
    { root: aboutScroller, threshold: [0.4, 0.6] }
  );

  slides.forEach(s => ioAbout.observe(s));
  setDot(0);
}

// Video Autoplay: hover for grid, viewport-based for carousel
function setupVideoAutoplay() {
  const carouselVideos = document.querySelectorAll('#work-carousel video');
  const gridVideos = document.querySelectorAll('#portfolio-grid video');

  // Carousel: play when card is the active/center one
  if (carouselVideos.length) {
    const carouselObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          const video = e.target.querySelector('video');
          if (!video) return;
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { root: document.getElementById('work-carousel'), threshold: 0.5 }
    );
    document.querySelectorAll('#work-carousel article').forEach(card => {
      carouselObserver.observe(card);
    });
  }

  // Grid: play on hover
  gridVideos.forEach(video => {
    const parent = video.closest('.portfolio-item');
    if (parent) {
      parent.addEventListener('mouseenter', () => video.play().catch(() => {}));
      parent.addEventListener('mouseleave', () => { video.currentTime = 0; video.pause(); });
    }
  });
}

// Active Nav on Scroll
function setupActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;

  const sectionIds = [...navLinks].map(l => l.dataset.section).filter(Boolean);
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('nav-active'));
          const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
          if (active) active.classList.add('nav-active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
}

// Back-to-top
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
