document.querySelectorAll('.truncate').forEach(el => {
  const maxLength = el.dataset.maxLength;
  if (el.textContent.length > maxLength) {
    el.textContent = el.textContent.substr(0, maxLength) + '...';
  }
});