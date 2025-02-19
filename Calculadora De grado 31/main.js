// Simulación de base de datos de usuarios
let users = JSON.parse(localStorage.getItem('users')) || [];

// Mostrar/Ocultar Login y Registro
function toggleLogin() {
    const loginContainer = document.getElementById('loginContainer');
    loginContainer.style.display = loginContainer.style.display === 'flex' ? 'none' : 'flex';
    document.getElementById('registerContainer').style.display = 'none';
}

function toggleRegister() {
    const registerContainer = document.getElementById('registerContainer');
    registerContainer.style.display = registerContainer.style.display === 'flex' ? 'none' : 'flex';
    document.getElementById('loginContainer').style.display = 'none';
}

// Mostrar/Ocultar Menú de Perfil
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

// Cerrar Menú de Perfil al hacer clic fuera
document.addEventListener('click', function(event) {
    const profileContainer = document.getElementById('profileContainer');
    if (!profileContainer.contains(event.target)) {
        document.getElementById('profileMenu').style.display = 'none';
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', username);
        document.getElementById('loggedInUser').textContent = `Bienvenido, ${username}`;
        toggleLogin();
        loadHistory();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    if (users.some(u => u.username === newUsername)) {
        alert('El usuario ya existe');
        return;
    }


    users.push({ username: newUsername, password: newPassword });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    toggleRegister();
});

// Logout
function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('loggedInUser').textContent = '';
    loadHistory();
}

// Redirección a calculadoras
function redirectToCalculator(page) {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
        const history = JSON.parse(localStorage.getItem('history') || '[]');
        history.push({ user, page, timestamp: new Date().toLocaleString() });
        localStorage.setItem('history', JSON.stringify(history));
    }
    window.location.href = page
}
// Array de frases motivadoras
// Array de frases motivadoras
const motivationalQuotes = [
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No te rindas, comienza ahora mismo.",
    "Cada día es una nueva oportunidad para cambiar tu vida.",
    "El único límite para nuestros logros es el que nos ponemos a nosotros mismos.",
    "Si puedes soñarlo, puedes hacerlo.",
    "El esfuerzo continuo es la clave para desbloquear nuestro potencial.",
    "Cada paso que das te acerca más a tu meta.",
    "La perseverancia es el secreto del éxito.",
    "Las matemáticas son el lenguaje con el que Dios ha escrito el universo.",
    "Las matemáticas son la reina de las ciencias y la aritmética es la reina de las matemáticas.",
    "Las matemáticas son la gimnasia del espíritu y una preparación para la filosofía.",
    "Las matemáticas pueden ser definidas como la ciencia del orden y la medida.",
    "La física no es nada más que matemáticas aplicadas.",
    "La naturaleza habla en el lenguaje de las matemáticas.",
    "Sin matemáticas, no hay física.",
    "Las matemáticas son la herramienta con la que se construyen los modelos de la física.",
    "La física es la ciencia que mide lo que existe y busca patrones que relacionen esas medidas.",
    "Las matemáticas son el alfabeto con el que está escrito el libro de la naturaleza.",
    "La física es el intento de entender el universo con la ayuda de las matemáticas.",
    "Las matemáticas son la clave para abrir las puertas de la física.",
    "La física es la ciencia que nos permite entender el mundo que nos rodea, y las matemáticas son la herramienta que nos permite hacerlo.",
    "Las matemáticas son la columna vertebral de la física.",
    "La matemática es la ciencia del orden y la medida, de bellas cadenas de razonamientos, todos sencillos y fáciles.",
    "El estudio de las matemáticas es como el río Nilo: comienza en minucias y termina en inmensidades.",
    "Las matemáticas son el alfabeto con el cual Dios ha escrito el universo.",
    "En matemáticas, la libertad consiste en la capacidad de cambiar de punto de vista sin cambiar de objeto.",
    "La belleza de las matemáticas sólo se muestra a sus seguidores más pacientes.",
    "Los números son los amigos más fieles que podemos tener.",
    "La matemática es la reina de las ciencias y la aritmética es la reina de las matemáticas.",
    "Las matemáticas son una gimnasia del espíritu y una preparación para la filosofía.",
    "Las matemáticas pueden ser definidas como la ciencia del orden y la medida.",
    "La química es la ciencia de las moléculas y sus transformaciones, y las matemáticas son la herramienta que nos permite entenderlas.",
    "La química es la ciencia que estudia la materia y sus propiedades, y las matemáticas son el lenguaje que nos permite describirlas.",
    "La química es la ciencia que nos permite entender cómo funciona el mundo a nivel molecular, y las matemáticas son la herramienta que nos permite hacerlo.",
    "Las matemáticas son la clave para entender las reacciones químicas y sus velocidades.",
    "La química es la ciencia que nos permite crear nuevas moléculas y materiales, y las matemáticas son la herramienta que nos permite diseñarlos.",
    "Las matemáticas son esenciales para el cálculo de las propiedades de las moléculas y las reacciones químicas.",
    "La química es la ciencia que nos permite entender cómo se relacionan la estructura y las propiedades de las moléculas, y las matemáticas son la herramienta que nos permite hacerlo.",
    "Las matemáticas son fundamentales para el diseño de experimentos químicos y el análisis de datos.",
    "La química es la ciencia que nos permite entender cómo se producen las reacciones químicas, y las matemáticas son la herramienta que nos permite modelarlas.",
    "Las matemáticas son la base de la química teórica y computacional."
];

// Función para cambiar la frase
function changeQuote() {
    const quoteElement = document.getElementById('motivationalQuote');
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    quoteElement.textContent = motivationalQuotes[randomIndex];
}

// Mostrar una frase aleatoria al cargar la página
window.onload = function() {
    changeQuote(); // Mostrar una frase aleatoria al inicio
};
// Función para cambiar el fondo
function changeBackground(background) {
    document.body.style.background = background;
}
// // Mostrar una frase aleatoria al cargar la página
// window.onload = function() {
//     changeQuote(); // Mostrar una frase aleatoria al inicio
// };
// Función para cambiar el fondo
function changeBackground(background) {
    document.body.style.background = background;
}
// Historial de la calculadora y parte del login
