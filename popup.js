// popup.js

document.addEventListener('DOMContentLoaded', () => {
  browser.storage.local.get({ patternMatches: [] })
    .then((result) => {
      const dataDiv = document.getElementById('data');
      const patternMatches = result.patternMatches;
      dataDiv.textContent = JSON.stringify(patternMatches, null, 2);
    });
});
