// UI Utilities
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if(!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', async () => {
  // Highlight active menu
  const pName = window.location.pathname.split('/').pop() || 'dashboard.html';
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if(item.getAttribute('href') && item.getAttribute('href').includes(pName)){
      item.classList.add('active');
    }
  });

  // Load badges
  if(window.AdminAPI) {
    try {
      const stats = await AdminAPI.dashboard();
      if(stats && stats.stats) {
        const pending = stats.stats.pendingListings;
        if(pending > 0) {
           const badge = document.getElementById('pending-badge');
           if(badge) {
             badge.textContent = pending;
             badge.style.display = 'inline-block';
           }
        }
      }
      
      const notifs = await AdminAPI.getNotifications();
      if(notifs && notifs.notifications) {
          const unread = notifs.notifications.filter(n=>n.unread).length;
          if(unread > 0){
             const nbadge = document.getElementById('notif-badge');
             if(nbadge){
               nbadge.textContent = unread;
               nbadge.style.display = 'inline-block';
             }
          }
      }
    } catch(e) { }
  }
});