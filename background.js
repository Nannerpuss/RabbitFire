// background.js

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'savePattern') {
    const patternData = message.data;

    // Save data to local storage (for simplicity)
    browser.storage.local.get({ patternMatches: [] })
      .then((result) => {
        const patternMatches = result.patternMatches;
        patternMatches.push(patternData);

        browser.storage.local.set({ patternMatches })
          .then(() => {
            console.log("Pattern data saved:", patternData);  // Debugging: Confirm data save
          })
          .catch((error) => {
            console.error("Error saving pattern data:", error);
          });
      });
  }
});
