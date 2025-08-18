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

// Photo navigation functionality for workshop photos
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.workshop-photos').forEach(function(workshopSection) {
    const photoGrid = workshopSection.querySelector('.photo-grid');
    const prevArrow = workshopSection.querySelector('.photo-nav-arrow.prev');
    const nextArrow = workshopSection.querySelector('.photo-nav-arrow.next');
    
    if (photoGrid && prevArrow && nextArrow) {
      const scrollAmount = 220; // Scroll by photo width + gap
      
      // Previous photo
      prevArrow.addEventListener('click', function() {
        photoGrid.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      });
      
      // Next photo
      nextArrow.addEventListener('click', function() {
        photoGrid.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      });
      
      // Show/hide arrows based on scroll position
      photoGrid.addEventListener('scroll', function() {
        // Show/hide prev arrow
        if (photoGrid.scrollLeft <= 0) {
          prevArrow.style.opacity = '0.5';
          prevArrow.style.pointerEvents = 'none';
        } else {
          prevArrow.style.opacity = '1';
          prevArrow.style.pointerEvents = 'auto';
        }
        
        // Show/hide next arrow
        if (photoGrid.scrollLeft >= photoGrid.scrollWidth - photoGrid.clientWidth - 10) {
          nextArrow.style.opacity = '0.5';
          nextArrow.style.pointerEvents = 'none';
        } else {
          nextArrow.style.opacity = '1';
          nextArrow.style.pointerEvents = 'auto';
        }
      });
      
      // Initialize arrow states
      prevArrow.style.opacity = '0.5';
      prevArrow.style.pointerEvents = 'none';
    }
  });
});

// Contact form success message handling
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the contact page and have a success parameter
  if (window.location.pathname.includes('contact.html') || window.location.pathname.includes('contact')) {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    if (success === 'true') {
      const successMessage = document.getElementById('success-message');
      if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.classList.add('show');
        
        // Scroll to the success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove the success parameter from URL without reloading
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }
  
  // Skills scrolling functionality for project pages
  const skillsContainers = document.querySelectorAll('.skills-container');
  skillsContainers.forEach(function(container) {
    const leftArrow = container.parentElement.querySelector('.scroll-left');
    const rightArrow = container.parentElement.querySelector('.scroll-right');
    
    if (leftArrow && rightArrow) {
      const scrollAmount = 200;
      
      leftArrow.addEventListener('click', function() {
        container.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      });
      
      rightArrow.addEventListener('click', function() {
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      });
      
      // Show/hide arrows based on scroll position
      container.addEventListener('scroll', function() {
        if (container.scrollLeft <= 0) {
          leftArrow.style.opacity = '0.5';
          leftArrow.style.pointerEvents = 'none';
        } else {
          leftArrow.style.opacity = '1';
          leftArrow.style.pointerEvents = 'auto';
        }
        
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
          rightArrow.style.opacity = '0.5';
          rightArrow.style.pointerEvents = 'none';
        } else {
          rightArrow.style.opacity = '1';
          rightArrow.style.pointerEvents = 'auto';
        }
      });
      
      // Initialize arrow states
      leftArrow.style.opacity = '0.5';
      leftArrow.style.pointerEvents = 'none';
    }
  });
});
