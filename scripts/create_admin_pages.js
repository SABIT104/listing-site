const fs = require('fs');
const path = require('path');
const dir = process.cwd();

// Read login.html to use as a base for forgot password
const loginTemplate = fs.readFileSync(path.join(dir, 'login.html'), 'utf-8');
const headerEnd = loginTemplate.indexOf('<main>');
const headerPart = loginTemplate.substring(0, headerEnd);
const footerStart = loginTemplate.indexOf('</main>') + 7;
const footerPart = loginTemplate.substring(footerStart);

// 1. FORGOT PASSWORD PAGE
const forgotStyles = `
  <style>
    .auth-container {
      display: flex; justify-content: center; align-items: center;
      padding: 60px 20px; min-height: calc(100vh - 400px);
      background: linear-gradient(135deg, rgba(10,51,25,0.02) 0%, rgba(27,107,58,0.05) 100%);
    }
    .auth-card {
      background: #ffffff; width: 100%; max-width: 450px; border-radius: 20px;
      padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.08);
      border: 1px solid rgba(0,0,0,0.05); animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes slideUpFade { from{opacity:0; transform:translateY(30px);} to{opacity:1; transform:translateY(0);} }
    .auth-header { text-align: center; margin-bottom: 30px; }
    .auth-header h2 { font-size: 26px; color: var(--dark); margin-bottom: 8px; }
    .auth-header p { color: var(--mid); font-size: 14px; }
    .input-group { position: relative; margin-bottom: 25px; }
    .input-group input { width: 100%; padding: 15px; border: 1px solid #e9ecef; border-radius: 12px; font-size: 16px; outline: none; transition: 0.3s; }
    .input-group input:focus { border-color: var(--yp); box-shadow: 0 0 0 4px rgba(239, 184, 16, 0.15); }
    .auth-btn { width: 100%; padding: 15px; background: var(--yp); color: var(--dark); font-weight: 700; border: none; border-radius: 12px; cursor: pointer; transition: 0.3s; }
    .auth-btn:hover { background: var(--yp2); color: #fff; transform: translateY(-2px); }
  </style>
`;
const forgotContent = `
  <main>
    ${forgotStyles}
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>🔐 পাসওয়ার্ড ভুলে গেছেন?</h2>
          <p>আপনার অ্যাকাউন্ট ইমেইল দিন। আমরা পাসওয়ার্ড রিসেট লিংক পাঠিয়ে দেবো।</p>
        </div>
        <form onsubmit="event.preventDefault(); alert('পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে সফলভাবে পাঠানো হয়েছে!');">
          <div class="input-group">
            <input type="email" placeholder="আপনার ইমেইল অ্যাড্রেস" required>
          </div>
          <button type="submit" class="auth-btn">রিসেট লিংক পাঠান</button>
        </form>
        <div style="text-align:center; margin-top:20px; font-size:14px;">
          <a href="login.html" style="color:var(--green); font-weight:600; text-decoration:none;">← লগইন পেজে ফিরে যান</a>
        </div>
      </div>
    </div>
  </main>
`;
fs.writeFileSync(path.join(dir, 'forgot-password.html'), headerPart + forgotContent + footerPart, 'utf-8');

// 2. ADMIN LOGIN PAGE
const adminLoginContent = `
  <main>
    ${forgotStyles}
    <div class="auth-container" style="background: linear-gradient(135deg, #111, #222);">
      <div class="auth-card" style="box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div class="auth-header">
          <h2 style="color:var(--yp);">🛡️ অ্যাডমিন লগইন</h2>
          <p>শুধুমাত্র অনুমোদিত অ্যাডমিনিস্ট্রেটরদের জন্য</p>
        </div>
        <form onsubmit="handleAdminLogin(event)">
          <div class="input-group">
            <input type="text" id="adminUser" placeholder="অ্যাডমিন ইউজারনেম" required>
          </div>
          <div class="input-group">
            <input type="password" id="adminPass" placeholder="গোপন পাসওয়ার্ড" required>
          </div>
          <button type="submit" class="auth-btn" style="background:#555; color:#fff;">লগইন করুন</button>
        </form>

        <script>
          function handleAdminLogin(e) {
            e.preventDefault();
            const user = document.getElementById('adminUser').value;
            const pass = document.getElementById('adminPass').value;
            
            if (user === 's@bit' && pass === 's@bit104') {
              window.location.href = 'admin-dashboard.html';
            } else {
              alert('ভুল ইউজারনেম অথবা পাসওয়ার্ড! আবার চেষ্টা করুন।');
            }
          }
        </script>
        <div style="text-align:center; margin-top:20px; font-size:14px;">
          <a href="forgot-password.html" style="color:#aaa; text-decoration:none;">পাসওয়ার্ড ভুলে গেছেন?</a>
        </div>
      </div>
    </div>
  </main>
`;
fs.writeFileSync(path.join(dir, 'admin-login.html'), headerPart + adminLoginContent + footerPart, 'utf-8');

// 3. ADMIN DASHBOARD PAGE
const dashboardFullHTML = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>Admin Dashboard - BusinessBangla</title>
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <style>
    body { background: #f0f2f5; font-family: 'Inter', sans-serif; margin:0; padding:0; display:flex; height:100vh; overflow:hidden;}
    
    /* Sidebar */
    .admin-sidebar { width: 260px; background: #0A3319; color: #fff; display: flex; flex-direction: column; }
    .admin-logo { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: center; }
    .admin-logo h2 { margin: 0; color: var(--yp); }
    .admin-menu { list-style: none; padding: 20px 0; margin: 0; flex: 1; }
    .admin-menu li { padding: 15px 25px; cursor: pointer; transition: 0.3s; font-size: 15px; border-left: 4px solid transparent; }
    .admin-menu li:hover { background: rgba(255,255,255,0.05); }
    .admin-menu li.active { background: rgba(255,255,255,0.1); border-left-color: var(--yp); font-weight: bold; }
    
    /* Main Content */
    .admin-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .admin-header { height: 70px; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; padding: 0 30px; }
    .admin-header .user-badge { background: #eee; padding: 8px 15px; border-radius: 20px; font-size: 14px; font-weight: 600; }
    .admin-content { flex: 1; padding: 30px; overflow-y: auto; }
    
    /* Panels */
    .tab-panel { display: none; animation: fadeIn 0.4s; }
    .tab-panel.active { display: block; }
    @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
    
    /* Dashboard Stats */
    .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
    .stat-card { background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.03); border-left: 5px solid var(--yp); }
    .stat-card h3 { margin: 0 0 10px 0; font-size: 32px; color: var(--dark); }
    .stat-card p { margin: 0; color: var(--mid); font-size: 14px; }
    
    /* Tables */
    .admin-table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.03); }
    .admin-table th, .admin-table td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; font-size:14px; }
    .admin-table th { background: #f8f9fa; color: #555; font-weight: 600; }
    .admin-table tr:hover { background: #fdfdfd; }
    
    /* Buttons/Toggles */
    .btn-sm { padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600; }
    .btn-approve { background: #e8f5e9; color: #2e7d32; }
    .btn-reject { background: #ffebee; color: #c62828; }
    
    /* Toggle Switch */
    .switch { position: relative; display: inline-block; width: 40px; height: 22px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 22px; }
    .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .slider { background-color: var(--yp); }
    input:checked + .slider:before { transform: translateX(18px); }
    
    /* Form */
    .admin-form label { display: block; margin-bottom: 8px; font-weight: 600; color: #444; font-size: 14px; }
    .admin-form input, .admin-form textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px; font-family: inherit; }
  </style>
</head>
<body>

  <!-- Sidebar -->
  <div class="admin-sidebar">
    <div class="admin-logo">
      <h2>বিজনেস বাংলা</h2>
      <span style="font-size: 12px; opacity:0.7;">Admin Workspace</span>
    </div>
    <ul class="admin-menu">
      <li class="active" onclick="switchTab('dashboard', this)">📊 ওভারভিউ (Overview)</li>
      <li onclick="switchTab('listings', this)">📋 লিস্টিং ম্যানেজমেন্ট</li>
      <li onclick="switchTab('blog', this)">📝 এসইও ব্লগ (SEO Blog)</li>
      <li onclick="window.location.href='index.html'" style="margin-top: 50px; color:#ffb3b3;">🚪 সাইটে ফিরে যান</li>
    </ul>
  </div>

  <!-- Main Workspace -->
  <div class="admin-main">
    <div class="admin-header">
      <h3 id="pageTitle" style="margin:0; color:#333;">ওভারভিউ</h3>
      <div class="user-badge">Super Admin</div>
    </div>
    
    <div class="admin-content">
      
      <!-- TAB 1: OVERVIEW -->
      <div id="tab-dashboard" class="tab-panel active">
        <div class="stat-grid">
          <div class="stat-card"><h3>১২,৪৮০+</h3><p>মোট লিস্টিং</p></div>
          <div class="stat-card" style="border-left-color: #2196F3;"><h3>২৪৫</h3><p>পেন্ডিং অ্যাপ্রুভাল</p></div>
          <div class="stat-card" style="border-left-color: #4CAF50;"><h3>১৫০+</h3><p>ফিচারড লিস্টিং</p></div>
          <div class="stat-card" style="border-left-color: #F44336;"><h3>১২</h3><p>ব্লকড লিস্টিং</p></div>
        </div>
      </div>

      <!-- TAB 2: LISTINGS MANAGEMENT -->
      <div id="tab-listings" class="tab-panel">
        <div style="background:#fff; padding:20px; border-radius:10px; margin-bottom:20px; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
          <h3 style="margin-top:0;">অপেক্ষমাণ লিস্টিং (Pending Approvals)</h3>
          <table class="admin-table">
            <thead>
              <tr>
                <th>বিজনেসের নাম</th>
                <th>ক্যাটাগরি</th>
                <th>অ্যাকশন (Approve/Reject)</th>
                <th>ফিচারড (⭐)</th>
                <th>স্ট্যাটাস (Block/Unblock)</th>
              </tr>
            </thead>
            <tbody>
              <!-- Row 1 -->
              <tr>
                 <td>ডিজিটাল আইটি জোন<br><span style="font-size:12px;color:#888;">#ID: 10452 | ফোন: 01700...</span></td>
                 <td>আইটি</td>
                 <td>
                   <button class="btn-sm btn-approve" onclick="alert('লিস্টিং অ্যাপ্রুভ করা হয়েছে!')">✔ Approve</button>
                   <button class="btn-sm btn-reject" onclick="alert('লিস্টিং বাতিল করা হয়েছে!')">✖ Reject</button>
                 </td>
                 <td>
                   <label class="switch"><input type="checkbox"><span class="slider"></span></label>
                 </td>
                 <td>
                   <select style="padding:5px; border-radius:4px; border:1px solid #ddd;">
                     <option>Active</option>
                     <option style="color:red;">Blocked</option>
                   </select>
                 </td>
              </tr>
              <!-- Row 2 -->
              <tr>
                 <td>রফিক মটরস<br><span style="font-size:12px;color:#888;">#ID: 10453 | ফোন: 01800...</span></td>
                 <td>পরিবহন</td>
                 <td>
                   <button class="btn-sm btn-approve" onclick="alert('লিস্টিং অ্যাপ্রুভ করা হয়েছে!')">✔ Approve</button>
                   <button class="btn-sm btn-reject" onclick="alert('লিস্টিং বাতিল করা হয়েছে!')">✖ Reject</button>
                 </td>
                 <td>
                   <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
                 </td>
                 <td>
                   <select style="padding:5px; border-radius:4px; border:1px solid #ddd;">
                     <option>Active</option>
                     <option style="color:red;">Blocked</option>
                   </select>
                 </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 3: SEO BLOG WRITER -->
      <div id="tab-blog" class="tab-panel">
        <div style="background:#fff; padding:30px; border-radius:10px; max-width:800px; box-shadow: 0 2px 10px rgba(0,0,0,0.02);" class="admin-form">
          <h2 style="margin-top:0;">নতুন ব্লগ পাবলিশ করুন (SEO Optimized)</h2>
          
          <label>ব্লগের শিরোনাম (Title)</label>
          <input type="text" placeholder="যেমন: ব্যবসা সফল করার ১০টি উপায়">
          
          <label>কাভার ইমেজ (Thumbnail URL)</label>
          <input type="text" placeholder="https://example.com/image.jpg">
          
          <label>বিস্তারিত কন্টেন্ট (Content)</label>
          <textarea rows="8" placeholder="এখানে বিস্তারিত ব্লগ লিখুন..."></textarea>
          
          <div style="background:#f8f9fa; padding:20px; border-radius:8px; border:1px dashed #ccc; margin-bottom:20px;">
            <h4 style="margin-top:0; color:#1B6B3A;">🚀 এসইও মেটা কন্ট্রোল (SEO Controls)</h4>
            <label>Meta Title</label>
            <input type="text" placeholder="Google Search-এ যা দেখাবে">
            
            <label>Meta Description</label>
            <textarea rows="2" placeholder="সংক্ষিপ্ত বিবরণ..."></textarea>
            
            <label>Meta Keywords</label>
            <input type="text" placeholder="কমা দিয়ে কীওয়ার্ড লিখুন (যেমন: ব্যবসা, আইডিয়া, টিপস)">
          </div>

          <button onclick="alert('ব্লগ সফলভাবে পাবলিশ করা হয়েছে!')" style="background:var(--yp); border:none; padding:15px 30px; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">পাবলিশ করুন</button>
        </div>
      </div>

    </div>
  </div>

  <script>
    function switchTab(tabId, element) {
      // Remove active from all tabs
      document.querySelectorAll('.tab-panel').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-menu li').forEach(l => l.classList.remove('active'));
      
      // Add active to selected
      document.getElementById('tab-' + tabId).classList.add('active');
      element.classList.add('active');
      
      // Update Title
      document.getElementById('pageTitle').innerText = element.innerText.replace(/[^a-zA-Zঅ-য়()\s]/g, '').trim();
    }
  </script>
</body>
</html>
`;
fs.writeFileSync(path.join(dir, 'admin-dashboard.html'), dashboardFullHTML, 'utf-8');

console.log('Admin pages generated successfully!');
