// content.js

function detectPattern() {
  // Select the unit name element
  const unitNameElement = document.querySelector('h1');
  
  // Select all b elements with the class 'pre'
  const elements = document.querySelectorAll('b.pre');
  
  // Object to store the extracted pattern data
  const patternData = {
    unitName: null,
    St: null,
    Ag: null,
    Co: null,
    In: null,
    Wi: null,
    Ch: null
  };

  // Extract the unit name
  if (unitNameElement) {
    patternData.unitName = unitNameElement.textContent.trim();
  } else {
    console.log("Unit name element not found.");
    return;
  }

  elements.forEach((element) => {
    // Extract the label and value
    const label = element.textContent.trim().slice(0, -1); // Remove the trailing ':'
    const valueNode = element.nextSibling;

    if (valueNode && valueNode.nodeType === Node.TEXT_NODE) {
      const value = valueNode.nodeValue.trim().replace('.', '');

      if (patternData.hasOwnProperty(label)) {
        patternData[label] = value;
      }
    }
  });

  // Check if we have all the required values
  if (Object.values(patternData).every(v => v !== null)) {
    console.log("Pattern detected:", patternData);  // Debugging: Print detected pattern

    // Send data to background script
    browser.runtime.sendMessage({ action: 'savePattern', data: patternData });
  } else {
    console.log("Pattern not fully detected:", patternData);  // Debugging: Incomplete pattern data
  }
}

function observeDOM() {
  const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector('div#main.column > h1') && document.querySelector('b.pre')) {
      obs.disconnect(); // Stop observing
      detectPattern();  // Run detection
    }
  });
  
  observer.observe(document, { childList: true, subtree: true });
}

window.addEventListener("load", () => {
  observeDOM();
});
