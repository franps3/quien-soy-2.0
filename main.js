
// Lista de personajes
const personajes = ["Indio Solari", "Charly García","Luis Alberto Spinetta", "Gustavo Cerati", "Pappo", "Fabiana Cantilo", "Fito Páez", "Korneta Suarez","Abel Pintos", "Chano","Carlos Gardel","Milo J","Dillom","Duki","Emila Mernes",
    "María Becerra", "Nicky Nicole", "Luck Ra","Rodrigo Bueno", "Ca7riel","Paco Amoroso", "Ricardo Mollo", "Chaqueño Palavecino", "Skay Bellinson", "Vicentico", "Gilda", "Pablo Lezcano", "Ale Sergi", "Lali Espósito", "El Noba", "L-Gante", "WOS",
    "Mercedes Sosa", "Ricardo Iorio", "Andrés Calamaro", "Pity Álvarez", "Mirtha Legrand", "Juan Domingo Perón", "San José de San Martín", "Eva Perón", "Juan Manuel Belgrano", "Cristina Kirchner", "Jorge Rafael Videla", "Mauricio Macri", 
    "Carlos Menem", "Javier Milei", "Nik", "Myriam Bregman", "Leo Messi", "Manu Ginóbili", "Diego Maradona", "Juan Martín del Potro", "Paula Pareto", "Luis Scola", "Juan Román Riquelme", "Martín Palermo", "Ángel Di María", "LeBron James", 
    "Michael Jordan", "Mafalda", "Hijitus", "Gaturro", "Larguirucho", "Alberto Olmedo", "Jorge Porcel", "Wanda Nara", "Bananero", "Bananirou", "Gaspi", "Coscu", "Momo Benavidez", "Davo Xeneize", "Florencia Peña", "Guillermo Francella", "Luis Brandoni",
    "Mario Bros", "Luigi", "Sonic", "Rayman", "Kirby", "Donkey Kong", "Megaman", "Crash Bandicoot", "Kratos", "Steve Minecraft", "Gordon Freeman", "Pikachu", "Charizard", "Goku", "Vegeta", "Homero Simpson", "Bart Simpson", "Lisa Simpson", "Maggie Simpson",
    "Marge Simpson", "El Chavo del 8", "Chapulín Colorado", "Don Ramón", "Perry el Ornitorrinco", "Phineas", "Ferb", "Carlitox", "Jaique", "Edward (3A)", "Adriel", "Batman", "Spiderman","Capitán América", "Superman", "Linterna Verde", "El Eternauta",
    "El Guasón", "Iron Man", "Hulk", "Mujer Maravilla", "Flash Gordon", "Adolf Hitler", "Benito Mussolini", "Joseph Stalin", "Jesucristo", "Donald Trump", "JK Rowling", "John F. Kennedy", "Tung Tung Sahur", "Bob Esponja", "Patricio Estrella",
    "Don Cangrejo", "Calamardo", "Mickey Mouse", "Minnie Mouse","Goofy", "Pac-Man", "Simón Bolivar", "Domingo F. Sarmiento", "Julio A. Roca", "Martín Fierro", "Sandro de América", "Palito Ortega", "King Kong", "Godzilla"
];
let disponibles = [...personajes];

const personajeEl = document.querySelector('h3');
const timerEl = document.querySelector('h2');
const correctoEl = document.querySelector('.choice.correcto');
const incorrectoEl = document.querySelector('.choice.incorrecto');
const controlEl = document.querySelector('body > a.control');
const restartEl = document.querySelector('body > a.restart');
const refreshEl = document.querySelector('body > a.refresh');
const scoreEl = document.querySelector('#score');

let currentIndex = -1;
let timer = parseInt(timerEl.textContent, 10) || 60;
const initialTimer = timer;
let intervalId = null;
let score = 0;

function updatePersonaje() {
	if (currentIndex >= 0 && personajes[currentIndex] !== undefined) {
		personajeEl.textContent = personajes[currentIndex];
	}
}

function pickRandomPersonaje() {
	if (timer === 0) return; // no cambiar si el tiempo terminó
	if (disponibles.length === 0) {
		personajeEl.textContent = `Refresca repetidos`;
		currentIndex = -1;
		return;
	}
	const nextIndex = Math.floor(Math.random() * disponibles.length);
	const nextPersonaje = disponibles.splice(nextIndex, 1)[0];
	currentIndex = personajes.indexOf(nextPersonaje);
	updatePersonaje();
}

function startTimer() {
	if (intervalId) return;
	controlEl.classList.add('running');
	controlEl.setAttribute('aria-label', 'Pausar');
    pickRandomPersonaje();
	intervalId = setInterval(() => {
		if (timer > 0) {
			timer--;
			timerEl.textContent = timer;
			if (timer === 0) onTimerEnd();
		}
	}, 1000);
}

function pauseTimer() {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
	}
	controlEl.classList.remove('running');
	controlEl.setAttribute('aria-label', 'Iniciar');
}

function restartGame(e) {
	if (e) e.preventDefault();
	pauseTimer();
	resetDisponibles();
	timer = initialTimer;
	timerEl.textContent = timer;
	score = 0;
	updateScore();
	pickRandomPersonaje();
}

function resetDisponibles() {
	disponibles = [...personajes];
}

function refreshRepetidos(e) {
	if (e) e.preventDefault();
	resetDisponibles();
	if (timer === 0) return;
	// keep current personaje visible until next click
}

function updateScore() {
	if (scoreEl) scoreEl.textContent = `Puntuación: ${score}`;
}

function onTimerEnd() {
	pauseTimer();
	// reemplazar personaje por otro texto
	personajeEl.textContent = `Se acabó el tiempo!`;
}

// Toggle on control click
controlEl.addEventListener('click', (e) => {
	e.preventDefault();
	if (intervalId) pauseTimer();
	else startTimer();
});

// Restart click
if (restartEl) restartEl.addEventListener('click', restartGame);
if (refreshEl) refreshEl.addEventListener('click', refreshRepetidos);

// When correcto clicked, increase score and change personaje
correctoEl.addEventListener('click', () => {
	if (timer === 0) return;
	score++;
	updateScore();
	pickRandomPersonaje();
});
incorrectoEl.addEventListener('click', () => {
	if (timer === 0) return;
	pickRandomPersonaje();
});

// inicializar
personajeEl.textContent = "hola";
timerEl.textContent = timer;
updateScore();
controlEl.setAttribute('aria-label', 'Iniciar');
