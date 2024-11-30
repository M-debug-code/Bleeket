let coins = 0;
let health = 100;
let playerBleeks = [];
let battlesWon = 0; // Track number of battles won
let legendaryBleekUnlocked = false;

// Game pages
const pages = document.querySelectorAll('.page');

// Show the specified page
function showPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Start the game when the start button is clicked
document.getElementById('start-button').addEventListener('click', function() {
    showPage('market');
    updateStats();
});

// Marketplace logic
document.getElementById('buy-bleek').addEventListener('click', function() {
    if (coins >= 20) {
        coins -= 20;
        playerBleeks.push("New Bleek");
        document.getElementById('market-output').innerText = "You bought a Bleek!";
        updateStats();
    } else {
        document.getElementById('market-output').innerText = "You don't have enough coins!";
    }
});

// Battle logic
document.getElementById('start-battle').addEventListener('click', function() {
    if (playerBleeks.length === 0) {
        document.getElementById('battle-output').innerText = "You have no Bleeks to fight!";
        return;
    }
    
    // Check if the player has unlocked the Legendary Bleek
    if (legendaryBleekUnlocked) {
        health += 50; // Boost health
        coins += 20; // Extra coin reward
        document.getElementById('battle-output').innerText = "Legendary Bleek Activated! You gained extra health and coins!";
        document.getElementById('battle-output').innerHTML += `<div id="legendary-bleek">Legendary Bleek is with you!</div>`;
    }

    const battleOutcome = Math.random() > 0.5 ? "won" : "lost";
    if (battleOutcome === "won") {
        battlesWon++;
        coins += 10;
        document.getElementById('battle-output').innerText = "You won the battle! You earned 10 coins.";
        // Unlock Legendary Bleek after 5 wins
        if (battlesWon >= 5 && !legendaryBleekUnlocked) {
            legendaryBleekUnlocked = true;
            document.getElementById('battle-output').innerHTML += "<br>You have unlocked the Legendary Bleek!";
        }
    } else {
        health -= 20;
        document.getElementById('battle-output').innerText = "You lost the battle! You lost 20 health.";
    }

    updateStats();
    if (health <= 0) {
        gameOver();
    }
});

// Crafting logic
document.getElementById('craft-bleek').addEventListener('click', function() {
    if (coins >= 15) {
        coins -= 15;
        playerBleeks.push("Crafted Bleek");
        document.getElementById('craft-output').innerText = "You crafted a new Bleek!";
        updateStats();
    } else {
        document.getElementById('craft-output').innerText = "You don't have enough coins to craft!";
    }
});

// Update the player's stats
function updateStats() {
    document.getElementById('coins').innerText = coins;
    document.getElementById('health').innerText = health;
}

// Game Over logic
function gameOver() {
    alert("Game Over! You have lost all your health.");
    coins = 0;
    health = 100;
    playerBleeks = [];
    battlesWon = 0; // Reset battles won
    legendaryBleekUnlocked = false; // Reset Legendary Bleek
    updateStats();
    showPage('home');
}

// Initialize the game with home page
showPage('home');
