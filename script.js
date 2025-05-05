// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Función para registrar usuarios
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    auth.createUserWithEmailAndPassword(username + "@foro.com", password)
        .then(() => {
            alert("Registro exitoso, ahora inicia sesión");
            showLogin();
        })
        .catch(error => alert(error.message));
}

// Función para iniciar sesión
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(username + "@foro.com", password)
        .then(() => window.location.href = "foro.html")
        .catch(error => alert(error.message));
}

// Enviar mensajes al foro
function sendMessage() {
    const message = document.getElementById("message-input").value;
    db.collection("messages").add({
        user: auth.currentUser.email.split("@")[0],
        text: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// Mostrar mensajes en tiempo real
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML = "";
    snapshot.forEach(doc => {
        const msg = doc.data();
        messagesContainer.innerHTML += `<div class="message"><strong>${msg.user}:</strong> ${msg.text}</div>`;
    });
});

// Cerrar sesión
function logout() {
    auth.signOut().then(() => window.location.href = "index.html");
}
