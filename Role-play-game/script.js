let xp = 0; // experience points
let health = 100; // player health
let gold = 50; // player gold
let currentWeapon = 0; // index of current weapon in weapons array
let monsterHealth; // monster health
let fighting; // boolean to check if player is fighting
let inventory = ["stick"]; // player inventory

const xpText = document.querySelector("#xpText"); // experience points text
const healthText = document.querySelector("#healthText"); // player health text
const goldText = document.querySelector("#goldText"); // player gold text
const button1 = document.querySelector("#button1"); // button 1
const button2 = document.querySelector("#button2"); // button 2
const button3 = document.querySelector("#button3"); // button 3
const monsterStats = document.querySelector("#monsterStats"); // monster stats
const monsterName = document.querySelector("#monsterName"); // monster name
const monsterHealthText = document.querySelector("#monsterHealth"); // monster health text
const text = document.querySelector("#text"); // game text

// weapons array
const weapons = [
    {
        name: "stick",
        damage: 15
    },
    {
        name: "dagger",
        damage: 30
    },
    {
        name: "axe",
        damage: 50
    },
    {
        name: "sword",
        damage: 100
    }
];

// monsters array
const monsters = [
    {
        name: "slime",
        health: 30
    },
    {
        name: "goblin",
        health: 80
    },
    {
        name: "dragon",
        health: 250
    }
]

// player interaction Array of objects with name, button text, button functions, and text properties for each location in the game.
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. &#x2620;"
    },
    { 
        name: "win", 
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
        "button functions": [restart, restart, restart], 
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

// button innitialization for the town square location in the game.
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// function to update the player stats and game text when the player moves to a new location in the game.
function updateStats() {
    monsterStats.style.display = "none"; // hide monster stats
    button1.innerText = locations["button text"][0]; // set button 1 text
    button2.innerText = locations["button text"][1]; // set button 2 text
    button3.innerText = locations["button text"][2]; // set button 3 text
    button1.onclick = locations["button functions"][0]; // set button 1 function
    button2.onclick = locations["button functions"][1]; // set button 2 function
    button3.onclick = locations["button functions"][2]; // set button 3 function
    text.innerHTML = locations.text; // set game text
}

// function to start the game
function goTown() {
    updateStats(locations[0]); // update player stats and game text
}

function goStore() {
    updateStats(locations[1]); // update player stats and game text
}

function goCave() {
    updateStats(locations[2]); // update player stats and game text
}

// function to buy health at the store
function buyHealth() {
    if (gold >= 10) { // if player has enough gold
        gold -= 10; // subtract gold
        health += 10; // add health
        goldText.innerText = gold; // update gold text
        healthText.innerText = health; // update health text
    } else {
        text.innerHTML = "You don't have enough gold to buy health."; // if player doesn't have enough gold to buy health 
    }
}

// function to buy a weapon at the store
function buyWeapon() {
    if (currentWeapon < weapons.length -1) { // if player doesn't have the best weapon
        if (gold >= 30) { // if player has enough gold
            gold -= 30; // subtract gold
            currentWeapon++; // add weapon
            goldText.innerText = gold; // update gold text
            let newWeapon = weapons[currentWeapon].name; // get new weapon name
            text.innerText = "You have a: " + newWeapon + "."; // update game text
            inventory.push(newWeapon); // add new weapon to inventory
            text.innerText = " In your inventory you have: " + inventory; // update game text
        }
        else {
            text.innerText = "You don't have enough gold to buy a weapon."; // if player doesn't have enough gold to buy a weapon
        }
    }
    else {
        text.innerText = "You already have the best weapon."; // if player already has the best weapon
        button2.innerText = "Sell current weapon for 20 gold."; // change button 2 text to sell current weapon
        button2.onclick = sellWeapon; // change button 2 function to sell current weapon
    }
}

// function to sell current weapon
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 20; // add gold
        goldText.innerText = gold; // update gold text
        let currentWeapon = inventory.shift(); // remove current weapon from inventory
        text.innerText = "You sell your " + currentWeapon + " for 20 gold."; // update game text
        text.innerText = " In your inventory you have: " + inventory; // update game text
    }
    else {
        text.innerText = "Dont sell your only weapon."; // if player only has one weapon
    }
}

// function to fight the slime in the cave
function fightSlime() {
    fighting = 0;
    goFight();
}

// function to fight the fanged beast in the cave
function fightBeast() {
    fighting = 1;
    goFight();
}

// function to fight the dragon
function fightDragon() {
    fighting = 2;
    goFight();
}

// function to start the fight
function goFight() {
    updateStats(locations[3]); // update player stats and game text
    monsterHealth = monsters[fighting].health; // get monster health
    monsterStats.style.display = "block"; // show monster stats
    monsterName.innerText = monsters[fighting].name; // set monster name
    monsterHealthText.innerText = monsterHealth; // set monster health text
}

// function to attack the monster
function attack() {
    text.innerText = "You attack the monster."; // update game text
    text.innerText = " You attack with your " + weapons[currentWeapon].name + "."; // update game text
    health -= getMonsterAttackValue(monsters[fighting].level); // subtract health from monster attack
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].damage + Math.floor(Math.random() * xp) + 1; // subtract monster health from player attack
    }
    else {
        text.innerText = "You missed!" // if player misses
    }
    healthText.innerText = health; // update player health text
    monsterHealthText.innerText = monsterHealth; // update monster health text
    if (health <= 0) {
        loseFight(); // if player loses fight
    }
    else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winFight(); // if player wins fight
        }
        else {
            killMonster(); // if player kills monster
        }
    }
    if (Math.random() <= 0.1 && inventory.length !== 1) {
        text.innerText = " Your " + inventory.pop() + " breaks!"; // if player's weapon breaks
        currentWeapon--; // subtract weapon
    }
}

// function to dodge the monster
function getMonsterAttackValue() {
 const hit = (level * 3) - (Math.floor(Math.random() * xp)); // subtract health from monster attack
 console.log(hit); // subtract monster health from player attack
 return hit > 0 ? hit : 0;  // if player misses
}

// function to dodge the monster
function isMonsterHit() {
    return Math.random() > .2 || health < 20; // if player's weapon breaks
}

// function to dodge the monster
function dodge() {
    text.innerText = "You dodge the monster " + monsters[fighting].name; // update game text
}

// function to run from the monster
function winFight() {
    gold += Math.floor(monsters[fighting].level * 7.5); // add gold
    xp = monsters[fighting].level; // add experience points
    goldText.innerText = gold; // update gold text
    xpText.innerText = xp; // update experience points text
    updateStats(locations[4]); // update player stats and game text
}

// function to restart the game
function loseFight() {
    updateStats(locations[5]); // update player stats and game text
}

// function to restart the game
function killMonster() {
    updateStats(locations[6]); // update player stats and game text
}

// function to restart the game
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    goTown();
}

