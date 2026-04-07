function openModal(id) {
  const item = LISTINGS.find(x => x.id == id);
  if (!item) return;

  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  // Build the modal contents dynamically if needed or just show the static one for now.
  // The user requested a specific modal design, we can either inject HTML here or assume it's written in business.html (wait, the modal is for what? Ah, the user specifications say "js/modal.js: function openModal(id) -> builds + shows modal overlay"). Let's build it here.

  const tags = item.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
  
  overlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <div>
          <div style="font-size: 40px; margin-bottom: 10px;">${item.icon}</div>
          <h2 style="color: var(--dark); font-size: 24px; margin-bottom: 5px;">${item.name}</h2>
          <div style="font-size: 14px; color: var(--muted);">
            <span class="stars">★★★★★</span> <span style="color: var(--dark); font-weight: 600;">${item.rating}</span> (${item.reviews})
          </div>
        </div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      
      <div class="modal-body">
        <div class="modal-grid-info">
          <div class="info-card">
            <h5>ফোন নম্বর</h5>
            <div style="font-weight: 600;">${item.phone}</div>
          </div>
          <div class="info-card">
            <h5>ওয়েবসাইট</h5>
            <div style="font-weight: 600;">${item.web || 'প্রযোজ্য নয়'}</div>
          </div>
          <div class="info-card">
            <h5>ঠিকানা</h5>
            <div style="font-weight: 600;">${item.addr}</div>
          </div>
          <div class="info-card">
            <h5>কার্যসময়</h5>
            <div style="font-weight: 600; color: ${item.open ? 'var(--green)' : 'var(--red)'};">${item.hours}</div>
          </div>
        </div>
        
        <div class="modal-desc-box">
          <h4 style="margin-bottom: 15px; color: var(--green);">বিবরণ</h4>
          <p style="color: var(--mid); line-height: 1.6;">${item.desc}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h4 style="margin-bottom: 10px; font-size: 14px;">ট্যাগসমূহ:</h4>
          <div class="biz-tags">${tags}</div>
        </div>
        
        <div class="modal-gallery">
          <div class="gallery-holder">ছবি যোগ করুন</div>
          <div class="gallery-holder">ছবি যোগ করুন</div>
          <div class="gallery-holder">ছবি যোগ করুন</div>
        </div>
      </div>
      
      <div class="modal-action-bar">
        <button class="btn-phone" onclick="window.location.href='tel:${item.phone}'">📞 ফোন করুন</button>
        <button class="btn-msg">✉️ মেসেজ পাঠান</button>
      </div>
    </div>
  `;

  overlay.classList.add('show');
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('show');
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});
