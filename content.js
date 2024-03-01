// Function to create the tooltip element
function createTooltip() {
  const tooltip = document.createElement('div');
  tooltip.id = 'tooltip-translate';
  document.body.appendChild(tooltip);
  return tooltip;
}

// Function to handle mouse hover
function handleMouseOver(event) {
  const tooltip = document.getElementById('tooltip-translate');
  const selectedText = event.target?.innerText?.trim();
  if (selectedText !== '') {
    translateText(selectedText, 'es')
      .then(translated => {
        console.log('Translated Text:', translated); // Log translated text for debugging
        tooltip.textContent = translated;
        tooltip.style.top = `${event.pageY + 10}px`;  // Adjust positioning as needed
        tooltip.style.left = `${event.pageX + 10}px`;  // Adjust positioning as needed
        tooltip.style.display = 'block';
      })
      .catch(error => {
        console.error('Translation Error:', error);
        tooltip.textContent = 'Translation Error';
        tooltip.style.display = 'block';
      });
  } else {
    tooltip.style.display = 'none';  // Hide tooltip if no text selected
  }
}

// Adding CSS styles for tooltip
const tooltipStyles = `
#tooltip-translate {
  position: absolute;
  z-index: 9999;
  border: 1px solid #ccc;
  background: #fff;
  padding: 5px;
  color: red; /* Set text color to red */
  display: none; /* Initially hide the tooltip */
}
`;

// Create a <style> element and add the CSS styles
const styleElement = document.createElement('style');
styleElement.textContent = tooltipStyles;
document.head.appendChild(styleElement);

// Call createTooltip() to create the tooltip element
const tooltip = createTooltip();

// Add event listener for mouseover
document.addEventListener('mouseover', handleMouseOver);

// Translation function
function translateText(text, targetLang) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5000/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        target_lang: targetLang
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.translated_text) {
        resolve(data.translated_text);
      } else {
        reject('Translation response format error');
      }
    })
    .catch(error => reject(error));
  });
}
