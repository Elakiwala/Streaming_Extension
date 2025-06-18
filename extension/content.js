// Récupérer l'ID de session depuis localStorage de la page
const sessionId = localStorage.getItem("syncparty-session-id");

if (!sessionId) {
  console.log("SyncParty : Pas de session active.");
} else {
  console.log(`SyncParty : Session active : ${sessionId}`);
  initSyncParty(sessionId);
}

function initSyncParty(sessionId) {
  // Chercher la vidéo sur la page
  const video = document.querySelector("video");

  if (!video) {
    console.log("SyncParty : Pas de vidéo détectée sur cette page.");
    return;
  }

  // Afficher une petite UI discrète pour test
  let statusDiv = document.createElement("div");
  statusDiv.style.position = "fixed";
  statusDiv.style.bottom = "10px";
  statusDiv.style.right = "10px";
  statusDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
  statusDiv.style.color = "white";
  statusDiv.style.padding = "5px 10px";
  statusDiv.style.fontSize = "14px";
  statusDiv.style.borderRadius = "5px";
  statusDiv.style.zIndex = 9999;
  statusDiv.textContent = `Session: ${sessionId} | État: prêt`;
  document.body.appendChild(statusDiv);

  // Écouteurs d'événements vidéo
  video.addEventListener("play", () => {
    statusDiv.textContent = `Session: ${sessionId} | État: lecture`;
    console.log("SyncParty : lecture démarrée");
    // Ici on enverra au serveur la commande 'play'
  });

  video.addEventListener("pause", () => {
    statusDiv.textContent = `Session: ${sessionId} | État: pause`;
    console.log("SyncParty : lecture en pause");
    // Ici on enverra au serveur la commande 'pause'
  });

  video.addEventListener("seeked", () => {
    statusDiv.textContent = `Session: ${sessionId} | Position: ${Math.floor(video.currentTime)}s`;
    console.log("SyncParty : position changée à", video.currentTime);
    // Ici on enverra au serveur la commande 'seek'
  });

  // TODO: Connexion WebSocket au serveur Render (étape 3)
}
