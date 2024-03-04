let xp = 0; // initialize experience points
let health = 100; // initialize health
let gold = 50; // initialize gold
let currentWeapon = 0; // initialize weapon
let fighting; // initialize fighting
let monsterHealth; // initialize monster health
let inventory = ["stick"]; // initialize inventory

const button1 = document.querySelector('#button1'); // get button1
const button2 = document.querySelector("#button2"); // get button2
const button3 = document.querySelector("#button3"); // get button3
const text = document.querySelector("#text"); // get text
const xpText = document.querySelector("#xpText"); // get xpText
const healthText = document.querySelector("#healthText"); // get healthText
const goldText = document.querySelector("#goldText"); // get goldText
const monsterStats = document.querySelector("#monsterStats"); // get monsterStats
const monsterName = document.querySelector("#monsterName"); // get monsterName
const monsterHealthText = document.querySelector("#monsterHealth"); // get monsterHealthText

// initialize weapons array of objects
const weapons = [
  { name: 'stick', damage: 5 },
  { name: 'dagger', damage: 30 },
  { name: 'axe', damage: 50 },
  { name: 'sword', damage: 100 }
];

// initialize monsters array of objects
const monsters = [
  {
    name: "slime",
    level: 3,
    health: 15
  },
  {
    name: "goblin",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 250
  }
]

// initialize locations array of objects
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
    "button text": ["Fight slime", "Fight goblin", "Go to town square"],
    "button functions": [fightSlime, fightGoblin, goTown],
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
    "button text": ["Go to town square", "Go to town square", "Increase health with easter egg!"],
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

// initialize buttons
button1.onclick = goStore; // set button1 to go to store
button2.onclick = goCave; // set button2 to go to cave
button3.onclick = fightDragon; // set button3 to fight dragon

// function to update location
function update(location) {
  monsterStats.style.display = "none"; // hide monsterStats
  button1.innerText = location["button text"][0]; // set button1 text
  button2.innerText = location["button text"][1]; // set button2 text
  button3.innerText = location["button text"][2]; // set button3 text
  button1.onclick = location["button functions"][0]; // set button1 function
  button2.onclick = location["button functions"][1]; // set button2 function
  button3.onclick = location["button functions"][2]; // set button3 function
  text.innerHTML = location.text; // set text to location text
}

// initialize game to town square
function goTown() {
  update(locations[0]); // set location to town square
}

// function to go to store
function goStore() {
  update(locations[1]); // set location to store
}

// function to go to cave
function goCave() {
  update(locations[2]); // set location to cave
}

// function to buy health
function buyHealth() {
  if (gold >= 10) { // if gold is greater than or equal to 10
    gold -= 10; // subtract 10 from gold
    health += 10; // add 10 to health
    goldText.innerText = gold; // set goldText to gold
    healthText.innerText = health;  // set healthText to health
  } else {
    text.innerText = "You do not have enough gold to buy health."; // set text to not enough gold
  }
}

// function to buy weapon
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) { // if currentWeapon is less than weapons length - 1
    if (gold >= 30) { // if gold is greater than or equal to 30
      gold -= 30; // subtract 30 from gold
      currentWeapon++; // add 1 to currentWeapon
      goldText.innerText = gold; // set goldText to gold
      let newWeapon = weapons[currentWeapon].name; // set newWeapon to weapons currentWeapon name
      text.innerText = "You now have a " + newWeapon + "."; // set text to you now have a newWeapon
      inventory.push(newWeapon); // push newWeapon to inventory
      text.innerText += " In your inventory you have: " + inventory; // set text to text plus inventory
    } else {
      text.innerText = "You do not have enough gold to buy a weapon."; // set text to not enough gold
    }
  } else {
    text.innerText = "You already have the most damageful weapon!"; // set text to most damageful weapon
    button2.innerText = "Sell weapon for 15 gold"; // set button2 text to sell weapon for 15 gold
    button2.onclick = sellWeapon; // set button2 function to sellWeapon
  }
}

// function to sell weapon
function sellWeapon() {
  if (inventory.length > 1) { // if inventory length is greater than 1
    gold += 15; // add 15 to gold
    goldText.innerText = gold; // set goldText to gold
    let currentWeapon = inventory.shift(); // set currentWeapon to inventory shift
    text.innerText = "You sold a " + currentWeapon + "."; // set text to you sold a currentWeapon
    text.innerText += " In your inventory you have: " + inventory; // set text to text plus inventory
  } else {
    text.innerText = "Don't sell your only weapon!"; // set text to don't sell your only weapon
  }
}

// function to fight slime
function fightSlime() {
  fighting = 0; // set fighting to 0
  goFight(); // go to fight
}

// function to fight goblin
function fightGoblin() {
  fighting = 1; // set fighting to 1
  goFight(); // go to fight
}

// function to fight dragon
function fightDragon() {
  fighting = 2; // set fighting to 2
  goFight(); // go to fight
}

// function to go fight
function goFight() {
  update(locations[3]); // set location to fight
  monsterHealth = monsters[fighting].health; // set monsterHealth to monsters fighting health
  monsterStats.style.display = "block"; // show monsterStats
  monsterName.innerText = monsters[fighting].name; // set monsterName to monsters fighting name
  monsterHealthText.innerText = monsterHealth; // set monsterHealthText to monsterHealth
}

// function to attack
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks."; // set text to the monster attacks
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + "."; // set text to text plus you attack it with your currentWeapon name
  health -= getMonsterAttackValue(monsters[fighting].level); // subtract getMonsterAttackValue from health
  if (isMonsterHit()) { // if isMonsterHit is true
    monsterHealth -= weapons[currentWeapon].damage + Math.floor(Math.random() * xp) + 1; // subtract weapons currentWeapon damage plus random number from monsterHealth
  } else {
    text.innerText += " You miss."; // set text to you miss
  }
  healthText.innerText = health; // set healthText to health
  monsterHealthText.innerText = monsterHealth; // set monsterHealthText to monsterHealth
  if (health <= 0) { // if health is less than or equal to 0
    lose(); // lose
  } else if (monsterHealth <= 0) { // else if monsterHealth is less than or equal to 0
    if (fighting === 2) { // if fighting is 2
      winGame(); // winGame
    } else {
      defeatMonster(); // defeatMonster
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) { // if random number is less than or equal to .1 and inventory length is not 1
    text.innerText += " Your " + inventory.pop() + " breaks."; // set text to your inventory pop breaks
    currentWeapon--; // subtract 1 from currentWeapon
  }
}

// function to get monster attack value
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp)); // set hit to level times 5 minus random number
  console.log(hit); // log hit
  return hit > 0 ? hit : 0; // return hit if hit is greater than 0, else return 0
}

// function to check if monster is hit
function isMonsterHit() {
  return Math.random() > .2 || health < 20; // return true if random number is greater than .2 or health is less than 20
}

// function to dodge
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name; // set text to you dodge the attack from the monster
}

// function to defeat monster
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); // add monsters fighting level times 6.7 to gold
  xp += monsters[fighting].level; // add monsters fighting level to xp
  goldText.innerText = gold; // set goldText to gold
  xpText.innerText = xp; // set xpText to xp
  update(locations[4]); // set location to kill monster
}

// function to lose
function lose() {
  update(locations[5]); // set location to lose
}

// function to win game
function winGame() {
  update(locations[6]); // set location to win
}

// function to restart
function restart() {
  xp = 0; // set xp to 0
  health = 100; // set health to 100
  gold = 50; // set gold to 50
  currentWeapon = 0; // set currentWeapon to 0
  inventory = ["stick"]; // set inventory to stick
  goldText.innerText = gold; // set goldText to gold
  healthText.innerText = health; // set healthText to health
  xpText.innerText = xp; // set xpText to xp
  goTown(); // go to town
}

// function to easter egg
function easterEgg() {
  update(locations[7]); // set location to easter egg
}

// function to pick two
function pickTwo() {
  pick(2); // pick 2
}

// function to pick eight
function pickEight() {
  pick(8); // pick 8
}

// function to pick a number and check if it matches a random number
function pick(guess) {
  const numbers = []; // initialize numbers
  while (numbers.length < 10) { // while numbers length is less than 10
    numbers.push(Math.floor(Math.random() * 11)); // push random number to numbers
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n"; // set text to you picked guess. Here are the random numbers:
  for (let i = 0; i < 10; i++) { // for i less than 10
    text.innerText += numbers[i] + "\n"; // set text to text plus numbers i
  }
  if (numbers.includes(guess)) { // if numbers includes guess
    text.innerText += "Right! You win 20 gold!"; // set text to right! You win 20 gold!
    gold += 20; // add 20 to gold
    goldText.innerText = gold; // set goldText to gold
  } else {
    text.innerText += "Wrong! You lose 10 health!"; // set text to wrong! You lose 10 health!
    health -= 10; // subtract 10 from health
    healthText.innerText = health; // set healthText to health
    if (health <= 0) { // if health is less than or equal to 0
      lose(); // lose
    }
  }
}