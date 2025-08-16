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
