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

    // 2. Register a new user via API
    register: async function(name, email, password) {
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            
            if (data.success) {
                // Auto-login after successful registration
                return await this.login(email, password);
            } else {
                return { success: false, message: data.message || 'নিবন্ধনে সমস্যা হয়েছে।' };
            }
        } catch (err) {
            console.error('Registration error:', err);
            return { success: false, message: 'সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে।' };
        }
    },

    // 3. Login user via API
    login: async function(email, password, isAdmin = false) {
        try {
            const url = isAdmin ? '/api/admin/login' : '/api/login';
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                const session = { 
                    id: data.user ? data.user.id : 'admin', 
                    name: data.user ? data.user.name : (data.name || 'Admin'), 
                    email: email, 
                    role: isAdmin ? 'admin' : (data.user ? (data.user.role || 'user') : 'user'),
                    loginAt: new Date().toISOString() 
                };
                localStorage.setItem('bb_session', JSON.stringify(session));
                return { success: true };
            } else {
                return { success: false, message: data.message || 'ভুল ইমেইল অথবা পাসওয়ার্ড!' };
            }
        } catch (err) {
            console.error('Login error:', err);
            return { success: false, message: 'সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে।' };
        }
    },

    // 4. Logout user
    logout: function() {
        localStorage.removeItem('bb_session');
        const isSubfolder = window.location.pathname.includes('/auth/') || 
                           window.location.pathname.includes('/dashboard/') ||
                           window.location.pathname.includes('/listings/') ||
                           window.location.pathname.includes('/categories/') ||
                           window.location.pathname.includes('/info/');
        const prefix = isSubfolder ? '../' : '';
        window.location.href = prefix + 'auth/login.html';
    },

    // 5. Update Navbar based on Auth State
    syncNavbar: function() {
        const session = this.getSession();
        const topbarLinks = document.querySelector('.topbar-links');
        const headerNav = document.querySelector('.header-nav');

        const isSubfolder = window.location.pathname.includes('/auth/') || 
                           window.location.pathname.includes('/dashboard/') ||
                           window.location.pathname.includes('/listings/') ||
                           window.location.pathname.includes('/categories/') ||
                           window.location.pathname.includes('/info/');
        const prefix = isSubfolder ? '../' : '';

        if (session && topbarLinks) {
            topbarLinks.innerHTML = `
                <span>স্বাগতম, <b>${session.name}</b></span> | 
                <a href="${prefix}dashboard/user-dashboard.html" style="font-weight:700; color:var(--yp2);">ড্যাশবোর্ড</a> | 
                <a href="#" onclick="Auth.logout()">লগআউট</a>
            `;
        }

        // Redirect "Add Listing" button to login if not authenticated
        const addBtn = document.querySelector('.btn-add');
        if (addBtn && !session) {
            addBtn.href = `${prefix}auth/login.html?redirect=listings/add-listing.html`;
        } else if (addBtn) {
            addBtn.href = `${prefix}listings/add-listing.html`;
        }
    },

    // 6. Protect individual pages
    protectPage: function() {
        if (!this.getSession()) {
            const isSubfolder = window.location.pathname.includes('/dashboard/') ||
                               window.location.pathname.includes('/listings/');
            const prefix = isSubfolder ? '../' : '';
            const currentPath = window.location.pathname.split('/').pop();
            const folder = window.location.pathname.split('/').slice(-2, -1)[0];
            const redirectPath = (folder && folder !== 'last') ? `${folder}/${currentPath}` : currentPath;
            window.location.href = `${prefix}auth/login.html?redirect=${redirectPath}`;
        }
    }
};

// Auto-sync navbar on all pages
document.addEventListener('DOMContentLoaded', () => {
    Auth.syncNavbar();
});
