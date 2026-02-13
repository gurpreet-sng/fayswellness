/**
 * main.js - Centralized logic for Fay's Wellness
 */

function loadComponent(elementId, filePath, callback) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(data => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = data;
            if (callback) callback();
        }
      })
      .catch(error => console.error('Error loading component:', error));
}

function initHeader() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.getElementById('headerNav');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuToggle && headerNav && menuOverlay) {
      const menuIcon = '<img src="images/menu.png" alt="Menu">';
      const closeIcon = '<img src="images/close.png" alt="Close">';

      function updateMenuState(isActive) {
        if (isActive) {
          headerNav.classList.add('active');
          menuOverlay.classList.add('active');
          menuToggle.innerHTML = closeIcon;
          document.body.style.overflow = 'hidden';
        } else {
          headerNav.classList.remove('active');
          menuOverlay.classList.remove('active');
          menuToggle.innerHTML = menuIcon;
          document.body.style.overflow = '';
        }
      }

      menuToggle.addEventListener('click', () => {
        const isActive = !headerNav.classList.contains('active');
        updateMenuState(isActive);
      });

      menuOverlay.addEventListener('click', () => {
        updateMenuState(false);
      });
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 767) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });
      }
    });

    // Search Box Logic
    const openSearch = document.getElementById("openSearch");
    const closeSearch = document.getElementById("closeSearch");
    const searchPopup = document.getElementById("searchPopup");

    if (openSearch && searchPopup) {
        openSearch.onclick = function () {
            searchPopup.style.display = "flex";
            const searchInput = document.getElementById("searchInput");
            if (searchInput) searchInput.focus();
        };
    }

    if (closeSearch && searchPopup) {
        closeSearch.onclick = function () {
            searchPopup.style.display = "none";
        };
    }

    // Fix: Close search when clicking outside search field or on overlay
    if (searchPopup) {
        searchPopup.addEventListener('click', function(e) {
            // If the target is the popup itself (the overlay around the box)
            if (e.target === searchPopup) {
                searchPopup.style.display = "none";
            }
        });
    }

    // Initialize Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              // Close mobile menu if open
              const headerNav = document.getElementById('headerNav');
              if (headerNav && headerNav.classList.contains('active')) {
                  const menuToggle = document.getElementById('menuToggle');
                  const menuOverlay = document.getElementById('menuOverlay');
                  headerNav.classList.remove('active');
                  menuOverlay.classList.remove('active');
                  if (menuToggle) menuToggle.innerHTML = '<img src="images/menu.png" alt="Menu">';
                  document.body.style.overflow = '';
              }
            }
          }
        });
    });
}

// Global Loaders
document.addEventListener('DOMContentLoaded', () => {
    const timestamp = new Date().getTime();
    loadComponent('header-placeholder', `header.html?v=${timestamp}`, initHeader);
    loadComponent('footer-placeholder', `footer.html?v=${timestamp}`);
});
