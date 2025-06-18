document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.getElementById("createSession");
  const joinBtn = document.getElementById("joinSession");
  const statusDiv = document.getElementById("status");
  const leaveBtn = document.getElementById("leaveSession");


  // Créer une session (ID aléatoire)
  createBtn.addEventListener("click", () => {
    const sessionId = generateSessionId();
    if (confirm(`Créer la session avec l'ID suivant ?\n${sessionId}`)) {
      injectSessionIdInPage(sessionId);
      statusDiv.textContent = `Session créée : ${sessionId}`;
    }
  });

  // Rejoindre une session existante
  joinBtn.addEventListener("click", () => {
    const sessionId = prompt("Entrez l'ID de la session à rejoindre :");
    if (sessionId && sessionId.trim() !== "") {
      injectSessionIdInPage(sessionId.trim());
      statusDiv.textContent = `Session rejointe : ${sessionId}`;
    }
  });

  // Quitter une session existante
  leaveBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0].id) return;
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        localStorage.removeItem("syncparty-session-id");
      },
    }).then(() => {
      statusDiv.textContent = "Session quittée, synchronisation arrêtée.";
    }).catch((err) => {
      statusDiv.textContent = "Erreur lors de la déconnexion : " + err.message;
    });
  });
});


  // Fonction pour générer un ID session aléatoire (8 caractères alphanumériques)
  function generateSessionId() {
    return Math.random().toString(36).substr(2, 8);
  }

  // Injecter sessionId dans localStorage de la page active
  function injectSessionIdInPage(sessionId) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].id) {
        statusDiv.textContent = "Erreur : onglet introuvable";
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (id) => {
          localStorage.setItem("syncparty-session-id", id);
        },
        args: [sessionId],
      }).then(() => {
        statusDiv.textContent += "\nSession enregistrée dans la page.";
      }).catch((err) => {
        statusDiv.textContent = "Erreur injection session : " + err.message;
      });
    });
  }
});
