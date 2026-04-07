const fs = require('fs');
const path = require('path');
const dir = process.cwd();

// Read index.html to use as a template
const template = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');

const headerEnd = template.indexOf('<div class="cat-strip">');
const headerPart = template.substring(0, headerEnd);
const footerPart = template.substring(template.indexOf('</main>') + 7);

const myContent = `
  <!-- LEAFLET API -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <style>
    .map-page-wrapper {
      display: flex;
      height: calc(100vh - 120px); /* Adjust based on exact header height */
      min-height: 600px;
      padding: 0;
      margin: 0;
      background: #fafafa;
    }

    .map-sidebar {
      width: 350px;
      min-width: 350px;
      background: #fff;
      box-shadow: 2px 0 10px rgba(0,0,0,0.05);
      z-index: 10;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .map-filters {
      padding: 20px;
      border-bottom: 1px solid var(--border);
      background: var(--yp-light);
    }

    .map-filters select {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid var(--yp);
      border-radius: 8px;
      font-family: inherit;
      background: #fff;
      outline: none;
    }

    .map-list-wrapper {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .map-list-count {
      font-size: 14px;
      color: var(--mid);
      margin-bottom: 15px;
      font-weight: 600;
    }

    .map-item-card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 15px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .map-item-card:hover {
      border-color: var(--yp);
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .map-item-title {
      font-weight: 700;
      color: var(--dark);
      font-size: 16px;
      margin-bottom: 5px;
    }

    .map-item-meta {
      font-size: 13px;
      color: var(--mid);
      margin-bottom: 3px;
    }

    /* Keep map on right */
    .map-view {
      flex: 1;
      position: relative;
      background: #e9e5dc;
    }

    #liveMap {
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .leaflet-popup-content h4 {
      margin: 0 0 5px 0;
      font-size: 16px;
      color: #1B6B3A;
    }
    .leaflet-popup-content p {
      margin: 0;
      font-size: 13px;
      color: #555;
    }
    .leaflet-popup-content a {
      color: #B8860B;
      font-weight: bold;
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .map-page-wrapper { flex-direction: column; height: 120vh; }
      .map-sidebar { width: 100%; height: 50vh; display: none; } /* Hide list on mobile */
      .map-view { height: 70vh; flex: none; width: 100%; }
    }
  </style>

  <main style="max-width:100%; padding: 0;">
    <div class="map-page-wrapper">
      <div class="map-sidebar">
        <div class="map-filters">
          <h3 style="margin-bottom: 15px; color: var(--dark);">🔍 ফিল্টার করুন</h3>
          <select id="mapCatFilter">
            <option value="all">সব ক্যাটাগরি</option>
            <option value="খাবার">খাবার (রেস্টুরেন্ট/ক্যাফে)</option>
            <option value="স্বাস্থ্য">স্বাস্থ্য (হাসপাতাল/ডায়াগনস্টিক)</option>
            <option value="শিক্ষা">শিক্ষা (স্কুল/কোচিং)</option>
            <option value="শপিং">শপিং (পোশাক/ফ্যাশন)</option>
            <option value="আবাসন">আবাসন (হোটেল/রিসোর্ট)</option>
            <option value="আইটি">আইটি ফার্ম</option>
            <option value="কোম্পানি">কোম্পানি</option>
            <option value="ছোট ব্যবসা">ছোট ব্যবসা</option>
            <option value="পরিবহন">পরিবহন</option>
            <option value="ফ্রিল্যান্সিং">ফ্রিল্যান্সিং</option>
            <option value="কৃষি">কৃষি</option>
          </select>
          
          <select id="mapDivFilter">
            <option value="all">সব বিভাগ</option>
            <option value="ঢাকা">ঢাকা</option>
            <option value="চট্টগ্রাম">চট্টগ্রাম</option>
            <option value="রাজশাহী">রাজশাহী</option>
            <option value="খুলনা">খুলনা</option>
            <option value="বরিশাল">বরিশাল</option>
            <option value="সিলেট">সিলেট</option>
            <option value="রংপুর">রংপুর</option>
            <option value="ময়মনসিংহ">ময়মনসিংহ</option>
          </select>
        </div>
        
        <div class="map-list-wrapper">
          <div class="map-list-count" id="mapListCount">লোড হচ্ছে...</div>
          <div id="mapListContainer"></div>
        </div>
      </div>
      
      <div class="map-view">
        <div id="liveMap"></div>
      </div>
    </div>
  </main>

  <script>
    // Configuration & State
    let map, markersGroup;
    let businessMarkers = [];
    
    // We get LISTINGS from js/data.js which is loaded below in the footerPart
    // Need to wait until DOMContentLoaded to access LISTINGS
    
    window.addEventListener("DOMContentLoaded", () => {
      // 1. Initialize Map
      map = L.map('liveMap').setView([23.8103, 90.4125], 7); // Default to Bangladesh
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      }).addTo(map);

      markersGroup = L.layerGroup().addTo(map);

      // 2. Read URL Params to Pre-filter (Task Requirement #2)
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('cat');
      const divParam = urlParams.get('div');
      
      if (catParam) document.getElementById('mapCatFilter').value = catParam;
      if (divParam) document.getElementById('mapDivFilter').value = divParam;

      // 3. Event Listeners for Filters
      document.getElementById('mapCatFilter').addEventListener('change', renderMap);
      document.getElementById('mapDivFilter').addEventListener('change', renderMap);

      // 4. Initial Render
      renderMap();
    });

    const toBnMapMap = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
    const toBnConvertMap = (numStr) => numStr.toString().replace(/\\d/g, d => toBnMapMap[d]);

    function renderMap() {
      // Clear existing UI
      markersGroup.clearLayers();
      document.getElementById('mapListContainer').innerHTML = '';
      businessMarkers = [];

      // Get Dropdown Values
      const selCat = document.getElementById('mapCatFilter').value;
      const selDiv = document.getElementById('mapDivFilter').value;

      // Filter LISTINGS array
      const results = LISTINGS.filter(item => {
        let matchCat = selCat === 'all' || item.cat === selCat || item.catLabel === selCat;
        let matchDiv = selDiv === 'all' || item.div === selDiv;
        return matchCat && matchDiv;
      });

      document.getElementById('mapListCount').innerText = \`মোট \${toBnConvertMap(results.length)} টি রেজাল্ট পাওয়া গেছে\`;

      // Track bounds to auto-zoom
      let bounds = [];

      results.forEach(item => {
        // Render Marker
        if (item.lat && item.lng) {
          const m = L.marker([item.lat, item.lng]);
          m.bindPopup(\`
            <h4>\${item.icon} \${item.name}</h4>
            <p>⭐ <b>\${item.rating}</b> | 📍 \${item.area}</p>
            <p>📞 \${item.phone}</p>
            <a href="business.html?id=\${item.id}" target="_blank">বিস্তারিত দেখুন →</a>
          \`);
          m.addTo(markersGroup);
          businessMarkers.push({ id: item.id, marker: m });
          bounds.push([item.lat, item.lng]);
        }

        // Render List Card
        const card = document.createElement('div');
        card.className = 'map-item-card';
        card.innerHTML = \`
          <div class="map-item-title">\${item.icon} \${item.name} <span style="font-size:12px; font-weight:normal; color:#888;">(\${item.cat})</span></div>
          <div class="map-item-meta">📍 \${item.area}, \${item.district}</div>
          <div class="map-item-meta">⭐ \${toBnConvertMap(item.rating)} (\${toBnConvertMap(item.reviews)} রিভিউ)</div>
        \`;
        
        // On click, pan to marker and open popup
        card.onclick = () => {
          if (item.lat && item.lng) {
            map.flyTo([item.lat, item.lng], 14, { duration: 1.5 });
            const foundM = businessMarkers.find(b => b.id === item.id);
            if (foundM) {
              setTimeout(() => foundM.marker.openPopup(), 1500); // Open popup after flight
            }
          }
        };

        document.getElementById('mapListContainer').appendChild(card);
      });

      // Fit bounds
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      } else {
        // Bangladesh default view
        map.setView([23.8103, 90.4125], 7);
      }
    }
  </script>
`;

fs.writeFileSync(path.join(dir, 'map.html'), headerPart + myContent + footerPart, 'utf-8');
console.log('Map HTML generated successfully!');
