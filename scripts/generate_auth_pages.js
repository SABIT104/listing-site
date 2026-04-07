const fs = require('fs');
const path = require('path');
const dir = process.cwd();

// Read index.html to use as a template
const template = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');

// Find everything before <main> and after </main>
const headerPart = template.substring(0, template.indexOf('<main>'));
const footerPart = template.substring(template.indexOf('</main>') + 7);

const customStyles = `
  <style>
    /* Auth Form Aesthetics */
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 60px 20px;
      min-height: calc(100vh - 400px);
      background: linear-gradient(135deg, rgba(10,51,25,0.02) 0%, rgba(27,107,58,0.05) 100%);
    }

    .auth-card {
      background: #ffffff;
      width: 100%;
      max-width: 450px;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
      border: 1px solid rgba(0,0,0,0.05);
      animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
      transform: translateY(30px);
    }

    @keyframes slideUpFade {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .auth-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .auth-header h2 {
      font-size: 28px;
      color: var(--dark);
      margin-bottom: 8px;
      font-weight: 700;
    }

    .auth-header p {
      color: var(--mid);
      font-size: 14px;
    }

    /* Floating Labels */
    .input-group {
      position: relative;
      margin-bottom: 25px;
    }

    .input-group input {
      width: 100%;
      padding: 15px 15px 15px 15px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      font-size: 16px;
      color: var(--dark);
      outline: none;
      transition: all 0.3s ease;
    }

    .input-group input:focus {
      background: #fff;
      border-color: var(--yp);
      box-shadow: 0 0 0 4px rgba(239, 184, 16, 0.15);
    }

    .input-group label {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
      color: #999;
      font-size: 16px;
      pointer-events: none;
      transition: all 0.25s ease;
    }

    /* Floating action */
    .input-group input:focus ~ label,
    .input-group input:not(:placeholder-shown) ~ label {
      top: 0;
      left: 10px;
      font-size: 12px;
      color: var(--yp2);
      background: #fff;
      padding: 0 5px;
      transform: translateY(-50%);
    }

    .auth-btn {
      width: 100%;
      padding: 15px;
      background: var(--yp);
      color: var(--dark);
      font-weight: 700;
      font-size: 16px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 20px;
    }

    .auth-btn:hover {
      background: var(--yp2);
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(239, 184, 16, 0.3);
    }

    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      color: #aaa;
      font-size: 14px;
      margin-bottom: 20px;
    }
    
    .divider::before, .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid #eee;
    }
    
    .divider::before { margin-right: .5em; }
    .divider::after { margin-left: .5em; }

    .google-btn {
      width: 100%;
      padding: 14px;
      background: #fff;
      color: #333;
      font-weight: 600;
      font-size: 15px;
      border: 1px solid #ddd;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      gap: 10px;
    }

    .google-btn:hover {
      background: #fdfdfd;
      border-color: #ccc;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .auth-footer {
      text-align: center;
      margin-top: 25px;
      font-size: 14px;
      color: var(--mid);
    }

    .auth-footer a {
      color: var(--green);
      font-weight: 600;
      transition: color 0.3s;
    }

    .auth-footer a:hover {
      color: var(--dark);
      text-decoration: underline;
    }
  </style>
`;

const loginContent = `
  <main>
    ${customStyles}
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>স্বাগতম!</h2>
          <p>আপনার বিজনেসবাংলা অ্যাকাউন্টে লগইন করুন</p>
        </div>
        
        <form>
          <div class="input-group">
            <input type="email" placeholder=" " id="login-email" required>
            <label for="login-email">ইমেইল বা ফোন নম্বর</label>
          </div>
          
          <div class="input-group">
            <input type="password" placeholder=" " id="login-password" required>
            <label for="login-password">পাসওয়ার্ড</label>
          </div>
          
          <div style="display:flex; justify-content:space-between; margin-bottom: 25px; font-size:13px;">
            <label style="cursor:pointer; display:flex; align-items:center; gap:5px;">
              <input type="checkbox"> আমাকে মনে রাখুন
            </label>
            <a href="#" style="color:var(--yp2); font-weight:600;">পাসওয়ার্ড ভুলে গেছেন?</a>
          </div>

          <button type="submit" class="auth-btn">লগইন করুন</button>
        </form>

        <div class="divider">অথবা</div>

        <button class="google-btn">
          <svg style="width:20px; height:20px;" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google দিয়ে লগইন করুন
        </button>

        <div class="auth-footer">
          অ্যাকাউন্ট নেই? <a href="register.html">নতুন রেজিস্ট্রেশন করুন</a>
        </div>
      </div>
    </div>
  </main>
`;

const registerContent = `
  <main>
    ${customStyles}
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>অ্যাকাউন্ট তৈরি করুন</h2>
          <p>বিনামূল্যে যুক্ত হোন বাংলাদেশের সেরা ডিরেক্টরিতে</p>
        </div>
        
        <form>
          <div class="input-group">
            <input type="text" placeholder=" " id="reg-name" required>
            <label for="reg-name">আপনার সম্পূর্ণ নাম</label>
          </div>

          <div class="input-group">
            <input type="tel" placeholder=" " id="reg-phone" required>
            <label for="reg-phone">ফোন নম্বর</label>
          </div>

          <div class="input-group">
            <input type="email" placeholder=" " id="reg-email" required>
            <label for="reg-email">ইমেইল ঠিকানা</label>
          </div>
          
          <div class="input-group">
            <input type="password" placeholder=" " id="reg-password" required>
            <label for="reg-password">নতুন পাসওয়ার্ড দিন</label>
          </div>

          <button type="submit" class="auth-btn">রেজিস্ট্রেশন কমপ্লিট করুন</button>
        </form>

        <div class="divider">অথবা</div>

        <button class="google-btn">
          <svg style="width:20px; height:20px;" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google দিয়ে রেজিস্ট্রেশন করুন
        </button>

        <div class="auth-footer">
          ইতোমধ্যে অ্যাকাউন্ট আছে? <a href="login.html">লগইন করুন</a>
        </div>
      </div>
    </div>
  </main>
`;

fs.writeFileSync(path.join(dir, 'login.html'), headerPart + loginContent + footerPart, 'utf-8');
fs.writeFileSync(path.join(dir, 'register.html'), headerPart + registerContent + footerPart, 'utf-8');

console.log('Login and Register HTML pages created!');
