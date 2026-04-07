/**
 * BusinessBangla Authentication & Session Logic
 * Manages user accounts and sessions via localStorage.
 */

const Auth = {
    // 1. Get current session
    getSession: function() {
        const session = localStorage.getItem('bb_session');
        return session ? JSON.parse(session) : null;
    },

    // 2. Register a new user
    register: function(name, email, password) {
        const users = JSON.parse(localStorage.getItem('bb_users') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'এই ইমেইলটি ইতিপূর্বে ব্যবহৃত হয়েছে।' };
        }

        const newUser = { id: Date.now(), name, email, password, registeredAt: new Date().toISOString() };
        users.push(newUser);
        localStorage.setItem('bb_users', JSON.stringify(users));
        
        // Auto-login after register
        this.login(email, password);
        return { success: true, message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!' };
    },

    // 3. Login user
    login: function(email, password) {
        const users = JSON.parse(localStorage.getItem('bb_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const session = { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                loginAt: new Date().toISOString() 
            };
            localStorage.setItem('bb_session', JSON.stringify(session));
            return { success: true };
        }
        return { success: false, message: 'ভুল ইমেইল অথবা পাসওয়ার্ড!' };
    },

    // 4. Logout user
    logout: function() {
        localStorage.removeItem('bb_session');
        window.location.href = 'login.html';
    },

    // 5. Update Navbar based on Auth State
    syncNavbar: function() {
        const session = this.getSession();
        const topbarLinks = document.querySelector('.topbar-links');
        const headerNav = document.querySelector('.header-nav');

        if (session && topbarLinks) {
            topbarLinks.innerHTML = `
                <span>স্বাগতম, <b>${session.name}</b></span> | 
                <a href="user-dashboard.html" style="font-weight:700; color:var(--yp2);">ড্যাশবোর্ড</a> | 
                <a href="#" onclick="Auth.logout()">লগআউট</a>
            `;
        }

        // Redirect "Add Listing" button to login if not authenticated
        const addBtn = document.querySelector('.btn-add');
        if (addBtn && !session) {
            addBtn.href = 'login.html?redirect=add-listing.html';
        } else if (addBtn) {
            addBtn.href = 'add-listing.html';
        }
    },

    // 6. Protect individual pages
    protectPage: function() {
        if (!this.getSession()) {
            const currentPath = window.location.pathname.split('/').pop();
            window.location.href = `login.html?redirect=${currentPath}`;
        }
    }
};

// Auto-sync navbar on all pages
document.addEventListener('DOMContentLoaded', () => {
    Auth.syncNavbar();
});
