// Space Invaders Clone with Classic Graphics

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
console.log("Canvas added to document");

// Add this line to make sure the canvas is visible
canvas.style.border = "1px solid white";
// Invader sprites
const invaderSprites = {
    bottom: [
        [
            [0,0,1,0,0,0,0,0,1,0,0],
            [0,0,0,1,0,0,0,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,0,0],
            [0,1,1,0,1,1,1,0,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,1,1,0,1],
            [1,0,1,0,0,0,0,0,1,0,1],
            [0,0,0,1,1,0,1,1,0,0,0]
        ],
        [
            [0,0,1,0,0,0,0,0,1,0,0],
            [1,0,0,1,0,0,0,1,0,0,1],
            [1,0,1,1,1,1,1,1,1,0,1],
            [1,1,1,0,1,1,1,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,0,0,0,0,0,1,0,0],
            [0,1,0,0,0,0,0,0,0,1,0]
        ]
    ],
    middle: [
        [
            [0,0,0,1,1,1,1,1,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,0,0,1,0,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1],
            [0,0,1,1,1,0,1,1,1,0,0],
            [0,1,1,0,0,1,0,0,1,1,0],
            [1,0,0,1,1,0,1,1,0,0,1]
        ],
        [
            [0,0,0,1,1,1,1,1,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,0,0,1,0,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1],
            [0,0,0,1,1,0,1,1,0,0,0],
            [0,0,1,1,0,1,0,1,1,0,0],
            [0,1,0,0,0,0,0,0,0,1,0]
        ]
    ],
    top: [
        [
            [0,0,0,0,1,1,1,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,0],
            [1,1,0,0,1,1,1,0,0,1,1],
            [1,1,1,1,1,1,1,1,1,1,1],
            [0,0,1,1,1,1,1,1,1,0,0],
            [0,1,1,0,1,1,1,0,1,1,0],
            [1,0,1,1,0,0,0,1,1,0,1]
        ],
        [
            [0,0,0,0,1,1,1,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,0],
            [1,1,0,0,1,1,1,0,0,1,1],
            [1,1,1,1,1,1,1,1,1,1,1],
            [0,0,1,1,1,1,1,1,1,0,0],
            [0,1,1,0,1,1,1,0,1,1,0],
            [0,0,1,1,0,0,0,1,1,0,0]
        ]
    ]
};

const playerSprites = {
    ship: [
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1]
    ],
    explosion: [
        [
            [0,0,0,0,1,0,1,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,1],
            [0,0,1,0,0,1,0,0,1,0,0],
            [0,0,0,0,1,0,1,0,0,0,0],
            [1,0,0,1,0,0,0,1,0,0,1],
            [0,0,1,0,0,0,0,0,1,0,0],
            [0,1,0,0,1,0,1,0,0,1,0]
        ],
        [
            [0,1,0,0,0,0,0,0,0,1,0],
            [0,0,1,0,0,0,0,0,1,0,0],
            [0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [1,1,0,0,0,0,0,0,0,1,1],
            [0,0,1,1,0,0,0,1,1,0,0],
            [1,0,0,0,1,1,1,0,0,0,1]
        ],
        [
            [0,0,1,0,0,0,0,0,1,0,0],
            [1,0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,1,0],
            [0,0,0,1,0,0,0,1,0,0,0],
            [1,0,0,0,0,1,0,0,0,0,1]
        ]
    ]
};

// Game objects
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 33,
    height: 21,
    speed: 5,
    lives: 3,
    isExploding: false,
    explosionFrame: 0,
    explosionCounter: 0
};

let invaderDirection = 1;
let invaderDropDistance = 30;
let invaderSpeed = 0.2;
let invaderAnimationFrame = 0;
let invaderAnimationCounter = 0;
let gameOver = false;

const invaderRows = 5;
const invaderCols = 11;
const invaderWidth = 33;
const invaderHeight = 24;
const invaderPadding = 10;
const maxInvaderSpeed = 2;


// Add this function to initialize invaders
function initializeInvaders() {
    invaders = [];
    for (let row = 0; row < invaderRows; row++) {
        for (let col = 0; col < invaderCols; col++) {
            invaders.push({
                x: col * (invaderWidth + invaderPadding),
                y: row * (invaderHeight + invaderPadding) + 50,
                width: invaderWidth,
                height: invaderHeight,
                type: row < 1 ? 'top' : row < 3 ? 'middle' : 'bottom',
                isAlive: true,
                isExploding: false,
                explosionCounter: 0
            });
        }
    }
}

let bases = [];
const baseWidth = 60;
const baseHeight = 40;
const baseCount = 4;

let bullets = [];
let invaderBullets = [];


const sounds = {
    explosion: new Audio('sounds/explosion.wav'),
    invaderKilled: new Audio('sounds/invaderkilled.wav'),
    shoot: new Audio('sounds/shoot.wav'),
    invaderMove1: new Audio('sounds/4.wav'),
    invaderMove2: new Audio('sounds/5.wav')
};

// Add these variables for managing invader sounds
let invaderSoundToggle = false;
let lastInvaderMoveTime = 0;
        

// Initialize bases
for (let i = 0; i < baseCount; i++) {
    bases.push({
        x: (i + 1) * (canvas.width / (baseCount + 1)) - baseWidth / 2,
        y: canvas.height - 100,
        width: baseWidth,
        height: baseHeight,
        health: 100
    });
}

// Key states
const keys = {};

// Event listeners
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// Game loop
function gameLoop() {
    if (!gameOver) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}


// Update game state
function update() {
    const currentTime = performance.now();

    if (player.isExploding) {
        player.explosionCounter++;
        if (player.explosionCounter >= 10) {
            player.explosionFrame++;
            player.explosionCounter = 0;
            if (player.explosionFrame >= playerSprites.explosion.length) {
                player.isExploding = false;
                player.explosionFrame = 0;
                player.lives--;
                if (player.lives <= 0) {
                    gameOver = true;
                }
                sounds.explosion.play();
            }
        }
    } else {    
        // Player movement
        if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
        if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;

        // Player shooting
        if (keys['Space'] && player.canShoot && bullets.length === 0) {
            bullets.push({x: player.x + player.width / 2, y: player.y, width: 3, height: 15});
            sounds.shoot.play();
            player.canShoot = false;
        }
    }

    bullets.forEach(bullet => bullet.y -= 7);
    bullets = bullets.filter(bullet => bullet.y > 0);
    if (bullets.length === 0) {
        player.canShoot = true;
    }

    invaderBullets.forEach(bullet => bullet.y += 5);
    invaderBullets = invaderBullets.filter(bullet => bullet.y < canvas.height);

    // Move and update invaders
    let shouldDropInvaders = false;
    let invadersMoved = false;
    invaders.forEach(invader => {
        if (invader.isAlive && !invader.isExploding) {
            invader.x += invaderSpeed * invaderDirection;
            invadersMoved = true;
            if (invader.x <= 0 || invader.x + invaderWidth >= canvas.width) {
                shouldDropInvaders = true;
            }
            // Check if invaders reached the bottom
            if (invader.y + invaderHeight >= player.y) {
                gameOver = true;
            }
        } else if (invader.isExploding) {
            invader.explosionCounter++;
            if (invader.explosionCounter >= 30) {
                invader.isExploding = false;
                invader.isAlive = false;
            }
        }
    });

    if (shouldDropInvaders) {
        invaderDirection *= -1;
        invaders.forEach(invader => {
            if (invader.isAlive) {
                invader.y += invaderDropDistance;
            }
        });
    }

    // Play invader movement sound
    if (invadersMoved) {
        const invaderMoveInterval = 1000 / (invaderSpeed * 4); // Adjust this formula as needed
        if (currentTime - lastInvaderMoveTime >= invaderMoveInterval) {
            if (invaderSoundToggle) {
                sounds.invaderMove1.play();
            } else {
                sounds.invaderMove2.play();
            }
            invaderSoundToggle = !invaderSoundToggle;
            lastInvaderMoveTime = currentTime;
        }
    }

    // Invader animation
    invaderAnimationCounter++;
    if (invaderAnimationCounter >= 30) {
        invaderAnimationFrame = 1 - invaderAnimationFrame;
        invaderAnimationCounter = 0;
    }

    // Invader shooting
    if (Math.random() < 0.02 && invaders.length > 0) {
        const shooter = invaders[Math.floor(Math.random() * invaders.length)];
        if (!shooter.isExploding) {
            invaderBullets.push({x: shooter.x + invaderWidth / 2, y: shooter.y + invaderHeight, width: 3, height: 15});
        }
    }

    bullets.forEach(bullet => {
        invaders.forEach(invader => {
            if (invader.isAlive && !invader.isExploding && collision(bullet, invader)) {
                invader.isExploding = true;
                invader.explosionCounter = 0;
                bullets = bullets.filter(b => b !== bullet);
                sounds.invaderKilled.play();
                // Increase invader speed when an invader is destroyed
                invaderSpeed = Math.min(maxInvaderSpeed, invaderSpeed + 0.01);
                
                // Adjust the pitch of the sound as speed increases
                const pitchIncrease = 1 + (invaderSpeed - 0.2) / (maxInvaderSpeed - 0.2);
                sounds.invaderMove1.playbackRate = pitchIncrease;
                sounds.invaderMove2.playbackRate = pitchIncrease;
            }
        });
    });

    invaderBullets.forEach(bullet => {
        if (collision(bullet, player) && !player.isExploding) {
            player.isExploding = true;
            player.explosionFrame = 0;
            player.explosionCounter = 0;
            invaderBullets = invaderBullets.filter(b => b !== bullet);  
        }
        bases.forEach(base => {
            if (collision(bullet, base)) {
                base.health -= 10;
                invaderBullets = invaderBullets.filter(b => b !== bullet);
            }
        });
    });

    // Check for game over condition
    if (invaders.every(invader => !invader.isAlive)) {
        gameOver = true;
        // You might want to add a "You Win!" message here
    }
}

// Draw game objects
function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player
    if (player.isExploding) {
        drawPlayerExplosion(player.x, player.y, player.explosionFrame);
    } else {
        drawPlayer(player.x, player.y);
    }

    // Draw invaders
    invaders.forEach(invader => {
        if (invader.isAlive) {
            if (invader.isExploding) {
                drawInvaderExplosion(invader.x, invader.y, invader.explosionCounter);
            } else {
                drawInvader(invader.x, invader.y, invader.type, invaderAnimationFrame);
            }
        }
    });
    // Draw bases
    bases.forEach(base => {
        ctx.fillStyle = `rgba(0, 0, 255, ${base.health / 100})`;
        ctx.fillRect(base.x, base.y, base.width, base.height);
    });

    // Draw bullets
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height));

    ctx.fillStyle = 'red';
    invaderBullets.forEach(bullet => ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height));

    // Draw lives
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Lives: ${player.lives}`, 10, 30);

    // Draw game over screen
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText('GAME OVER', canvas.width / 2 - 100, canvas.height / 2);
    }
}

// Draw invader function
function drawInvader(x, y, type, frame) {
    const sprite = invaderSprites[type][frame];
    const pixelSize = 3;
    
    for (let row = 0; row < sprite.length; row++) {
        for (let col = 0; col < sprite[row].length; col++) {
            if (sprite[row][col] === 1) {
                ctx.fillStyle = 'white';
                ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
            }
        }
    }   
}

// Draw player function
function drawPlayer(x, y) {
    const sprite = playerSprites.ship;
    const pixelSize = 3;
    
    for (let row = 0; row < sprite.length; row++) {
        for (let col = 0; col < sprite[row].length; col++) {
            if (sprite[row][col] === 1) {
                ctx.fillStyle = 'lime';
                ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

// Draw player explosion function
function drawPlayerExplosion(x, y, frame) {
    const sprite = playerSprites.explosion[frame];
    const pixelSize = 3;
    
    for (let row = 0; row < sprite.length; row++) {
        for (let col = 0; col < sprite[row].length; col++) {
            if (sprite[row][col] === 1) {
                ctx.fillStyle = 'red';
                ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

// Updated function to draw invader explosions
function drawInvaderExplosion(x, y, counter) {
    const progress = counter / 30; // Normalize the explosion progress
    ctx.fillStyle = `rgba(255, 165, 0, ${1 - progress})`; // Fade out the explosion
    for (let i = 0; i < 20; i++) {
        const radius = Math.random() * 3 + 1;
        const offsetX = (Math.random() - 0.5) * 20 * (1 + progress); // Expand the explosion
        const offsetY = (Math.random() - 0.5) * 20 * (1 + progress);
        ctx.beginPath();
        ctx.arc(x + invaderWidth / 2 + offsetX, y + invaderHeight / 2 + offsetY, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
// Collision detection helper
function collision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function initializeGame() {
    // Reset player
    player.x = canvas.width / 2;
    player.y = canvas.height - 30;
    player.lives = 3;
    player.isExploding = false;
    player.explosionFrame = 0;
    player.explosionCounter = 0;
    player.canShoot = true;
    // Reset invader sound variables
    invaderSoundToggle = false;
    lastInvaderMoveTime = 0;
    invaderSpeed = 0.1; // Reset to initial speed

    // Reset invaders
    initializeInvaders();

    // Reset bases
    bases = [];
    for (let i = 0; i < baseCount; i++) {
        bases.push({
            x: (i + 1) * (canvas.width / (baseCount + 1)) - baseWidth / 2,
            y: canvas.height - 100,
            width: baseWidth,
            height: baseHeight,     
            health: 100
        });
    }

    // Reset bullets
    bullets = [];
    invaderBullets = [];

    // Reset game state 
    invaderDirection = 1;
    invaderSpeed = 0.2;
    invaderAnimationFrame = 0;
    invaderAnimationCounter = 0;
    gameOver = false;
}

// Update the restartGame function
function restartGame() {
    initializeGame();
    gameLoop();
}

// Modify the gameLoop function
function gameLoop() {
    try {
        console.log("Game loop started");
        if (!gameOver) {
            console.log("Updating game state");
            update();
            console.log("Drawing game objects");
            draw();
            requestAnimationFrame(gameLoop);
        } else {
            console.log("Game over");
            // Game over logic
            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '40px Arial';
            ctx.fillText('GAME OVER', canvas.width / 2 - 100, canvas.height / 2);
            ctx.font = '20px Arial';
            ctx.fillText('Click to restart', canvas.width / 2 - 60, canvas.height / 2 + 40);
        }
        
        // Draw a simple shape to ensure canvas is working
        ctx.fillStyle = 'red';
        ctx.fillRect(10, 10, 50, 50);
        
    } catch (error) {
        console.error("Error in game loop:", error);
    }
}

// Update your initialization code at the end of the file
console.log("Initializing game");
initializeGame();
console.log("Starting game loop");
gameLoop();

// Make sure these event listeners are present
canvas.addEventListener('click', () => {
    console.log("Canvas clicked");
    if (gameOver) {
        console.log("Restarting game");
        restartGame();
    }
});

// Add this new event listener to log key presses
document.addEventListener('keydown', (e) => {
    console.log("Key pressed:", e.code);
});

document.addEventListener('click', () => {
    console.log("Document clicked, initializing sounds");
    sounds.explosion.play().then(() => sounds.explosion.pause());
    sounds.invaderKilled.play().then(() => sounds.invaderKilled.pause());
    sounds.shoot.play().then(() => sounds.shoot.pause());
    sounds.invaderMove1.play().then(() => sounds.invaderMove1.pause());
    sounds.invaderMove2.play().then(() => sounds.invaderMove2.pause());
});

console.log("All code loaded");
