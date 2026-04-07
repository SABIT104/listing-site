function renderListings(arr, containerId = 'listingList') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (arr.length === 0) {
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <h3 style="color: var(--muted); margin-bottom: 10px;">কোনো ফলাফল পাওয়া যায়নি 😕</h3>
        <p>অনুগ্রহ করে অন্য কোনো কিছু লিখে খুঁজুন বা ফিল্টার পরিবর্তন করুন।</p>
      </div>
    `;
    return;
  }

  arr.forEach((item, index) => {
    // Generate tags HTML
    const tagsHtml = (item.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join('');
    
    // Status color
    const statusClass = item.open ? 'open' : 'closed';
    const statusText = item.open ? 'এখন খোলা' : 'বন্ধ';
    
    // Feature/Premium labels
    let badgeHtml = '';
    let rightLabel = '';
    let featuredClass = '';
    
    // In screenshot, "ফিচার্ড" rightLabel is grey text. "প্রিমিয়াম" rightLabel is grey text.
    if (item.featured) {
      badgeHtml += `<span class="badge-ft">ফিচার্ড</span>`;
      rightLabel = `<div style="font-size: 11px; color: var(--muted); margin-bottom:5px; text-align:center;">ফিচার্ড</div>`;
      featuredClass = 'featured';
    }
    if (item.premium) {
      badgeHtml += `<span class="badge-pr" style="background:#2A2A2A; color:#D4A017;">প্রিমিয়াম</span>`;
      if (!rightLabel) rightLabel = `<div style="font-size: 11px; color: var(--muted); margin-bottom:5px; text-align:center;">প্রিমিয়াম</div>`;
    }
    if (item.verified) {
      // Light green bg or white bg with green border
      badgeHtml += `<span class="badge-vf" style="border:1px solid #1B6B3A; color:#1B6B3A; padding:2px 8px; border-radius:12px; font-size:11px;">✓ যাচাইকৃত</span>`;
    }

    const cardHtml = `
      <div class="listing-item ${featuredClass}" style="animation-delay: ${index * 0.05}s; align-items: flex-start;">
        <!-- LEFT -->
        <div class="item-left">
          <div class="icon-box" style="background: ${item.bg || 'var(--yp-light)'};">
            ${item.icon}
          </div>
          ${item.verified ? '<div class="verified-dot" style="background:var(--green); color:#fff; border-radius:50%; width:20px; height:20px; display:flex; justify-content:center; align-items:center; position:absolute; bottom:-5px; right:-5px; font-size:12px; border:2px solid #fff;">✓</div>' : ''}
        </div>
        
        <!-- MIDDLE -->
        <div class="item-middle">
          <h3 class="biz-name" style="margin-bottom:8px; display:flex; align-items:center; gap:8px;">
            <a href="business.html?id=${item._id || item.id}" style="color:#000; font-size:20px;">${item.name}</a>
            ${badgeHtml}
          </h3>
          <div class="biz-cat-loc" style="font-size:13px; color:var(--mid); margin-bottom:8px;">
            ${item.category || item.cat} • <span style="color:var(--red);">📍</span> ${item.area}, ${item.district}
          </div>
          <div class="biz-rating" style="margin-bottom:8px; font-size:13px; display:flex; align-items:center; gap:8px;">
            <span class="stars" style="color:#B8860B; letter-spacing:2px;">★★★★☆</span>
            <span style="font-weight: 700; color:#000;">${item.rating}</span>
            <span class="rev-count" style="color:var(--muted);">(${item.reviews} রিভিউ)</span>
            <span style="color:var(--green); font-weight:600;">• ${statusText}</span>
          </div>
          <p class="biz-desc" style="color:var(--mid); font-size:14px; margin-bottom:12px;">${item.description || item.desc}</p>
          <div class="biz-meta" style="font-size:13px; color:var(--mid); margin-bottom:12px; display:flex; gap:15px;">
            <span><span style="color:var(--red);">📞</span> ${item.phone}</span>
            <span><span style="color:var(--red);">📍</span> ${item.addr}</span>
            ${item.web ? `<span><span style="color:#2196F3;">🌐</span> ${item.web}</span>` : ''}
          </div>
          <div class="biz-tags" style="display:flex; gap:8px; flex-wrap:wrap;">
            ${tagsHtml}
          </div>
        </div>

        <!-- RIGHT -->
        <div class="item-right" style="text-align:center; display:flex; flex-direction:column; gap:8px; min-width:140px; border-left:1px solid var(--border); padding-left:15px;">
          ${rightLabel}
          <button class="btn-phone" onclick="window.location.href='tel:${item.phone}'" style="background:var(--yp); color:var(--dark); width:100%; padding:10px; border-radius:var(--radius); font-weight:600; text-align:center;">
            📞 ফোন করুন
          </button>
          <div class="phone-text" style="font-weight:700; font-size:14px; color:#000; margin-bottom:5px;">${item.phone}</div>
          ${item.web ? `<button class="btn-web" onclick="window.open('http://${item.web}', '_blank')" style="background:#fff; border:1px solid var(--border); color:#2196F3; width:100%; padding:8px; border-radius:var(--radius); text-align:center;">🌐 ওয়েবসাইট</button>` : ''}
          <a href="business.html?id=${item._id || item.id}" class="btn-details" style="display:block; background:#fff; border:1px solid var(--border); color:var(--muted); width:100%; padding:8px; border-radius:var(--radius); text-align:center; font-size:13px; text-decoration:none;">বিস্তারিত দেখুন</a>
        </div>
      </div>
    `;
    
    container.insertAdjacentHTML('beforeend', cardHtml);
  });
}

function renderPagination(totalCount) {
  const pag = document.getElementById('pagination');
  if (!pag) return;
  
  if (totalCount === 0) {
    pag.innerHTML = '';
    return;
  }
  
  // Hardcoded for demo
  pag.innerHTML = `
    <button class="page-btn">‹</button>
    <button class="page-btn active">1</button>
    <button class="page-btn">2</button>
    <button class="page-btn">3</button>
    <button class="page-btn">›</button>
  `;
}

function toBengaliNumeral(num) {
  const engToBng = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
  return num.toString().replace(/\d/g, match => engToBng[match]);
}

function renderCount(n) {
  const cnt = document.getElementById('resultCount');
  if (cnt) {
    cnt.textContent = `${toBengaliNumeral(n)} টি ফলাফল`;
  }
}
