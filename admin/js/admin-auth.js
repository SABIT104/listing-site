document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('bb_admin_token');
  const path = window.location.pathname;
  
  if (!path.includes('login.html')) {
    if (!token) {
      window.location.href = '../login.html';
    } else {
      // In a real app we would verify the token via API
      try {
        const payload = JSON.parse(atob(token.split('.')[1] || ''));
        if(payload.role !== 'admin') throw new Error();
      } catch (e) {
        // mock valid check since we just use static user for now
        if (token !== 'mock_admin_token_s@bit') {
           window.location.href = '../login.html';
        }
      }
      
      const parts = document.querySelectorAll('.admin-name-display');
      parts.forEach(p => p.textContent = 'Admin');
    }
  }
});

function logout() {
  localStorage.removeItem('bb_admin_token');
  window.location.href = '../login.html';
}