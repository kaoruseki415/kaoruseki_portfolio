// Hamburger menu toggle for responsive navigation

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navButtons = document.querySelector('.navbar .buttons');

  if (hamburger && navButtons) {
    hamburger.addEventListener('click', function () {
      navButtons.classList.toggle('active');
      hamburger.classList.toggle('open');
    });
    // Optional: Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navButtons.contains(e.target)) {
        navButtons.classList.remove('active');
        hamburger.classList.remove('open');
      }
    });
  }

  // Dropdown click toggle for Projects menu (works on all screen sizes)
  document.querySelectorAll('.dropdown').forEach(function(dropdown) {
    const button = dropdown.querySelector('.button');
    const menu = dropdown.querySelector('.dropdown-content');
    if (button && menu) {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        // Close other open dropdowns
        document.querySelectorAll('.dropdown-content').forEach(function(otherMenu) {
          if (otherMenu !== menu) otherMenu.classList.remove('show');
        });
        menu.classList.toggle('show');
      });
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
          menu.classList.remove('show');
        }
      });
      // Optional: Close dropdown when a link is clicked
      menu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          menu.classList.remove('show');
          // Close mobile menu if open
          if (navButtons.classList.contains('active')) {
            navButtons.classList.remove('active');
            hamburger.classList.remove('open');
          }
        });
      });
    }
  });

  // Close mobile menu when clicking on navigation links
  document.querySelectorAll('.navbar .buttons a:not(.dropdown .button)').forEach(function(link) {
    link.addEventListener('click', function() {
      if (navButtons.classList.contains('active')) {
        navButtons.classList.remove('active');
        hamburger.classList.remove('open');
      }
    });
  });
});

// Skills scroll functionality
document.addEventListener('DOMContentLoaded', function() {
  const skillsContainer = document.querySelector('.skills-container');
  const leftArrow = document.querySelector('.scroll-left');
  const rightArrow = document.querySelector('.scroll-right');
  
  if (skillsContainer && leftArrow && rightArrow) {
    const scrollAmount = 300; // Scroll by 300px each time
    
    // Arrow navigation
    leftArrow.addEventListener('click', function() {
      skillsContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    rightArrow.addEventListener('click', function() {
      skillsContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Drag scrolling functionality
    let isDown = false;
    let startX;
    let scrollLeft;
    
    skillsContainer.addEventListener('mousedown', function(e) {
      isDown = true;
      skillsContainer.style.cursor = 'grabbing';
      startX = e.pageX - skillsContainer.offsetLeft;
      scrollLeft = skillsContainer.scrollLeft;
    });
    
    skillsContainer.addEventListener('mouseleave', function() {
      isDown = false;
      skillsContainer.style.cursor = 'grab';
    });
    
    skillsContainer.addEventListener('mouseup', function() {
      isDown = false;
      skillsContainer.style.cursor = 'grab';
    });
    
    skillsContainer.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - skillsContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      skillsContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Touch scrolling for mobile devices
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    skillsContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = skillsContainer.scrollLeft;
    });
    
    skillsContainer.addEventListener('touchmove', function(e) {
      if (!touchStartX) return;
      
      const touchX = e.touches[0].pageX;
      const walk = (touchStartX - touchX) * 2;
      skillsContainer.scrollLeft = touchScrollLeft + walk;
    });
    
    skillsContainer.addEventListener('touchend', function() {
      touchStartX = 0;
    });
    
    // Show/hide arrows based on scroll position
    function updateArrowVisibility() {
      leftArrow.style.opacity = skillsContainer.scrollLeft > 0 ? '1' : '0.5';
      rightArrow.style.opacity = 
        skillsContainer.scrollLeft < (skillsContainer.scrollWidth - skillsContainer.clientWidth) ? '1' : '0.5';
    }
    
    skillsContainer.addEventListener('scroll', updateArrowVisibility);
    updateArrowVisibility(); // Initial state
  }
});
