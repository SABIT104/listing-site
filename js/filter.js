// Applies multiple active filters (AND logic)
function filterListings(filters) {
  let results = [...LISTINGS];

  // 1. Division filter
  if (filters.division && filters.division !== 'all' && filters.division !== 'সব বিভাগ') {
    results = results.filter(item => item.div === filters.division);
  }

  // 2. District filter
  if (filters.district) {
    results = results.filter(item => item.district === filters.district);
  }

  // 3. Category filter
  if (filters.category && filters.category !== 'all' && filters.category !== 'সব ধরন') {
    results = results.filter(item => item.cat === filters.category);
  }

  // 4. Search Query filter (matches name, category, area, tags)
  if (filters.query) {
    const q = filters.query.toLowerCase().trim();
    results = results.filter(item => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchCat = item.cat.toLowerCase().includes(q) || item.catLabel.toLowerCase().includes(q);
      const matchArea = item.area.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      return matchName || matchCat || matchArea || matchTags;
    });
  }

  // 5. Rating filter
  if (filters.minRating) {
    results = results.filter(item => item.rating >= parseFloat(filters.minRating));
  }

  // 6. Checkbox filters
  if (filters.verifiedOnly) {
    results = results.filter(item => item.verified === true);
  }
  
  if (filters.premiumOnly) {
    results = results.filter(item => item.premium === true);
  }

  if (filters.openNow) {
    results = results.filter(item => item.open === true);
  }

  if (filters.onlineService) {
    results = results.filter(item => item.tags.includes('অনলাইন') || item.tags.includes('ফ্রিল্যান্সিং'));
  }

  if (filters.homeDelivery) {
    results = results.filter(item => item.tags.includes('ডেলিভারি'));
  }

  if (filters.open247) {
    results = results.filter(item => item.hours.includes('২৪ ঘণ্টা'));
  }

  return results;
}
