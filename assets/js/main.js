/**
 * ViVpod Main JavaScript
 * Handles mobile menu, modal, smooth scrolling, and interactive elements
 */

(function() {
  'use strict';

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      this.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('active')) {
      if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle')) {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
          mobileMenuToggle.innerHTML = '☰';
        }
      }
    }
  });

  // Modal functionality
  const modal = document.getElementById('demoModal');
  const modalTriggers = document.querySelectorAll('[data-modal="demo"]');
  const modalClose = document.querySelector('.modal-close');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', function() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
              mobileMenuToggle.innerHTML = '☰';
            }
          }
        }
      }
    });
  });

  // Sticky header on scroll
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // Form submission handling (demo)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // In production, send to backend
      console.log('Form submitted:', data);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.style.cssText = 'background: #4CAF50; color: white; padding: 1rem; border-radius: 6px; margin-top: 1rem; text-align: center;';
      successMsg.textContent = 'Thank you! We\'ll be in touch soon.';
      form.appendChild(successMsg);
      
      // Reset form
      form.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
      
      // Close modal if form is in modal
      if (modal && modal.classList.contains('active')) {
        setTimeout(() => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }, 2000);
      }
    });
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe cards and sections
  document.querySelectorAll('.card, .testimonial-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // Tab functionality for use cases
  const tabButtons = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('aria-controls');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('hidden', '');
      });
      
      // Add active class to clicked button and corresponding panel
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.removeAttribute('hidden');
      }
    });
  });

  // Show sticky CTA on mobile when scrolling down
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta && window.innerWidth <= 768) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 500) {
        stickyCta.style.display = 'block';
      } else {
        stickyCta.style.display = 'none';
      }
    });
  }

  // Simple audio player for demo calls (if exists)
  const audioPlayers = document.querySelectorAll('.demo-player');
  audioPlayers.forEach(player => {
    const playBtn = player.querySelector('.play-btn');
    const audio = player.querySelector('audio');
    
    if (playBtn && audio) {
      playBtn.addEventListener('click', function() {
        if (audio.paused) {
          audio.play();
          playBtn.textContent = '⏸';
        } else {
          audio.pause();
          playBtn.textContent = '▶';
        }
      });
      
      audio.addEventListener('ended', function() {
        playBtn.textContent = '▶';
      });
    }
  });

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  console.log('ViVpod initialized ✓');
})();
