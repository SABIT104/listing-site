// Admin State
let LISTINGS = [];
let BLOGS = [];
let USERS = [];
let REVIEWS = [];
let ADS = [];
let CATEGORIES = [];
let SETTINGS = {};
let STATS = {};
let NOTIFICATIONS = [];
let charts = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    loadTheme();
    
    if (window.lucide) lucide.createIcons();
    
    // Close dropdowns on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-container')) {
            document.getElementById('notificationDropdown').classList.remove('active');
        }
    });
});

async function fetchData() {
    try {
        const [lRes, bRes, uRes, cRes, rRes, sRes, setRes, nRes] = await Promise.all([
            fetch('/api/admin/listings'),
            fetch('/api/blogs'),
            fetch('/api/admin/users'),
            fetch('/api/categories'),
            fetch('/api/reviews'),
            fetch('/api/admin/stats'),
            fetch('/api/admin/settings'),
            fetch('/api/admin/notifications')
        ]);
        const [lData, bData, uData, cData, rData, sData, setData, nData] = await Promise.all([
            lRes.json(), bRes.json(), uRes.json(), cRes.json(), rRes.json(), sRes.json(), setRes.json(), nRes.json()
        ]);
        
        if (lData.success) LISTINGS = lData.listings;
        if (bData.success) BLOGS = bData.blogs;
        if (cData.success) CATEGORIES = cData.categories;
        if (rData.success) REVIEWS = rData.reviews;
        if (sData.success) STATS = sData.stats;
        if (setData.success) SETTINGS = setData.settings;
        if (nData.success) NOTIFICATIONS = nData.notifications;
        if (uData.success) {
            USERS = uData.users.map(u => ({
                ...u,
                role: u.role || 'User',
                status: u.status || 'Active',
                img: `https://ui-avatars.com/api/?name=${u.name}&background=6366F1&color=fff`
            }));
        }
        
        // --- Mock Semi-static Data (for now) ---
        REVIEWS = [
            { id: 1, biz: 'Sultan\'s Dine', user: 'Rahat', rating: 5, comment: 'সেরা কাচ্চি!', status: 'Approved' },
            { id: 2, biz: 'Square Hospital', user: 'Mim', rating: 4, comment: 'ভালো সার্ভিস।', status: 'Pending' }
        ];

        ADS = [
            { id: 1, biz: 'Bashundhara Group', plan: 'Gold', expiry: '2026-05-10', cost: '৳৫,০০০', status: 'Active' },
            { id: 2, biz: 'Kabab Factory', plan: 'Silver', expiry: '2026-04-20', cost: '৳২,০০০', status: 'Expiring' }
        ];

        NOTIFICATIONS = [
            { id: 1, type: 'listing', text: 'নতুন লিস্টিং রিকোয়েস্ট: <b>Star Kabab</b>', time: '২ মিনিট আগে', unread: true },
            { id: 2, type: 'payment', text: 'পেমেন্ট রিসিভড (৳৫,০০০): <b>Bashundhara Group</b>', time: '১৫ মিনিট আগে', unread: true }
        ];

        renderOverview();
        renderListingsTable();
        renderRecentBlogs();
        renderRecentActivity();
        renderFeaturedRequests();
        renderCategoriesTable();
        renderUsersTable();
        renderReviewsTable();
        renderAdsTable();
        renderNotifications();
        initCharts();
        populateFilters();
    } catch (err) {
        console.error('Data Load Error:', err);
    }
}

async function approveListing(id) {
    if(!confirm('আপনি কি এই লিস্টিংটি এপ্রুভ করতে চান?')) return;
    try {
        const res = await fetch(`/api/listings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isLive: true })
        });
        const data = await res.json();
        if(data.success) {
            alert('লিস্টিং সফলভাবে এপ্রুভ করা হয়েছে!');
            fetchData();
        }
    } catch(err) { alert('ত্রুটি হয়েছে!'); }
}

async function deleteListing(id) {
    if(!confirm('আপনি কি নিশ্চিতভাবে এটি ডিলিট করতে চান?')) return;
    try {
        const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if(data.success) {
            alert('সফলভাবে ডিলিট করা হয়েছে!');
            fetchData();
        }
    } catch(err) { alert('ডিলিট করতে সমস্যা হয়েছে!'); }
}

async function handleBlogSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    try {
        const res = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });
        const data = await res.json();
        if(data.success) {
            alert('ব্লগ পাবলিশ হয়েছে!');
            document.getElementById('blogForm').reset();
            fetchData();
        }
    } catch(err) { alert('ব্লগ পাবলিশ করতে সমস্যা হয়েছে!'); }
}

async function addCategory() {
    const name = prompt('ক্যাটাগরির নাম দিন:');
    if(!name) return;
    const icon = prompt('আইকন বা ইমোজি দিন (যেমন: 📚):') || '📌';
    try {
        const res = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, icon })
        });
        const data = await res.json();
        if(data.success) fetchData();
    } catch(err) { alert('ত্রুটি হয়েছে!'); }
}

async function deleteCategory(id) {
    if(!confirm('ক্যাটাগরি ডিলিট করতে চান?')) return;
    try {
        const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        if((await res.json()).success) fetchData();
    } catch(err) { alert('ত্রুটি হয়েছে!'); }
}

async function saveSettings() {
    const siteTitle = document.getElementById('setSiteTitle').value;
    const contactEmail = document.getElementById('setContactEmail').value;
    
    try {
        const res = await fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ siteTitle, contactEmail })
        });
        if((await res.json()).success) {
            alert('সেটিংস সফলভাবে সেভ হয়েছে!');
        }
    } catch(err) { alert('সেভ করতে সমস্যা হয়েছে!'); }
}

async function markAllRead() {
    try {
        await fetch('/api/admin/notifications/read', { method: 'PUT' });
        fetchData();
    } catch(err) { console.error('Error marking as read:', err); }
}

// --- Navigation & UI ---
function switchTab(tabId, el) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
    
    const panel = document.getElementById('tab-' + tabId);
    if(panel) panel.classList.add('active');
    if(el) el.classList.add('active');
    if (window.lucide) lucide.createIcons();
}

function toggleNotifications() {
    document.getElementById('notificationDropdown').classList.toggle('active');
}

function markAllRead() {
    NOTIFICATIONS.forEach(n => n.unread = false);
    renderNotifications();
}

// --- Themes ---
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('admin_theme', newTheme);
    updateThemeUI(newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('admin_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
}

function updateThemeUI(theme) {
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    if (icon && text) {
        if (theme === 'dark') { icon.setAttribute('data-lucide', 'sun'); text.innerText = 'লাইট মোড'; }
        else { icon.setAttribute('data-lucide', 'moon'); text.innerText = 'ডার্ক মোড'; }
        if (window.lucide) lucide.createIcons();
    }
}

// --- Dashboard & Stats ---
function renderOverview() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;

    const stats = [
        { label: "মোট লিস্টিং", val: STATS.totalListings || 0, icon: "list", color: "var(--info)", trend: "+12%", up: true },
        { label: "মোট ইউজার", val: STATS.totalUsers || 0, icon: "users", color: "var(--accent-solid)", trend: "+5%", up: true },
        { label: "মোট আয়", val: "৳" + (STATS.revenue || 0).toLocaleString(), icon: "dollar-sign", color: "#fff", trend: "+8%", up: true, special: "stat-card-revenue" },
        { label: "মোট ব্লগ", val: STATS.totalBlogs || 0, icon: "file-text", color: "var(--warning)", trend: "-1%", up: false }
    ];

    document.getElementById('setSiteTitle').value = SETTINGS.siteTitle || '';
    document.getElementById('setContactEmail').value = SETTINGS.contactEmail || '';

    statsGrid.innerHTML = stats.map(s => `
        <div class="glass-card ${s.special || ''}">
            <div class="stat-header">
                <div class="stat-icon" style="background: ${s.special ? '' : s.color + '20'}; color: ${s.special ? '' : s.color};">
                    <i data-lucide="${s.icon}"></i>
                </div>
                <div class="trend ${s.up ? 'up' : 'down'}" style="${s.special ? 'color: #fff;' : ''}">
                    <i data-lucide="${s.up ? 'trending-up' : 'trending-down'}"></i>
                    ${s.trend}
                </div>
            </div>
            <div class="stat-value">${s.val}</div>
            <div class="stat-label">${s.label}</div>
        </div>
    `).join('');
    
    renderDetailedAnalytics();
    if (window.lucide) lucide.createIcons();
}

function renderDetailedAnalytics() {
    const analyticsPanel = document.getElementById('tab-analytics');
    if (!analyticsPanel) return;

    const topListingsHTML = (STATS.topListings || []).map(l => `
        <tr>
            <td style="font-weight:600;">${l.name}</td>
            <td>${l.category}</td>
            <td>👁️ ${l.views || 0}</td>
        </tr>
    `).join('');

    analyticsPanel.innerHTML = `
        <h1 class="page-title">বিস্তারিত এনালাইটিক্স</h1>
        <div class="stats-grid">
             <div class="glass-card">
                <h3>🔝 শীর্ষ ১০ লিস্টিং (Views)</h3>
                <div class="table-wrapper">
                    <table>
                        <thead><tr><th>নাম</th><th>ক্যাটাগরি</th><th>ভিউস</th></tr></thead>
                        <tbody>${topListingsHTML}</tbody>
                    </table>
                </div>
            </div>
            <div class="glass-card">
                <h3>📊 ক্যাটাগরি ডিস্ট্রিবিউশন</h3>
                <canvas id="categoryDistChart" style="height: 250px;"></canvas>
            </div>
        </div>
    `;

    // Render Category Chart
    const ctx = document.getElementById('categoryDistChart');
    if (ctx && STATS.categoryStats) {
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(STATS.categoryStats),
                datasets: [{
                    data: Object.values(STATS.categoryStats),
                    backgroundColor: ['#6366F1', '#A855F7', '#F43F5E', '#10B981', '#F59E0B']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

// --- Charts ---
function initCharts() {
    const visitsCtx = document.getElementById('visitsChart');
    const revenueCtx = document.getElementById('revenueChart');

    if (visitsCtx) {
        if (charts.visits) charts.visits.destroy();
        charts.visits = new Chart(visitsCtx, {
            type: 'line',
            data: {
                labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'ভিজিটর',
                    data: STATS.visits || [0,0,0,0,0,0,0],
                    borderColor: '#6366F1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true, tension: 0.4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }

    if (revenueCtx) {
        if (charts.revenue) charts.revenue.destroy();
        charts.revenue = new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'আয় (৳)',
                    data: [4500, 5200, 4800, 7000, 6500, 8200],
                    backgroundColor: '#A855F7',
                    borderRadius: 8
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }
}

// --- Table Rendering ---
function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    tbody.innerHTML = USERS.map(u => `
        <tr>
            <td><img src="${u.img}" class="avatar"></td>
            <td style="font-weight:600;">${u.name}</td>
            <td>${u.email}</td>
            <td><span class="badge ${u.role.includes('Admin') ? 'badge-purple' : 'badge-info'}">${u.role}</span></td>
            <td><span class="badge ${u.status === 'Active' ? 'badge-success' : 'badge-danger'}">${u.status}</span></td>
            <td>
                <button class="icon-btn" onclick="editUser(${u.id})"><i data-lucide="edit-2"></i></button>
                <button class="icon-btn" style="color:var(--danger);" onclick="banUser(${u.id})"><i data-lucide="slash"></i></button>
            </td>
        </tr>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

function renderCategoriesTable() {
    const tbody = document.getElementById('categoriesTableBody');
    if (!tbody) return;
    tbody.innerHTML = CATEGORIES.map(c => `
        <tr>
            <td style="font-weight:600;">${c.name}</td>
            <td style="font-size: 1.5rem;">${c.icon}</td>
            <td>—</td>
            <td>
                <button class="icon-btn" style="color:var(--danger);" onclick="deleteCategory('${c._id}')"><i data-lucide="trash-2"></i></button>
            </td>
        </tr>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

function renderAdsTable() {
    const tbody = document.getElementById('adsTableBody');
    if (!tbody) return;

    const featuredListings = LISTINGS.filter(l => l.isPremium || l.isFeatured);

    tbody.innerHTML = featuredListings.map(a => `
        <tr>
            <td style="font-weight:600;">${a.name}</td>
            <td><span class="badge badge-purple">${a.plan || 'Standard'}</span></td>
            <td>${a.expiryDate || 'Unlimited'}</td>
            <td style="font-weight:700;">৳${a.cost || 0}</td>
            <td>
                <button class="btn btn-ghost" style="font-size:0.75rem;">রিনিউ</button>
            </td>
        </tr>
    `).join('');

    if (featuredListings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-muted);">কোনো প্রোমোটেড বিজ্ঞাপন নেই।</td></tr>';
    }

    const plans = [
        { name: 'Gold Plan', price: '৳৫,০০০ / মাস', info: 'শীর্ষে দেখাবে + ৩টি ক্যাটাগরি' },
        { name: 'Silver Plan', price: '৳২,০০০ / মাস', info: 'লিড জেনারেশন + ভেরিফাইড ব্যাজ' }
    ];
    document.getElementById('pricingPlans').innerHTML = plans.map(p => `
        <div class="glass-card" style="padding:1rem; border-left:4px solid var(--accent-solid);">
            <div style="font-weight:700; color:var(--accent-solid);">${p.name}</div>
            <div style="font-size:1.1rem; font-weight:800; margin:5px 0;">${p.price}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${p.info}</div>
        </div>
    `).join('');
}

function renderNotifications() {
    const list = document.getElementById('notificationList');
    const badge = document.querySelector('.notification-badge');
    if (!list) return;

    const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;
    badge.style.display = unreadCount > 0 ? 'block' : 'none';

    list.innerHTML = NOTIFICATIONS.map(n => `
        <div class="notification-item ${n.unread ? 'unread' : ''}">
            <div style="font-size: 1.25rem;">${n.type === 'listing' ? '🏢' : n.type === 'payment' ? '💰' : '⚠️'}</div>
            <div>
                <div style="font-size: 0.85rem; color: var(--text-main);">${n.text}</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">${n.time}</div>
            </div>
        </div>
    `).join('');
}

// --- Activity & Requests (Existing) ---
function renderRecentActivity() {
    const list = document.getElementById('recentActivity');
    if (!list) return;
    const activities = [
        { icon: 'user-plus', color: 'var(--success)', text: 'নতুন ইউজার <b>সাদিয়া রহমান</b> রেজিস্টার করেছেন', time: '২ মিনিট আগে' },
        { icon: 'plus-circle', color: 'var(--info)', text: '<b>Sultan\'s Dine</b> নতুন লিস্টিং যোগ করা হয়েছে', time: '১৫ মিনিট আগে' }
    ];
    list.innerHTML = activities.map(a => `<div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border-color); align-items: flex-start;"><div style="width: 32px; height: 32px; border-radius: 50%; background: ${a.color}20; color: ${a.color}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><i data-lucide="${a.icon}" style="width: 16px; height: 16px;"></i></div><div><div style="font-size: 0.9rem; color: var(--text-main);">${a.text}</div><div style="font-size: 0.75rem; color: var(--text-muted);">${a.time}</div></div></div>`).join('');
    if (window.lucide) lucide.createIcons();
}

function renderFeaturedRequests() {
    const list = document.getElementById('featuredRequests');
    if (!list) return;
    const requests = [{ name: 'Bashundhara Group', cat: 'Corporate', status: 'Pending' },{ name: 'Kabab Factory', cat: 'Food', status: 'Pending' }];
    list.innerHTML = requests.map(r => `<div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-color);"><div><div style="font-weight: 600; font-size: 0.9rem;">${r.name}</div><div style="font-size: 0.75rem; color: var(--text-muted);">${r.cat}</div></div><div style="display: flex; gap: 0.5rem;"><button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">এপ্রুভ</button><button class="btn btn-ghost" style="padding: 0.4rem 0.8rem; font-size: 0.75rem; border: 1px solid var(--border-color);">উ অগ্রাহ্য</button></div></div>`).join('');
}

// --- More Helpers ---
function renderListingsTable() {
    const tbody = document.getElementById('listingsTableBody');
    if (!tbody) return;
    tbody.innerHTML = LISTINGS.map(item => `
        <tr>
            <td>
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-size:20px;">${item.icon || '🏢'}</span>
                    <div>
                        <div style="font-weight:700;">${item.name}</div>
                        <div style="font-size:12px; color:var(--text-muted);">${item.phone || 'N/A'}</div>
                    </div>
                </div>
            </td>
            <td>${item.category || 'N/A'}</td>
            <td>${item.area || ''}, ${item.district || ''}</td>
            <td>⭐ ${item.rating || 0}</td>
            <td>
                <span class="badge ${item.isLive ? 'badge-success' : 'badge-warning'}">
                    ${item.isLive ? 'সক্রিয়' : 'পেন্ডিং'}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 8px;">
                    ${!item.isLive ? `<button class="icon-btn" style="color:var(--success);" onclick="approveListing('${item._id}')" title="এপ্রুভ করুন"><i data-lucide="check-circle"></i></button>` : ''}
                    <button class="icon-btn" onclick="editListing('${item._id}')"><i data-lucide="edit-3"></i></button>
                    <button class="icon-btn" style="color: var(--danger);" onclick="deleteListing('${item._id}')"><i data-lucide="trash-2"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
    if (window.lucide) lucide.createIcons();
}


function renderReviewsTable() {
    const tbody = document.getElementById('reviewsTableBody');
    if (!tbody) return;
    tbody.innerHTML = REVIEWS.map(r => `
        <tr>
            <td style="font-weight:600;">${r.userName || 'Unknown'}</td>
            <td>${r.userName}</td>
            <td>${'⭐'.repeat(r.rating)}</td>
            <td style="font-size: 0.85rem; color: var(--text-muted);">${r.comment}</td>
            <td><span class="badge ${r.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${r.status === 'Approved' ? 'এপ্রুভড' : 'পেন্ডিং'}</span></td>
            <td>
                <div style="display:flex; gap: 8px;">
                    ${r.status === 'Pending' ? `<button class="icon-btn" style="color:var(--success);" onclick="approveReview('${r._id}')"><i data-lucide="check-circle"></i></button>` : ''}
                    <button class="icon-btn" style="color:var(--danger);" onclick="deleteReview('${r._id}')"><i data-lucide="trash-2"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

async function approveReview(id) {
    try {
        const res = await fetch(`/api/reviews/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Approved' })
        });
        if((await res.json()).success) fetchData();
    } catch(err) { alert('ত্রুটি হয়েছে!'); }
}

async function deleteReview(id) {
    if(!confirm('রিভিউটি ডিলিট করতে চান?')) return;
    try {
        const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
        if((await res.json()).success) fetchData();
    } catch(err) { alert('ত্রুটি হয়েছে!'); }
}

function renderRecentBlogs() {
    const list = document.getElementById('recentBlogList');
    if (!list) return;
    list.innerHTML = BLOGS.slice(0, 5).map(b => `<div style="padding:1rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;"><div style="display: flex; align-items: center; gap: 10px;"><span style="font-size: 1.5rem;">${b.icon || '📝'}</span><div><div style="font-weight: 600;">${b.title}</div><div style="font-size: 0.75rem; color: var(--text-muted);">${b.date}</div></div></div><button class="icon-btn" style="color: var(--danger);" onclick="deleteBlog('${b._id}')"><i data-lucide="trash-2"></i></button></div>`).join('');
    if (window.lucide) lucide.createIcons();
}

function populateFilters() {
    const filter = document.getElementById('filterCategory');
    if (!filter) return;
    const cats = [...new Set(LISTINGS.map(l => l.category).filter(Boolean))];
    filter.innerHTML = '<option value="all">সব ক্যাটাগরি</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join('');
}
