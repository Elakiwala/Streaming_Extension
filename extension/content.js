const style = document.createElement("link");
style.rel = "stylesheet";
style.href = chrome.runtime.getURL("style.css");
document.head.appendChild(style);


const socket = io("https://VOTRE_URL_NGROK.ngrok.io", {
  auth: { token: "token1" }
});

const room = window.location.hostname;

socket.emit("join-room", room);

// Chat texte
const chatBox = document.createElement("div");
chatBox.innerHTML = `
  <div id="sync-chat" style="position:fixed;bottom:10px;right:10px;width:300px;background:#fff;border:1px solid #ccc;z-index:9999;">
    <div><input id="msg" placeholder="Message..." style="width:80%;"><button id="send">Envoyer</button></div>
    <div id="messages" style="max-height:200px;overflow:auto;"></div>
    <button id="audio">Activer vocal</button>
  </div>
`;
document.body.appendChild(chatBox);

document.getElementById("send").onclick = () => {
  const msg = document.getElementById("msg").value;
  socket.emit("message", { room, text: msg });
};

socket.on("message", ({ text }) => {
  const div = document.createElement("div");
  div.textContent = text;
  document.getElementById("messages").appendChild(div);
});

// WebRTC vocal
let localStream, peer;
document.getElementById("audio").onclick = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  peer = new RTCPeerConnection();

  localStream.getTracks().forEach(track => peer.addTrack(track, localStream));

  peer.onicecandidate = ({ candidate }) => {
    if (candidate) socket.emit("signal", { to: room, candidate });
  };

  peer.ontrack = e => {
    const audio = new Audio();
    audio.srcObject = e.streams[0];
    audio.play();
  };

  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);

  socket.emit("signal", { to: room, offer });
};

socket.on("signal", async data => {
  if (data.offer) {
    peer = new RTCPeerConnection();
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localStream.getTracks().forEach(track => peer.addTrack(track, localStream));

    peer.onicecandidate = ({ candidate }) => {
      if (candidate) socket.emit("signal", { to: room, candidate });
    };
    peer.ontrack = e => {
      const audio = new Audio();
      audio.srcObject = e.streams[0];
      audio.play();
    };

    await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    socket.emit("signal", { to: room, answer });
  }
  if (data.answer) {
    await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
  }
  if (data.candidate) {
    await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
});
