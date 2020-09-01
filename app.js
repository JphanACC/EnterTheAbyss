class Player {
    constructor(player = "The Adventurer", health = 100, physDMG = 10, magicDMG = 25) {
        this.player = player;
        this.currentHealth = health;
        this.totalHealth = health;
        this.physDMG = physDMG;
        this.magicDMG = magicDMG;
    }
    physAttack(target) {
        target.currentHealth = target.currentHealth - this.physDMG;
        $('#text-health-point').text(`${this.currentHealth}/${this.totalHealth}`);
        $('#enemy-health-point').text(`${target.currentHealth}/${target.totalHealth}`);
    }
    magicAttack(target) {
        target.currentHealth = target.currentHealth - this.magicDMG;
        this.currentHealth = this.currentHealth - 5;
        $('#text-health-point').text(`${this.currentHealth}/${this.totalHealth}`);
        $('#enemy-health-point').text(`${target.currentHealth}/${target.totalHealth}`);
        //monsters.enemyList[0].health
        //target.enemyList[0].health
    }
}

//2. Factory for Enemies
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
}

//3. Game starts



// 3. NOT USABLE. DIFFERENT PROJECT
class Game {
    constructor(playerShip, index) {
        this.playerShip = playerShip; //assign playerShip variable
        this.enemyShip = alienShips.enemyShipsList[index]; //assign the factory.object[index] to CUSTOM variable
    }
    checking() {
        return this.enemyShip.is
    }
    start() {
        if (this.enemyShip) {
            while (this.playerShip.hull > 0 && this.enemyShip.hull > 0) {

                this.playerShip.attack(this.enemyShip);

                if (this.enemyShip.hull > 0) {
                    this.enemyShip.attack(this.playerShip);
                } else {
                    console.log(`>>>${this.playerShip.ship} is winner<<<`)
                    const userInput = prompt("Do you want to continue? Enter yes or no");
                    if (userInput == "yes") {
                        if (typeof this.enemyShip !== "undefined") {
                            const nextBattle = new Game(this.playerShip, this.enemyShip.ID + 1);
                            nextBattle.start()
                        } else { return console.log(`There is no enemy left `) }
                    } else { console.log(`You left... A shame to the Galaxy `) }
                }
            }
        } else { return console.log(`There is no enemy left `) }
    }
}


const player = new Player();
const monsters = new Factory("Undead Knight");
const generateEnemy = function(index) {
    monsters.generateEnemy();
    monsters.modifyEnemy(index, 10, 5);
    monsters.assignEnemy(index);
}

let floor = 0
const setFloor = function(floorNumber) {
    $('#text-floor-number').text(`${floorNumber}`)
}

//Start up
$('div.game-section section.monster-section').hide();
$('div.game-section section.player-section').hide();
$('div.game-section section.dungeon-section').hide();

$('div.home-menu').hide();
$('div.home-menu').fadeIn(800);


$('div.home-menu').on("click", function() {
    $('div.home-menu').fadeOut(800);
    $('div.game-section section.player-section').fadeIn(800);
    $('div.game-section section.dungeon-section').fadeIn(800);
    $('div.game-section section.monster-section').fadeIn(2000);
    generateEnemy(0);
});

$('#ui-physicalattack').on("click", function() {
    player.physAttack(monsters.enemyList[0]);
    // monsters.enemyList[0].physAttack(player);
})

$('#ui-magicalattack').on("click", function() {
    player.magicAttack(monsters.enemyList[0]);
    // monsters.enemyList[0].physAttack(player);
})