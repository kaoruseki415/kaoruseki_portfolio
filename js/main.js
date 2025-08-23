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

// Timeline scroll functionality
document.addEventListener('DOMContentLoaded', function() {
  const timelineScrollBtn = document.getElementById('timeline-scroll-btn');
  const timelineScrollLeftBtn = document.getElementById('timeline-scroll-left-btn');
  const timeline = document.querySelector('.timeline');
  
  if (timelineScrollBtn && timeline) {
    timelineScrollBtn.addEventListener('click', function() {
      // Scroll the timeline to the right by 400px
      timeline.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
      
      // Add a subtle click effect
      this.style.transform = 'translateY(-50%) scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'translateY(-50%)';
      }, 150);
    });
  }
  
  if (timelineScrollLeftBtn && timeline) {
    timelineScrollLeftBtn.addEventListener('click', function() {
      // Scroll the timeline to the left by 400px
      timeline.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
      
      // Add a subtle click effect
      this.style.transform = 'translateY(-50%) scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'translateY(-50%)';
      }, 150);
    });
  }
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

// Workshop photo scrolling functionality
function scrollPhotos(workshopId, direction) {
  const grid = document.getElementById(workshopId + '-grid');
  if (!grid) return;
  
  const scrollAmount = 400; // Scroll by 400px each time
  const currentScroll = grid.scrollLeft;
  
  if (direction === 1) {
    // Scroll right
    grid.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  } else {
    // Scroll left
    grid.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: 'smooth'
    });
  }
  
  // Update arrow states after scrolling
  setTimeout(() => {
    updatePhotoArrowStates(workshopId);
  }, 400);
}

// Update arrow states based on scroll position
function updatePhotoArrowStates(workshopId) {
  const grid = document.getElementById(workshopId + '-grid');
  const navContainer = grid.closest('.workshop-photo-nav');
  const prevArrow = navContainer.querySelector('.scroll-arrow.prev');
  const nextArrow = navContainer.querySelector('.scroll-arrow.next');
  
  if (!grid || !prevArrow || !nextArrow) return;
  
  // Check if we can scroll left
  if (grid.scrollLeft <= 0) {
    prevArrow.disabled = true;
    prevArrow.style.opacity = '0.5';
  } else {
    prevArrow.disabled = false;
    prevArrow.style.opacity = '1';
  }
  
  // Check if we can scroll right
  if (grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 10) {
    nextArrow.disabled = true;
    nextArrow.style.opacity = '0.5';
  } else {
    nextArrow.disabled = false;
    nextArrow.style.opacity = '1';
  }
}

// Initialize photo arrow states when page loads
document.addEventListener('DOMContentLoaded', function() {
  const workshopGrids = document.querySelectorAll('.workshop-photo-nav .photo-grid');
  workshopGrids.forEach(function(grid) {
    const workshopId = grid.id.replace('-grid', '');
    updatePhotoArrowStates(workshopId);
    
    // Update arrow states when scrolling manually
    grid.addEventListener('scroll', function() {
      updatePhotoArrowStates(workshopId);
    });
  });
});

// Photo modal functionality
let currentPhotoIndex = 0;
let currentWorkshopPhotos = [];

function openPhotoModal(imageSrc, imageAlt) {
  const modal = document.getElementById('photoModal');
  const modalPhoto = document.getElementById('modalPhoto');
  
  // Find which workshop this photo belongs to and get all photos
  const workshop1Photos = Array.from(document.querySelectorAll('#workshop1-grid .workshop-photo-container img')).map(img => ({
    src: img.src,
    alt: img.alt
  }));
  
  const workshop2Photos = Array.from(document.querySelectorAll('#workshop2-grid .workshop-photo-container img')).map(img => ({
    src: img.src,
    alt: img.alt
  }));
  
  // Determine which workshop and find the index
  let foundIndex = -1;
  if (workshop1Photos.some(photo => photo.src.includes(imageSrc.split('/').pop()))) {
    currentWorkshopPhotos = workshop1Photos;
    foundIndex = workshop1Photos.findIndex(photo => photo.src.includes(imageSrc.split('/').pop()));
  } else if (workshop2Photos.some(photo => photo.src.includes(imageSrc.split('/').pop()))) {
    currentWorkshopPhotos = workshop2Photos;
    foundIndex = workshop2Photos.findIndex(photo => photo.src.includes(imageSrc.split('/').pop()));
  }
  
  currentPhotoIndex = foundIndex >= 0 ? foundIndex : 0;
  
  modalPhoto.src = imageSrc;
  modalPhoto.alt = imageAlt;
  modal.classList.add('show');
  
  // Update navigation arrows
  updateModalNavigation();
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
  const modal = document.getElementById('photoModal');
  modal.classList.remove('show');
  
  // Restore body scrolling
  document.body.style.overflow = 'auto';
}

function navigateModal(direction) {
  if (currentWorkshopPhotos.length === 0) return;
  
  currentPhotoIndex += direction;
  
  // Handle wrapping around
  if (currentPhotoIndex < 0) {
    currentPhotoIndex = currentWorkshopPhotos.length - 1;
  } else if (currentPhotoIndex >= currentWorkshopPhotos.length) {
    currentPhotoIndex = 0;
  }
  
  const photo = currentWorkshopPhotos[currentPhotoIndex];
  const modalPhoto = document.getElementById('modalPhoto');
  
  modalPhoto.src = photo.src;
  modalPhoto.alt = photo.alt;
  
  // Update navigation arrows
  updateModalNavigation();
}

function updateModalNavigation() {
  const prevArrow = document.querySelector('.modal-nav-arrow.prev');
  const nextArrow = document.querySelector('.modal-nav-arrow.next');
  
  if (currentWorkshopPhotos.length <= 1) {
    // Disable both arrows if there's only one photo
    prevArrow.disabled = true;
    nextArrow.disabled = true;
  } else {
    // Enable both arrows for multiple photos
    prevArrow.disabled = false;
    nextArrow.disabled = false;
  }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('photoModal');
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closePhotoModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closePhotoModal();
    }
  });
});
