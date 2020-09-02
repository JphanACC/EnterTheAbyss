//SECTION Music import from OpenGameArt.org
var musicGameStart = new Audio('music/SFX_cosmicd__annulet-of-absorption.wav.ogg')

class Player {
    constructor(player = "The Adventurer", health = 100, physDMG = 10, magicDMG = 25) {
        this.player = player;
        this.currentHealth = health;
        this.totalHealth = health;
        this.physDMG = physDMG;
        this.magicDMG = magicDMG;
        this.potionQTY = 3;
    }
    physAttack(target) {
        $('section.log-section').hide();
        target.currentHealth = target.currentHealth - this.physDMG;
        $('#dialogue-box').text(`${this.player} dealt ${this.physDMG} dmg.`);
        $('section.log-section').fadeIn(250);
    }

    magicAttack(target) {
        $('section.log-section').hide();
        target.currentHealth = target.currentHealth - this.magicDMG;
        this.currentHealth = this.currentHealth - 5;
        $('text-health-point').text(`${this.currentHealth}/${this.totalHealth}`);
        $('#dialogue-box').text(`${this.player} dealt ${this.magicDMG} Magic DMG. \n You lose 5 HP because of Fire DMG.`);
        $('section.log-section').fadeIn(250);
        //monsters.enemyList[0].health
        //target.enemyList[0].health
    }

    heal() {
        $('section.potion').hide();
        this.currentHealth = this.currentHealth + 20;
        $('#dialogue-box').text(`20 HP restored to ${this.player} with a potion`)
        $('section.potion').fadeIn(250);
    }

}
const player = new Player();
//2. SECTION Factory for Enemies
// Modified with function
class Factory {

    constructor(player) {
        this.enemyList = [];
        this.player = player;
    }
    getRNG(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    generateEnemy() {
        const newEnemy = new Player(this.player, this.enemyList.length);
        this.enemyList.push(newEnemy);
    }
    findEnemy(index) {
        return this.enemyList[index];
    }
    modifyEnemy(index, baseHealth, basePhysDMG) {
        this.enemyList[index]['ID'] = index;
        this.enemyList[index]['player'] = `Abyss Knight ${index+1}`;
        this.enemyList[index]['totalHealth'] = baseHealth + ((10 * index) / 5);
        this.enemyList[index]['currentHealth'] = this.enemyList[index]['totalHealth'];
        this.enemyList[index]['physDMG'] = basePhysDMG + ((10 * index) / 5);
    }
    boostStat(index) {
        this.enemyList[index]['totalHealth'] = this.getRNG(3, 6) + this.enemyList[index]['health'];
        this.enemyList[index]['physDMG'] = this.getRNG(3, 4);
    }

    //Update HTML element
    assignEnemy(index) {
        $('#enemy-name').text(`${this.enemyList[index]['player']}`)
        $('#enemy-health-point').text(`HP: ${this.enemyList[index]['currentHealth']}/${this.enemyList[index]['totalHealth']}`)
    }

    attackPlayer(index) {
        $('#dialogue-box').hide()
        $('#dialogue-box').text(`It's now ${monsters.enemyList[0].player}'s turn to attack`)
        $('#dialogue-box').fadeIn(300)
        setTimeout(function() { this.enemyList[index].physAttack(player) }, 2500);
        setTimeout(updatePlayerHealth, 3000);
    }
}

// SECTION 3. Game starts


//SECTION Enemy Stats
const monsters = new Factory("Undead Knight");
const generateEnemy = function(index) {
    monsters.generateEnemy();
    monsters.modifyEnemy(index, 10, 5);
    monsters.assignEnemy(index);
}

//Floor to keep track with progression
let floor = 0; //<<=============== This is my backup plan. When the enenmy first generated it starts at 1. However the loop doesn't like it either.
const setTextFloor = function(floorNumber) {
    $('#text-floor-number').text(`${floorNumber}`)
}

//SECTION Generating Enemy and setting up for next round screen
const setUpBattle = function() {
    floor = floor + 1; //Runs floor +1 
    $('#text-floor-number').hide();
    $('#text-floor-number').text(`${floor}`);
    $('#text-floor-number').fadeIn(400);
    $('div.game-section section.player-section').hide();
    $('div.game-section section.monster-section').hide();
    console.log(`This is current floor ${floor}`);
    generateEnemy(floor - 1); //Generate enemy

    $('div.game-section section.player-section').fadeIn(800);
    $('div.game-section section.monster-section').fadeIn(2000);
}

const updatePlayerHealth = function() {
    $('#text-health-point').hide();
    $('#text-health-point').text(`${player.currentHealth}/${player.totalHealth}`);
    $('#text-health-point').fadeIn(250);
}
const updateEnemyHealth = function(target) {
    $('#enemy-health-point').hide();
    if (target.currentHealth > 1) {
        $('#enemy-health-point').text(`${target.currentHealth}/${target.totalHealth}`);
        $('#enemy-health-point').fadeIn(250);
    } else {
        $('#enemy-health-point').text(`0/${target.totalHealth}`);
        $('#enemy-health-point').fadeIn(250);
    }
}

const updatePotionQTY = function(target) {
    $('section-potion').hide();
    $('#text-potion-qty').text(`QTY: ${target.potionQTY}`)
}

const gameOverMessage = function() {
    $('section.player-section').hide();
    $('section.log-section').hide();
    $('#dialogue-box').text('Game Over');
    $('#dialogue-box').css("font-size", "35px");
    $('section.log-section').fadeIn(300);
}

//

//SECTION Start Up
$('div.game-section section.monster-section').hide();
$('div.game-section section.player-section').hide();
$('div.game-section section.dungeon-section').hide();
$('section.log-section').hide();
$('div.home-menu').hide();
$('div.home-menu').fadeIn(800);

// When clicking, the user starts the game
// the user starts, starts the first level
// after the first level, generate next enemy

//****GAME START******/
$('div.home-menu').on("click", function() {
    musicGameStart.play();
    $('div.home-menu').fadeOut(800);
    $('div.game-section section.player-section').fadeIn(800);
    $('div.game-section section.dungeon-section').fadeIn(800);
    $('div.game-section section.monster-section').fadeIn(2000);
    setUpBattle()
});

//TODO 
//keeping track of player health (At 0 or less than 0. game over screen and gameplay element is hidden)
//keeping track of enemy health (increase floor+1 and trigger generateEnemy(index) )

//Theory
//While player's HP or monster's HP > 0
// enable 

//TODO Battle turns
const enemyAttack = function(index) {
    $('#dialogue-box').hide()
    $('#dialogue-box').text(`It's now ${monsters.enemyList[index].player}'s turn to attack`)
    $('#dialogue-box').fadeIn(300)
    setTimeout(function() { monsters.enemyList[index].physAttack(player) }, 1500);
    setTimeout(updatePlayerHealth, 2000);
    // monsters.enemyList[0].physAttack(player);
}

index = 0;

$('#ui-physicalattack').on("click", function() {

    //for (number = 0; number <= monsters.enemyList.length; number++) {
    console.log(`Debug Check ${1}`) // runs. returns 1 INSTEAD of 0
    player.physAttack(monsters.enemyList[index]); //not runs and can't be defined error. If replaced with 0, it runs.
    updateEnemyHealth(monsters.enemyList[index]);
    $('#ui-physicalattack').hide();
    $('#ui-magicalattack').hide();
    $('#ui-physicalattack').fadeIn(3000);
    $('#ui-magicalattack').fadeIn(3000);

    if (player.currentHealth < 1) { //IF Player is less than 0, show game over screen
        gameOverMessage();
        $('div.game-section section.player-section').hide();
    } else if (monsters.enemyList[index].currentHealth <= 0) { //If Monster's HP is less than 0, then prompt message below
        if (confirm("You have defeated the enemy! Would you rather continue or retreat?")) {
            setUpBattle(); //This is a function that generates next enemy from the Factory
            index++;
        } else {
            gameOverMessage()
        }
    } else {
        setTimeout(function() { enemyAttack(index) }, 1);
    }
    // monsters.enemyList[0].physAttack(player)
    // updatePlayerHealth();
    //}
})

$('#ui-magicalattack').on("click", function() {
    player.magicAttack(monsters.enemyList[index]);
    if (player.currentHealth < 1) {
        alert('You have died due to burn damage. Watch out next time!')
        gameOverMessage();
    }
    updateEnemyHealth(monsters.enemyList[index]);
    updatePlayerHealth();

    $('#ui-physicalattack').hide();
    $('#ui-magicalattack').hide();
    $('#ui-physicalattack').fadeIn(3000);
    $('#ui-magicalattack').fadeIn(3000);

    if (player.currentHealth < 1) {
        updatePlayerHealth();
        gameOverMessage();
        $('div.game-section section.player-section').hide();
    } else if (monsters.enemyList[index].currentHealth <= 0) {
        if (confirm("You have defeated the enemy! Would you rather continue or retreat?")) {
            setUpBattle();
            index++;
        } else {
            gameOverMessage()
        }
    } else {
        setTimeout(function() { enemyAttack(index) }, 1);
    }
})


$('#ui-potionicon').on("click", function() {
    if (player.potionQTY > 0) {
        if (player.currentHealth + 20 < 100) {
            player.heal()
            updatePlayerHealth();
            player.potionQTY = player.potionQTY - 1;
            updatePotionQTY(player);
        } else { alert(`You can't overheal yourself.`) }
    } else {
        alert('You have no potions left');
    }
})