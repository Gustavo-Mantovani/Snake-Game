// Configuração do Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamanho do canvas
const gridSize = 20;
const canvasSize = 400;
canvas.width = canvas.height = canvasSize;

// Inicializa o jogo
let snake = [{ x: 160, y: 160 }];
let food = { x: 0, y: 0 };
let dx = gridSize; // direção inicial para a direita
let dy = 0;
let score = 0;
let gameOver = false;

// Função para gerar comida em uma posição aleatória
function spawnFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Desenha a cobra e a comida
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a cobra
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green"; // cabeça verde clara, corpo verde
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Desenha a comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Exibe o placar
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// Atualiza o estado do jogo
function update() {
    if (gameOver) return;

    // Mover a cobra
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Verificar se a cobra colidiu com a parede ou consigo mesma
    if (
        head.x < 0 || head.x >= canvasSize || 
        head.y < 0 || head.y >= canvasSize || 
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver = true;
        alert("Game Over! Sua pontuação foi: " + score);
        return;
    }

    snake.unshift(head);

    // Verificar se a cobra comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        spawnFood(); // Cria nova comida
    } else {
        snake.pop(); // Remove a cauda da cobra
    }
    
    draw(); // Desenha o jogo
}

// Controla os movimentos da cobra com as teclas
function control(e) {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
}

// Configuração inicial
function init() {
    spawnFood();
    document.addEventListener("keydown", control);
    setInterval(update, 100); // Atualiza o jogo a cada 100ms
}

init();
