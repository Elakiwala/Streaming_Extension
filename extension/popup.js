document.getElementById("create-session").onclick = async () => {
  const sessionId = Math.random().toString(36).substring(2, 10);
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (id) => localStorage.setItem("syncparty-session-id", id),
    args: [sessionId],
  });
  alert(`Session créée : ${sessionId}`);
};

document.getElementById("join-session").onclick = async () => {
  const sessionId = document.getElementById("session-id").value;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (id) => localStorage.setItem("syncparty-session-id", id),
    args: [sessionId],
  });
  alert(`Session rejointe : ${sessionId}`);
};
