chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["prank.css"]
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["prank.js"]
    });
  } catch (err) {
    console.error("Fake Update Prank: failed to inject —", err.message);
  }
});
