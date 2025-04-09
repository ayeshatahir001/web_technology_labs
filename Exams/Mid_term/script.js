document.addEventListener('DOMContentLoaded', function () {
    const previousTasksBtn = document.getElementById('previousTasksBtn');
    const megaMenu = document.getElementById('megaMenu');

    previousTasksBtn.addEventListener('click', function (event) {
      event.preventDefault();
      megaMenu.style.display = (megaMenu.style.display === 'block') ? 'none' : 'block';
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.mega-menu-container')) {
        megaMenu.style.display = 'none';
      }
    });
  });