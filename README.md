# Streaming_Extension

Objectif:
Permettre à plusieurs utilisateurs de synchroniser la lecture vidéo sur un site donné et d'avoir une fenêtre de chat partagé et un chat vocal.

Fonctionnalités principales:
1. Synchronisation de la vidéo (lecture, pause, position)
2. Fenêtre de chat écrit et vocal intégrée
3. Création & partage de "party" avec un identifiant unique
4. Détection automatique de la vidéo sur la page (HTLM5 <video>)


Etapes:
1. Créer l'extension de base (manifeste)
2. Synchronisation vidéo via WebSocket
2.5 Associer WebSocket (sync écrit) et WebRTC (sync audio en temps réel)
3. Ajouter une fenêtre de chat (écrit dans un premier temps) (popup.html)
4. Interface utilisateur simple (dans popup.html)
5. Sécurité et limitations (vérifier les droits pour les sites connus (Netflix, youtube) + Générer une liste de tokens autorisés dans server.js)
6. Déboguer et tester
7. Herbergement du serveur WebSocket
8. Compatibilité Firfox

Tech Stack minimal:
- Frontend (extension): JavaScript, HTML
- Backend (serveur): Node.js
- Chat écrit: WebSocket / Socker.io
- Chat vocal: WebRTC
- Signalisation: Socket.io
- Base de donnée (optionnelle): pour stocker les sessions actives (Redis, Mongo, etc)



Dossier:
streaming-extension/
___	extension/
	- manifest.json (configuration de l'extension)
	- content.js (chat écrit vocal (WebSocket + WebRTC))
	- popup.html (interface simple)
	- icon.png (icone par défaut)
	- background.js (requis par Manifest V3 (vide pour l'instant)
	- popup.js
	- style.css
___serveur/
	- server.js
	- package.json


Développement:
1. Créer le serveur Node.js
2. Installer + lancer Ngrok
3. Créer l'extension Chrome
4. Ajouter chat texte + vocal
5. Restreindre par token
6. Tester sur n'importe quel site de streaming (voiranime, youtube, Netflix)

Tester l'extension:
1. Chrome -> Extension -> Mode développeur -> "Charger une extension non empaquetée"
2. Selectionner le dosser streaming-extension
3. Ouvrir n'importe quel site de streaming
4. Cliquer sur l'icône -> Activer chat
5. L'interface chat/vocal apparaît
	- Ecrire dans le chat
	- Activer l'audio
	- Partager l'URL Ngrok avec un ami












