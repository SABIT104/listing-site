document.addEventListener('DOMContentLoaded', async () => {
  // Global Data State
  window.LISTINGS = [];
  window.BLOGS = [];

  // Fetch initial data
  try {
    const [lRes, bRes] = await Promise.all([
      fetch('/api/listings'),
      fetch('/api/blogs')
    ]);
    const [lData, bData] = await Promise.all([lRes.json(), bRes.json()]);
    if (lData.success) window.LISTINGS = lData.listings;
    if (bData.success) window.BLOGS = bData.blogs;
    window.dispatchEvent(new CustomEvent('dataReady'));
  } catch (err) {
    console.error('Failed to fetch initial data:', err);
  }

  const LISTINGS = window.LISTINGS;
  const BLOGS = window.BLOGS;
  
  // Map filenames to category names
  const pageCategoryMap = {
    'food': 'খাবার', 'food.html': 'খাবার',
    'health': 'স্বাস্থ্য', 'health.html': 'স্বাস্থ্য',
    'education': 'শিক্ষা', 'education.html': 'শিক্ষা',
    'small-business': 'ছোট ব্যবসা', 'small-business.html': 'ছোট ব্যবসা',
    'freelancing': 'ফ্রিল্যান্সিং', 'freelancing.html': 'ফ্রিল্যান্সিং',
    'company': 'কোম্পানি', 'company.html': 'কোম্পানি',
    'it': 'আইটি', 'it.html': 'আইটি',
    'transport': 'পরিবহন', 'transport.html': 'পরিবহন',
    'accommodation': 'আবাসন', 'accommodation.html': 'আবাসন',
    'listings': 'all', 'listings.html': 'all',
    'index': 'all', 'index.html': 'all'
  };

  // Marquee Endless Loop Setup
  const marqueeContainer = document.querySelector('.marquee-container');
  if (marqueeContainer) {
    const marqueeContent = marqueeContainer.querySelector('.marquee-content');
    if (marqueeContent) {
      // Ensure we have enough copies to span the screen at least twice for a perfectly seamless scroll
      const containerWidth = marqueeContainer.clientWidth || window.innerWidth;
      const contentWidth = marqueeContent.clientWidth;
      
      // Calculate how many clones we need (at least 2, or more if the screen is wider than the content)
      let copiesNeeded = 1;
      if (contentWidth > 0) {
        copiesNeeded = Math.ceil(containerWidth / contentWidth) + 1;
      } else {
        copiesNeeded = 3; // fallback
      }

      for (let i = 0; i < copiesNeeded; i++) {
        const clone = marqueeContent.cloneNode(true);
        marqueeContainer.appendChild(clone);
      }
    }
  }

  // Find out the current html file
  const pathParts = window.location.pathname.split('/');
  let fileName = pathParts[pathParts.length - 1] || 'index.html';
  if (fileName === '') fileName = 'index.html';

  // Remove trailing slashes and normalize
  fileName = fileName.replace(/\/$/, '');

  let defaultCat = 'all';
  if (pageCategoryMap[fileName]) {
    defaultCat = pageCategoryMap[fileName];
  }

  // Parse URL Parameters
  const params = new URLSearchParams(window.location.search);
  const currentFilters = {
    division: params.get('div') || 'all',
    category: params.get('cat') || defaultCat,
    query: params.get('q') || '',
    minRating: 0,
    verifiedOnly: false,
    premiumOnly: false,
    openNow: false,
    onlineService: false,
    homeDelivery: false,
    open247: false
  };

  // --- Real-time Number Updating ---
  function updateDynamicCounts() {
    // 1. Topbar total listings
    const topbarRightSpan = document.querySelector('.topbar-left span:last-child');
    if (topbarRightSpan && topbarRightSpan.textContent.includes('লিস্টিং')) {
      topbarRightSpan.textContent = toBengaliNumeral(LISTINGS.length) + '+ লিস্টিং';
    }

    // 2. Category Tabs counts
    const catTabsAll = document.querySelectorAll('.cat-tab');
    catTabsAll.forEach(tab => {
      const catTextEl = tab.querySelector('.c-text');
      const countEl = tab.querySelector('.c-count');
      if (catTextEl && countEl) {
        const catName = catTextEl.textContent.trim();
        let catCount = 0;
        if (catName === 'সব ধরন') {
          catCount = LISTINGS.length;
        } else {
          catCount = LISTINGS.filter(item => item.category === catName || item.cat === catName).length;
        }
        countEl.textContent = toBengaliNumeral(catCount);
      }
    });

    // 3. Sidebar "BD সব বিভাগ" count
    const allDivCountSpan = document.querySelector('.btn-all-div span > span:last-child');
    if (allDivCountSpan) {
      allDivCountSpan.textContent = toBengaliNumeral(LISTINGS.length);
    }

    // 4. Sidebar Divisions count
    const accBtnsAll = document.querySelectorAll('.accordion-btn');
    accBtnsAll.forEach(btn => {
      const divTextEl = btn.querySelector('span:first-child');
      const countEl = btn.querySelector('.c-count');
      if (divTextEl && countEl) {
        // Strip out emojis (e.g. 🏙 ঢাকা -> ঢাকা)
        const divName = divTextEl.textContent.replace(/[^\u0980-\u09FF\s]/g, '').trim();
        const divCount = LISTINGS.filter(item => item.div === divName).length;
        countEl.textContent = toBengaliNumeral(divCount);
      }
    });
  }

  updateDynamicCounts();

  // 1. Navbar Search Binding
  const headerSearchBtn = document.getElementById('headerSearchBtn');
  const headerSearchInput = document.getElementById('headerSearchInput');
  const headerDivSelect = document.getElementById('headerDivSelect');

  // Fill Header forms if query exists
  if (headerSearchInput && currentFilters.query) headerSearchInput.value = currentFilters.query;
  if (headerDivSelect && currentFilters.division && currentFilters.division !== 'all') headerDivSelect.value = currentFilters.division;

  const doSearch = () => {
    const q = headerSearchInput.value.trim();
    const d = headerDivSelect.value;
    window.location.href = `listings.html?q=${encodeURIComponent(q)}&div=${encodeURIComponent(d)}`;
  };

  if (headerSearchBtn) {
    headerSearchBtn.addEventListener('click', doSearch);
  }
  
  if (headerSearchInput) {
    headerSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') doSearch();
    });
  }

  // 2. Category Tabs Logic
  const catTabs = document.querySelectorAll('.cat-tab');
  catTabs.forEach(tab => {
    // Read the text to detect category
    const catName = tab.textContent.replace('🌐', '').trim();
    
    // Set active class if matches
    if (catName === currentFilters.category || (catName === 'সব ধরন' && currentFilters.category === 'all')) {
      if (fileName !== 'index' && fileName !== 'index.html') {
        tab.classList.add('active');
      }
    }

    tab.addEventListener('click', (e) => {
      // Allow default navigation (since href is correctly set to food.html etc. now)
    });
  });

  // 3. Main Render & Sidebar Binding
  // Ensure we run the exact rendering logic whenever there is a listing container
  const listingListEl = document.getElementById('listingList');
  const isListingsPage = listingListEl !== null;
  
  if (isListingsPage) {
    
    const applyAndRender = () => {
      // For now we still use local filtering for ease, but on the fetched server data
      const filtered = filterListings(currentFilters, LISTINGS); 
      renderListings(filtered, 'listingList');
      renderPagination(filtered.length);
      renderCount(filtered.length);
    };

    // Sidebar Accordion Logic
    const accBtns = document.querySelectorAll('.accordion-btn');
    accBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.classList.toggle('open');
      });
    });

    const allDivBtn = document.querySelector('.btn-all-div');
    if (allDivBtn) {
      allDivBtn.addEventListener('click', () => {
        currentFilters.division = 'all';
        currentFilters.district = null;
        applyAndRender();
      });
    }

    const distLinks = document.querySelectorAll('.district-link');
    distLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        currentFilters.district = link.textContent.trim();
        // Extract division from parent accordion if needed
        applyAndRender();
      });
    });

    // Rating Radios
    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    ratingRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        currentFilters.minRating = parseFloat(e.target.value);
        applyAndRender();
      });
    });

    // Option Checkboxes
    const binds = [
      { id: 'f-verified', key: 'verifiedOnly' },
      { id: 'f-premium', key: 'premiumOnly' },
      { id: 'f-online', key: 'onlineService' },
      { id: 'f-delivery', key: 'homeDelivery' },
      { id: 'f-open', key: 'openNow' },
      { id: 'f-24', key: 'open247' }
    ];

    binds.forEach(b => {
      const el = document.getElementById(b.id);
      if (el) {
        el.addEventListener('change', (e) => {
          currentFilters[b.key] = e.target.checked;
          applyAndRender();
        });
      }
    });

    // Sort Pills (UI feature for now, we just mock styling)
    const sortPills = document.querySelectorAll('.sort-pill');
    sortPills.forEach(pill => {
      pill.addEventListener('click', () => {
        sortPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        // Actual sort logic could go here
      });
    });

    // Initial render
    applyAndRender();
  }

  // --- Home Page Specific Logic ---
  const isHomePage = fileName === 'index.html' || fileName === 'index' || fileName === '';

  if (isHomePage) {
    // 1. Render Trusted Partners Slider
    const partnersTrack = document.getElementById('partnersTrack');
    if (partnersTrack && LISTINGS.length > 0) {
      const trusted = LISTINGS.filter(l => l.verified || l.premium || l.featured);
      const partnerList = [...trusted, ...trusted]; // Duplicate for seamless scroll
      
      partnersTrack.innerHTML = partnerList.map(item => `
        <div class="partner-item" title="${item.name}">
          <span class="logo-icon">${item.icon}</span>
          <span>${item.name}</span>
        </div>
      `).join('');

      // Partners slider animation
      let partnerPos = 0;
      const stepPartners = () => {
        partnerPos -= 0.5; // Speed
        if (Math.abs(partnerPos) >= partnersTrack.scrollWidth / 2) {
          partnerPos = 0;
        }
        partnersTrack.style.transform = `translateX(${partnerPos}px)`;
        requestAnimationFrame(stepPartners);
      };
      stepPartners();
    }

    // 2. Render Latest Blogs
    const blogGrid = document.getElementById('latestBlogGrid');
    if (blogGrid && BLOGS.length > 0) {
      blogGrid.innerHTML = BLOGS.slice(0, 3).map(post => `
        <div class="blog-card" onclick="window.location.href='info/blog.html?id=${post._id}'">
          <div class="blog-thumb">${post.image ? `<img src="${post.image}" style="width:100%;height:100%;object-fit:cover;">` : post.icon}</div>
          <div class="blog-body">
            <div class="blog-cat">${post.category}</div>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="blog-meta">
              <span>📅 ${post.date}</span>
              <span class="read-more">আরও পড়ুন →</span>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
});
