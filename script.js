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
      const isOpen = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px';
      mobileMenu.style.maxHeight = isOpen ? '0px' : mobileMenu.scrollHeight + 'px';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.maxHeight = '0px';
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
  let currentIdx = 0;

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
    },
    { root: aboutScroller, threshold: [0.4, 0.6] }
  );

  slides.forEach(s => ioAbout.observe(s));
}

// Video Autoplay on Hover
function setupVideoAutoplay() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    const parent = video.closest('.portfolio-item') || video.closest('.group');
    if (parent) {
      parent.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
      parent.addEventListener('mouseleave', () => {
        video.currentTime = 0;
        video.pause();
      });
    }
  });
}

// Optimize Performance: Throttle scroll events
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
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
