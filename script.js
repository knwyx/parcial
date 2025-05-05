// Variables globales
const users = [];
const comments = [];

// Función para registrar usuarios
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        users.push({ username, password });
        alert('Usuario registrado con éxito');
    } else {
        alert('Por favor, completa todos los campos');
    }
});

// Función para agregar comentarios
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const comment = document.getElementById('comment').value;

    if (comment) {
        comments.push(comment);
        displayComments();
        document.getElementById('comment').value = '';  // Limpiar el campo de comentario
    } else {
        alert('Por favor, escribe un comentario');
    }
});

// Función para mostrar los comentarios
function displayComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = comment;
        commentsList.appendChild(commentElement);
    });
}