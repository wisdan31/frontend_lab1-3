var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};

var score = 0;
var highScores = [];
var lowScores = [];

var playerName = prompt("Please enter your name:");
if (!playerName) playerName = "Player";

document.getElementById('score').innerText = 'Player: ' + playerName + ' - Score: ' + score;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    requestAnimationFrame(loop);

    if (++count < 6) {
        return;
    }
    document.getElementById('score').innerText = 'Player: ' + playerName + ' - Score: ' + score;
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                endGame();
                return;
            }
        }

        if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
            endGame();
            return;
        }
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;

            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;

            score++;
        }
    });
}

function endGame() {
    var restart = confirm("Game over! Your score: " + score + ". Do you want to restart?");
    if (restart) {
        if (!highScores.includes([playerName, score])) {
            highScores.push([playerName, score]);
            highScores.sort((a, b) => b[1] - a[1]);
            highScores = highScores.slice(0, 3);
            updateScores('highScores', highScores);
        }

        if (!lowScores.includes([playerName, score])) {
            lowScores.push([playerName, score]);
            lowScores.sort((a, b) => a[1] - b[1]);
            lowScores = lowScores.slice(0, 3);
            updateScores('lowScores', lowScores);
        }
        playerName = prompt("Please enter your name:");
        score = 0;
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        document.getElementById('score').innerText = 'Player: ' + playerName + ' - Score: ' + score;
        updateScores('highScores', highScores);
        updateScores('lowScores', lowScores);
    } else {
        // Exit the game
        return;
    }
}

document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

function updateScores(elementId, scores) {
    var ul = document.getElementById(elementId);
    ul.innerHTML = "";
    scores.forEach(function (score, index) {
        var li = document.createElement("li");
        li.innerText = score[0] + ' — ' + score[1];
        ul.appendChild(li);
    });
}

requestAnimationFrame(loop);
