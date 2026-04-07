/**
 * BusinessBangla Admin Dashboard Logic
 * Handles data rendering, statistics, charts, and CRUD simulations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    renderStats();
    initCharts();
    renderListingsTable();
    setupEventListeners();
}

/**
 * Statistics Rendering
 */
function renderStats() {
    const total = LISTINGS.length;
    const featured = LISTINGS.filter(l => l.featured).length;
    const premium = LISTINGS.filter(l => l.premium).length;
    const verified = LISTINGS.filter(l => l.verified).length;

    const statsGrid = document.querySelector('.stat-grid');
    if (statsGrid) {
        statsGrid.innerHTML = `
            <div class="stat-card"><h3>${total}</h3><p>মোট লিস্টিং</p></div>
            <div class="stat-card" style="border-left-color: #2196F3;"><h3>${verified}</h3><p>যাচাইকৃত (Verified)</p></div>
            <div class="stat-card" style="border-left-color: #4CAF50;"><h3>${featured}</h3><p>ফিচারড (Featured)</p></div>
            <div class="stat-card" style="border-left-color: #fbc02d;"><h3>${premium}</h3><p>প্রিমিয়াম (Premium)</p></div>
        `;
    }
}

/**
 * Chart Initialization (requires Chart.js)
 */
function initCharts() {
    const ctx = document.getElementById('analyticsChart');
    if (!ctx) return;

    // Category Distribution Data
    const catCounts = {};
    LISTINGS.forEach(l => {
        catCounts[l.cat] = (catCounts[l.cat] || 0) + 1;
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(catCounts),
            datasets: [{
                data: Object.values(catCounts),
                backgroundColor: [
                    '#1B6B3A', '#EFB810', '#0A3319', '#2E7D32', '#FBC02D',
                    '#43A047', '#FFD600', '#1B5E20', '#FFEE58'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                title: { display: true, text: 'ক্যাটাগরি ভিত্তিক লিস্টিং' }
            }
        }
    });
}

/**
 * Listings Table Rendering
 */
let currentListings = [...LISTINGS];

function renderListingsTable(data = currentListings) {
    const tbody = document.querySelector('#listingsTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.map(item => `
        <tr data-id="${item.id}">
            <td>
                <div style="font-weight: 700; color: var(--dark);">${item.name}</div>
                <div style="font-size: 11px; color: #888;">ID:BB-${item.id} | ${item.catLabel}</div>
            </td>
            <td>${item.area}, ${item.district}</td>
            <td>
                <span class="badge ${item.verified ? 'badge-success' : 'badge-warning'}">
                    ${item.verified ? 'Verified' : 'Pending'}
                </span>
            </td>
            <td>
                <label class="switch">
                    <input type="checkbox" ${item.featured ? 'checked' : ''} onchange="toggleFeature(${item.id})">
                    <span class="slider"></span>
                </label>
            </td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" onclick="editListing(${item.id})" title="সম্পাদনা">✏️</button>
                    <button class="btn-icon btn-del" onclick="deleteListing(${item.id})" title="মুছে ফেলুন">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * Event Listeners & Interactions
 */
function setupEventListeners() {
    // Search Functionality
    const searchInput = document.getElementById('adminSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = LISTINGS.filter(l => 
                l.name.toLowerCase().includes(query) || 
                l.cat.toLowerCase().includes(query) || 
                l.district.toLowerCase().includes(query)
            );
            renderListingsTable(filtered);
        });
    }

    // Category Filter
    const catFilter = document.getElementById('adminCatFilter');
    if (catFilter) {
        catFilter.addEventListener('change', (e) => {
            const cat = e.target.value;
            const filtered = cat === 'all' ? LISTINGS : LISTINGS.filter(l => l.cat === cat);
            renderListingsTable(filtered);
        });
    }
}

/**
 * CRUD Simulations (Alert based for now)
 */
window.toggleFeature = (id) => {
    const item = LISTINGS.find(l => l.id === id);
    if (item) {
        item.featured = !item.featured;
        alert(`${item.name} এর ফিচার স্ট্যাটাস পরিবর্তন করা হয়েছে।`);
    }
}

window.deleteListing = (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই লিস্টিংটি মুছে ফেলতে চান?')) {
        const idx = LISTINGS.findIndex(l => l.id === id);
        if (idx > -1) {
            LISTINGS.splice(idx, 1);
            renderListingsTable();
            renderStats();
            alert('লিস্টিংটি সরিয়ে দেওয়া হয়েছে।');
        }
    }
}

window.editListing = (id) => {
    const item = LISTINGS.find(l => l.id === id);
    if (item) {
        alert(`সম্পাদনা মোড: ${item.name} (ID: ${id})\nবাস্তব ব্যাকএন্ড থাকলে এখানে একটি ফর্ম পপ আপ হতো।`);
    }
}

window.switchTab = (tabId, element) => {
    // Basic switch logic
    document.querySelectorAll('.tab-panel').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-menu li').forEach(l => l.classList.remove('active'));
    
    document.getElementById('tab-' + tabId).classList.add('active');
    element.classList.add('active');
    
    // Update breadcrumb
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.innerText = element.innerText.replace(/^[^\s]+\s+/, '').trim();
    }
}
