// Admin State
let LISTINGS = [];
let BLOGS = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const [lRes, bRes] = await Promise.all([
            fetch('/api/listings'),
            fetch('/api/blogs')
        ]);
        const [lData, bData] = await Promise.all([lRes.json(), bRes.json()]);
        
        if (lData.success) LISTINGS = lData.listings;
        if (bData.success) BLOGS = bData.blogs;
        
        renderOverview();
        renderListingsTable();
        renderRecentBlogs();
    } catch (err) {
        console.error('Data Load Error:', err);
    }
}

// Stats & Overview
function renderOverview() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;

    const stats = [
        { label: "মোট লিস্টিং", val: LISTINGS.length, icon: "📋", color: "var(--yp)" },
        { label: "অ্যাকটিভ ব্লগ", val: BLOGS.length, icon: "📝", color: "var(--green)" },
        { label: "মোট ভিজিটর", val: "৪,৫২০", icon: "👁️", color: "#2196f3" },
        { label: "পেন্ডিং রিকোয়েস্ট", val: "১২", icon: "⏳", color: "#f44336" }
    ];

    statsGrid.innerHTML = stats.map(s => `
        <div class="stat-card">
            <div style="font-size: 24px; margin-bottom: 15px;">${s.icon}</div>
            <h3>${s.val}</h3>
            <p>${s.label}</p>
        </div>
    `).join('');
}

// Listing Table
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
                        <div style="font-size:12px; color:#888;">${item.category || item.cat}</div>
                    </div>
                </div>
            </td>
            <td>${item.area}, ${item.district}</td>
            <td><span class="badge badge-success">সক্রিয়</span></td>
            <td><span class="switch"><input type="checkbox" ${item.featured ? 'checked' : ''}><span class="slider"></span></span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" title="ইডিট">✏️</button>
                    <button class="btn-icon btn-del" onclick="deleteListing('${item._id}')" title="ডিলিট">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Blog List helper
function renderRecentBlogs() {
    const list = document.getElementById('recentBlogList');
    if (!list) return;
    list.innerHTML = BLOGS.slice(0, 5).map(b => `
        <div style="padding:10px 0; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
            <span>${b.title}</span>
            <button onclick="deleteBlog('${b._id}')" style="background:none; border:none; cursor:pointer; font-size:14px;">🗑️</button>
        </div>
    `).join('');
}

// Form Toggles
function showNewListingForm() {
    document.getElementById('newListingFormSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideNewListingForm() {
    document.getElementById('newListingFormSection').style.display = 'none';
}

// Submissions
async function handleListingSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = 'সেভ হচ্ছে...';
    btn.disabled = true;

    const fd = new FormData();
    fd.append('name', document.getElementById('lstName').value);
    fd.append('category', document.getElementById('lstCat').value);
    fd.append('division', document.getElementById('lstDiv').value);
    fd.append('district', document.getElementById('lstDistrict').value);
    fd.append('area', document.getElementById('lstArea').value);
    fd.append('phone', document.getElementById('lstPhone').value);
    fd.append('description', document.getElementById('lstDesc').value);
    fd.append('icon', document.getElementById('lstIcon').value || '🏢');
    fd.append('verified', document.getElementById('lstVerified').checked);
    fd.append('featured', document.getElementById('lstFeatured').checked);
    fd.append('premium', document.getElementById('lstPremium').checked);

    const imgFile = document.getElementById('lstImage').files[0];
    if (imgFile) fd.append('image', imgFile);

    try {
        const res = await fetch('/api/listings', {
            method: 'POST',
            body: fd
        });
        const data = await res.json();
        if (data.success) {
            alert('লিস্টিং সফলভাবে যোগ করা হয়েছে!');
            hideNewListingForm();
            e.target.reset();
            fetchData();
        }
    } catch (err) {
        alert('ত্রুটি! লিস্টিং সেভ করা যায়নি।');
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

async function handleBlogSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = 'পাবলিশ হচ্ছে...';
    btn.disabled = true;
    
    const fd = new FormData();
    fd.append('title', document.getElementById('blogTitle').value);
    fd.append('category', document.getElementById('blogCategory').value);
    fd.append('content', document.getElementById('blogContent').value);
    
    const imgFile = document.getElementById('blogImage').files[0];
    if (imgFile) fd.append('image', imgFile);

    try {
        const res = await fetch('/api/blogs', {
            method: 'POST',
            body: fd
        });
        const data = await res.json();
        if (data.success) {
            alert('ব্লগ সফলভাবে পাবলিশ হয়েছে!');
            e.target.reset();
            fetchData();
        }
    } catch (err) {
        alert('ত্রুটি! ব্লগ পাবলিশ করা যায়নি।');
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

async function deleteListing(id) {
    if (!confirm('আপনি কি নিশ্চিত যে আপনি এটি ডিলিট করতে চান?')) return;
    try {
        const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) fetchData();
    } catch (err) {
        alert('ডিলিট করা যায়নি!');
    }
}

async function deleteBlog(id) {
    if (!confirm('আপনি কি নিশ্চিত যে আপনি এই ব্লগটি ডিলিট করতে চান?')) return;
    try {
        const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) fetchData();
    } catch (err) {
        alert('ডিলিট করা যায়নি!');
    }
}

// Navigation
function switchTab(tabId, el) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.admin-menu li').forEach(l => l.classList.remove('active'));
    
    const panel = document.getElementById('tab-' + tabId);
    if(panel) panel.classList.add('active');
    if(el) el.classList.add('active');
    
    const titleMap = {
        'dashboard': 'ওভারভিউ',
        'listings': 'লিস্টিং ম্যানেজমেন্ট',
        'blog': 'ব্লগ পাবলিশিং',
        'settings': 'সিস্টেম সেটিংস'
    };
    const titleEl = document.getElementById('pageTitle');
    if(titleEl) titleEl.innerText = titleMap[tabId] || 'অ্যাডমিন';
}
