# BusinessBangla - বাংলাদেশের বৃহত্তম বিজনেস ডিরেক্টরি 🇧🇩

**BusinessBangla** is a premium, feature-rich directory platform designed to connect businesses with customers across Bangladesh. It features a modern "Glassmorphic" UI, advanced user authentication, and a professional workspace for both site administrators and business owners.

## 🚀 Key Features

### 🏢 For Business Owners (User Dashboard)
- **Personal Workspace**: A dedicated dashboard for managing your businesses.
- **Mandatory Login**: Secure platform where all listings are tied to a verified account.
- **Live Status Monitoring**: Track if your advertisement is "Live" or "Pending" in real-time.
- **Featured Slots**: Apply for promotion to the platform's top featured slots directly from your dashboard.
- **Fast Content Updates**: Easily edit business names, descriptions, and contact details.

### 🛡️ For Administrators (Admin Panel)
- **Visual Analytics**: Real-time **Chart.js** integration for category-based listing distribution.
- **Listing Governance**: Comprehensive table for approving, featuring, or deleting site-wide listings.
- **Category Control**: Manage the visibility of hero categories on the homepage.
- **SEO Blog Writer**: Integrated workspace to publish SEO-optimized blogs with dedicated metadata management.
- **Global Settings**: Centralized control for site titles, marquee advertisements, support phone numbers, and footer text.

### 🎨 Design & Experience
- **Premium Aesthetics**: Sleek dark mode sidebar, glassmorphic UI cards, and smooth micro-animations.
- **Mobile Responsive**: Fully optimized for desktops, tablets, and smartphones.
- **Dynamic Navbar**: Automatically switches between guest (Login/Register) and member (Dashboard/Logout) views.

---

## 🛠️ Technology Stack
- **Frontend**: HTML5 (Semantic), Vanilla CSS3 (Custom Design System), JavaScript (ES6+).
- **Libraries**: [Chart.js](https://www.chartjs.org/) for visual analytics.
- **Persistence**: Simulated browser-level data management using `localStorage` for sessions and listing data.

---

## ⚙️ Setup & Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/SABIT104/listing-site.git
    ```
2.  **Run Locally**:
    -   You can use any local development server (e.g., `live-server`, `VS Code Live Server`, or simply open `index.html` in your browser).
3.  **Administrator Access**:
    -   **Login URL**: `/admin-login.html`
    -   **Username**: `s@bit`
    -   **Password**: `s@bit104`

---

## 📁 Project Structure
- `index.html`: Main landing page with hero search and featured listings.
- `admin-dashboard.html`: Site administration workspace.
- `user-dashboard.html`: Individual business owner workspace.
- `js/auth.js`: Core session and authentication engine.
- `js/admin.js`: Governance logic and data visualization engine.
- `js/data.js`: Master directory of business listings.

---

## 📄 License
This project is for internal use and demonstration. All rights reserved by **BusinessBangla.com.bd**.