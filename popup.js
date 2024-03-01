document.addEventListener('DOMContentLoaded', function () {
  // Get the translate button
  const translateButton = document.getElementById('translate-button');

  // Add click event listener to the translate button
  translateButton.addEventListener('click', function () {
    // Get the input text and target language
    const inputText = document.getElementById('input-text').value;
    const targetLang = document.getElementById('target-lang').value;

    // Send a message to content script to start translation
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'translate', text: inputText, targetLang: targetLang }, function (response) {
        // Handle response from content script if needed
        console.log(response);
      });
    });
  });
});
