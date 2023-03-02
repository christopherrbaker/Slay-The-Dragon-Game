// Declare variables to hold player stats
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// Store the buttons and text boxes on the webpage
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const healthBarFill = document.getElementById("health-bar-fill");
const mainImage = document.getElementById("mainImage");
const locationHeader = document.getElementById("locationHeader")

const locationHeaderUpdates = [
    {
        
    },
    {}
]

// Store an array of weapon objects and an array of monster objects
const weapons = [
	{
		name: "stick",
		power: 5
	},
	{
		name: "dagger",
		power: 30
	},
	{
		name: "claw hammer",
		power: 50
	},
	{
		name: "sword",
		power: 100
	}
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];

// Store an array of location objects
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. \nThere are (not) many paths you could choose.. \n(buttons above)"
    },
	{
		name: "store",
		"button text": ["Buy 10 health (10 gold)", "Upgrade weapon (30 gold)", "Go to town square"],
		"button functions": [buyHealth, buyWeapon, goTown],
		text: "You enter the store...\n\nRyied:  \"What do you want?\"\n\n"
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
		"button functions": [goTownAfterMonsDef, goTownAfterMonsDef, goTownAfterMonsDef],
		text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
	},
	{
		name: "lose",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You die. ☠️"
	},
	{
		name: "win",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
	{
		name: "easter egg",
		"button text": ["2", "8", "Go to town square?"],
		"button functions": [pickTwo, pickEight, goTown],
		text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
	}
]


// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
healthBarFill.style.width = "100%";

function update(location) {
    button1.style.display = "inline";
    button3.style.display = "inline";
    monsterStats.style.display = "none";
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
    text.innerText = location.text;    
}

function goTown() {
    clearLocationHeader();
    showMainImage();
    update(locations[0]);
}

function goTownAfterMonsDef() {
    if (Math.random() < 0.25) {
        easterEgg();
    } else {
        update(locations[0])
    }
}

function goStore() {
    update(locations[1]);
    clearMainImage();
    locationHeader.innerHTML = "<source src=\"shopkeep-video.mp4\" type=\"video/mp4\">";
    locationHeader.style.display = "block";
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
    	healthText.innerText = health;
        updateHealthBar(health);
        locationHeader.innerHTML = "<source src=\"shopkeep-video-healthbought.mp4\" type=\"video/mp4\">";
        resetVideo(locationHeader);
        locationHeader.style.display = "block";
        text.innerText += "Ryied: \"Okay, ten health for ten gold then. I hope it\'s worth it.\"\n"
    } else {
        locationHeader.innerHTML = "<source src=\"shopkeep-video-noFreebies.mp4\" type=\"video/mp4\">";
        resetVideo(locationHeader);
        text.innerText += "\nYou do not have enough gold to buy health.";
    }

}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
    	if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            if (newWeapon === "dagger") {
                locationHeader.innerHTML = "<source src=\"shopkeep-video-upgradeDagger.mp4\" type=\"video/mp4\">";
                resetVideo(locationHeader);
            } 
            else if (newWeapon === "claw hammer") {
                locationHeader.innerHTML = "<source src=\"shopkeep-video-upgradeClawHammer.mp4\" type=\"video/mp4\">";
                resetVideo(locationHeader);
            }
            else if (newWeapon === "sword") {
                locationHeader.innerHTML = "<source src=\"shopkeep-video-upgradeSword.mp4\" type=\"video/mp4\">";
                resetVideo(locationHeader);
            }
    		text.innerText += "Ryied: \"Hmm, okay here.. this " + newWeapon + " should be kind of an upgrade.\"\n\n";
            inventory.push(newWeapon);
            text.innerText += "Current inventory: " + inventory + "\n\n";
    	} else {
            locationHeader.innerHTML = "<source src=\"shopkeep-video-noFreebies.mp4\" type=\"video/mp4\">";
            resetVideo(locationHeader);
    		text.innerText += "Ryied: \"You don't look like the type of person with the means for such an upgrade.\"\n\n";
    	} 
    } else {
        locationHeader.innerHTML = "<source src=\"shopkeep-video-unlockSell.mp4\" type=\"video/mp4\">";
        resetVideo(locationHeader);
		text.innerText += "Ryied: \"There\'s nothing left to up-grade to! What? You can\'t get the job done with a sword?! \n *sigh* \nFine.. I will buy back some of your useless junk.\"\n\n(There is now a sell button)";
        button2.innerText = "Sell weapon for 15 gold";
		button2.onclick = sellWeapon;
	}
}

function sellWeapon() {
	if (inventory.length > 1) {
		gold += 15;
		goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText += "\n\nYou sold a " + currentWeapon + ".";
        text.innerText += "\n\nIn your inventory you have: " + inventory;
        locationHeader.innerHTML = "<source src=\"shopkeep-video-buyBack.mp4\" type=\"video/mp4\">";
        resetVideo(locationHeader);
	} else {
    	text.innerText += "\nDon't sell your only weapon!";
  	}
}

function fightSlime() {
	fighting = 0;
	goFight();
}

function fightBeast() {
	fighting = 1;
	goFight();    
}

function fightDragon() {
	fighting = 2;
	goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
	monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
		text.innerText += " You miss.";
	}
    
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	healthText.innerText = health;
    updateHealthBar(health);
	monsterHealthText.innerText = monsterHealth;   
	if (health <= 0) {
        health = 0;
        updateHealthBar(health);
		lose();
	} else if (monsterHealth <= 0) {
		fighting === 2 ? winGame() : defeatMonster();
	}

	if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
	}
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

function isMonsterHit() {
	return Math.random() > .2 || health < 20;
}


function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7)
    xp += monsters[fighting].level;
    goldText.innerText = gold;
	xpText.innerText = xp;
    update(locations[4]);
    button1.style.display = "none";
    button3.style.display = "none";
}

function lose() {
    update(locations[5]);
    button1.style.display = "none";
    button3.style.display = "none";
    mainImage.src = "gameover.gif";
    var audio = new Audio("gameover.mp3")
    audio.play();
}

function winGame() {
  update(locations[6]);
}

function restart() {
	xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
    healthBarFill.style.width = "100%";
    button1.style.display = "inline";
    button3.style.display = "inline";
    mainImage.src = "frontlogo.gif";
	goTown();
}

function easterEgg() {
	update(locations[7]);
}

function pickTwo() {
 pick(2);
}

function pickEight() {
 pick(8);
}
function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health
        updateHealthBar(health);
        if (health <= 0) {
          lose();
        }
    }
}
function updateHealthBar(healthLevel) {
    if (healthLevel >= 100) {
        healthBarFill.style.width = 100 + "%";
    } else {
        healthBarFill.style.width = healthLevel + "%";
    }
  }
function clearLocationHeader() {
    locationHeader.innerHTML = "";
    locationHeader.style.display = "none";
    resetVideo(locationHeader)
}
function clearMainImage() {
    mainImage.style.display = "none";
}
function showMainImage() {
    mainImage.style.display = "block";
}
function resetVideo(video) {
    video.pause();
    video.currentTime = 0;
    video.load();
}
function updateLocationHeader(key) {
    locationHeader.innerHTML = "<source src=\"shopkeep-video-unlockSell.mp4\" type=\"video/mp4\">";
    resetVideo(locationHeader);
}