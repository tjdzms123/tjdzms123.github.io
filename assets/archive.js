function matchesRecord(text, query) {
  const normalized = text.normalize('NFC').toLocaleLowerCase('ko');
  return query.normalize('NFC').trim().toLocaleLowerCase('ko').split(/\s+/).every(term => normalized.includes(term));
}

if (typeof document === 'undefined') {
  module.exports = { matchesRecord };
} else {
  const params = new URLSearchParams(location.search);
  const themeLinks = document.querySelectorAll('[data-theme-link]');
  function updateThemeLinks() {
    for (const link of themeLinks) {
      const url = new URL(location.href);
      url.searchParams.set('theme', link.dataset.themeLink);
      link.href = url.href;
      if (link.dataset.themeLink === document.documentElement.dataset.theme) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
  }
  for (const link of themeLinks) link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.documentElement.dataset.theme = link.dataset.themeLink;
    try { localStorage.setItem('blog-theme', link.dataset.themeLink); } catch (_) {}
    history.replaceState(null, '', link.href);
    updateThemeLinks();
  });
  try { localStorage.setItem('blog-theme', document.documentElement.dataset.theme); } catch (_) {}
  updateThemeLinks();

  const search = document.querySelector('[data-search]');
  search.value = params.get('q') || '';
  const list = document.querySelector('[data-post-list]');
  if (list) {
    const rows = [...list.children];
    const more = document.querySelector('[data-more]');
    const searchPage = document.body.hasAttribute('data-search-page');
    let limit = 9;
    function renderRecords() {
      const query = searchPage ? search.value.trim() : '';
      let count = 0;
      for (const row of rows) {
        const matches = !searchPage || matchesRecord(row.dataset.searchText, query);
        row.hidden = !matches || ++count > limit;
      }
      document.querySelector('[data-count]').textContent = `${count}개의 글`;
      document.querySelector('[data-empty]').hidden = count > 0;
      more.hidden = count <= limit;
      if (searchPage) document.querySelector('[data-search-heading]').textContent = query ? `“${query}” 검색 결과` : '검색';
    }
    if (searchPage) search.addEventListener('input', () => {
      limit = 9;
      const url = new URL(location.href);
      if (search.value.trim()) url.searchParams.set('q', search.value.trim());
      else url.searchParams.delete('q');
      history.replaceState(null, '', url);
      updateThemeLinks();
      renderRecords();
    });
    more.addEventListener('click', () => {
      const next = rows.find(row => row.hidden && (!searchPage || matchesRecord(row.dataset.searchText, search.value)));
      limit += 9;
      renderRecords();
      if (next) next.querySelector('a').focus({ preventScroll: true });
    });
    renderRecords();
  }
}
