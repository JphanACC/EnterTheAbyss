//SECTION Music import from OpenGameArt.org
const randomIndex = function(array) {
        return Math.floor(Math.random() * array.length);
    }
    //Music
var musicGameStart = new Audio('music/SFX_cosmicd__annulet-of-absorption.wav.ogg')
    //@author: Alexandr Zhelanov
var musicBoss = new Audio('music/So long.mp3')
    //@author: Fantasy Musica
var musicBGBattle = new Audio('music/Battle_01.ogg')
    //@author: CleytonKauffman
var gameOverMusic = new Audio('music/NoHope.ogg')

//SFX
var sfxFireBall = new Audio('music/SFX_Fire.wav.ogg')
    //@author: MedicineStorm
var sfxMonster3 = new Audio('music/dinosaur-3.wav')
var sfxMonster4 = new Audio('music/dinosaur-4.wav')
    //@author: jute-DH
var sfxPhysAttack1 = new Audio('music/hit_1.wav')
var sfxPhysAttack2 = new Audio('music/hit_2.wav')
var sfxPhysAttack3 = new Audio('music/hit_3.wav')
const sfxPhysAttackSounds = [sfxPhysAttack1, sfxPhysAttack2, sfxPhysAttack3];
const playRandomPhysSFX = function() {
    const pickRandom = Math.floor(Math.random() * sfxPhysAttackSounds.length)
    return sfxPhysAttackSounds[pickRandom].play()
}
var sfxVictory = new Audio('music/gold-4.wav')
    //@author: qubodup. NOTE: FLAC files
var sfxPotion1 = new Audio('music/bottle-open-04.flac');
var sfxPotion2 = new Audio('music/bottle-shake-06.flac');
//@author: Catalin Pavel
var sfxZombie = new Audio('music/Zombie Boss Sound.wav')
    //@author: Vinrax
var sfxBoss = new Audio('music/scream_horror1.mp3')

/* ----------------------------------------------------------------------------------------*/
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

        playRandomPhysSFX()
        $('section.log-section').hide();
        target.currentHealth = target.currentHealth - this.physDMG;
        $('#dialogue-box').text(`${this.player} dealt ${this.physDMG} dmg.`);
        $('section.log-section').fadeIn(250);
    }

    magicAttack(target) {
        sfxFireBall.play();
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
// SECTION Factory for Enemies
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
    modifyEnemy(index, baseHealth, basePhysDMG, baseMagicDMG) {
        this.enemyList[index]['ID'] = index;
        if (floor % 5 == 0) {
            this.enemyList[index]['player'] = `Abyss High Priestess`;
            this.enemyList[index]['totalHealth'] = (baseHealth + 30) + ((10 * index) / 5);
            this.enemyList[index]['currentHealth'] = this.enemyList[index]['totalHealth'];
            this.enemyList[index]['physDMG'] = Math.floor((basePhysDMG * 2) + ((2 * index) / 6));
            this.enemyList[index]['MagicDMG'] = Math.floor((baseMagicDMG * 2) + ((2 * index) / 6));
        } else {
            this.enemyList[index]['player'] = `Abyss Knight ${index+1}`;
            this.enemyList[index]['totalHealth'] = baseHealth + ((10 * index) / 5);
            this.enemyList[index]['currentHealth'] = this.enemyList[index]['totalHealth'];
            this.enemyList[index]['physDMG'] = Math.floor(basePhysDMG + ((2 * index) / 6));
        }

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

    modifyBoss(index, baseHealth, basePhysDMG, baseMagicDMG) {
        this.enemyList[index]['ID'] = index;
        this.enemyList[index]['player'] = `Abyss High Priestess ${index+1}`;
        this.enemyList[index]['totalHealth'] = baseHealth + ((10 * index) / 5);
        this.enemyList[index]['currentHealth'] = this.enemyList[index]['totalHealth'];
        this.enemyList[index]['physDMG'] = Math.floor(basePhysDMG + ((2 * index) / 6));
        this.enemyList[index]['MagicDMG'] = Math.floor(baseMagicDMG + ((2 * index) / 6));
    }

    //Update HTML element. 
    assignEnemy(index) {
        $('#enemy-name').text(`${this.enemyList[index]['player']}`)
        $('#enemy-health-point').text(`HP: ${this.enemyList[index]['currentHealth']}/${this.enemyList[index]['totalHealth']}`)
    }
}

// SECTION 3. Game starts
//Floor to keep track with progression
let floor = 0;
const setTextFloor = function(floorNumber) {
    $('#text-floor-number').text(`${floorNumber}`);
}

// Enemy Stats
const monsters = new Factory("Undead Army");
const generateEnemy = function(index) {
    monsters.generateEnemy();
    monsters.modifyEnemy(index, 15, 5, 10);
    monsters.assignEnemy(index);
}
const bosses = new Factory("Abyss Boss");
const generateBoss = function(index) {
    bosses.generateEnemy();
    bosses.modifyBoss(index, 50, 10, 25);
    bosses.assignEnemy(index);
}



// SECTION Generating Enemy and setting up for next round screen
const setUpBattle = function() {
    $('#text-floor-number').hide();
    $('#text-floor-number').text(`${floor}`);
    $('#text-floor-number').fadeIn(400);
    $('#sprite-boss').hide();
    $('#sprite-monster').hide();

    $('div.game-section section.player-section').hide();
    if (floor % 5 == 0) {
        $('#sprite-boss').fadeIn(2000);
    } else {
        $('#sprite-monster').fadeIn(2000);
    }

    console.log(`This is current floor ${floor}`);
    generateEnemy(floor - 1); //Generate enemy

    $('div.game-section section.player-section').fadeIn(800);


}

// NOTE (*) BOSS SETUP - Abandoned
const setUpBoss = function() {
    floor = floor + 1; //Runs floor +1 
    $('#sprite-monster').hide();
    $('#text-floor-number').hide();
    $('#text-floor-number').text(`${floor}`);
    $('#text-floor-number').fadeIn(400);
    $('div.game-section section.player-section').hide();
    $('#sprite-boss').hide();
    console.log(`This is current floor ${floor}`);
    generateBoss(bossIndex); //Generate boss
    bossIndex = bossIndex + 1

    $('div.game-section section.player-section').fadeIn(800);
    $('#sprite-boss').fadeIn(2000);
}

const updatePlayerHealth = function() {
    $('#text-health-point').hide();
    if (player.currentHealth > 0) {
        $('#text-health-point').text(`${player.currentHealth}/${player.totalHealth}`);
        $('#text-health-point').fadeIn(250);
    } else if (player.currentHealth < 1) {
        $('#text-health-point').text(`0/${player.totalHealth}`);
        $('#text-health-point').fadeIn(250);
        gameOverMessage();
    }
}
const updateEnemyHealth = function(target) {
    $('#enemy-health-point').hide();
    if (target.currentHealth > 0) {
        $('#enemy-health-point').text(`HP: ${target.currentHealth}/${target.totalHealth}`);
        $('#enemy-health-point').fadeIn(250);
    } else if (target.currentHealth < 1) {
        $('#enemy-health-point').text(`HP: 0/${target.totalHealth}`);
        $('#enemy-health-point').fadeIn(250);
    }
}

const updatePotionQTY = function(target) {
    $('section-potion').hide();
    $('#text-potion-qty').text(`QTY: ${target.potionQTY}`)
}

const gameOverMessage = function() {
    musicBGBattle.pause();
    musicBGBattle.currentTime = 0;
    gameOverMusic.play();
    $('section.player-section').hide();
    $('section.log-section').hide();
    $('#dialogue-box').text('Game Over');
    $('#dialogue-box').css("font-size", "35px");
    $('section.log-section').fadeIn(300);
}

//

// SECTION Start Up
$('div.how-to-play').hide();
$('div.game-section section.monster-section').hide();
$('div.game-section section.player-section').hide();
$('div.game-section section.dungeon-section').hide();
$('section.log-section').hide();
$('div.home-menu').hide();
$('div.home-menu').fadeIn(800);

// When clicking, the user starts the game
// the user starts, starts the first level
// after the first level, generate next enemy

//*How to Play*//
$('div.how-to-play-button').on("click", function() {
    $('div.home-menu').fadeOut(300);
    $('div.how-to-play').fadeIn(300);
    $('div.how-to-play-button').hide();

    $('button').on("click", function() {
        $('div.how-to-play').fadeOut(300);
        $('div.home-menu').fadeIn(300);
        $('div.how-to-play-button').fadeIn(300);
    })
});


// SECTION ****GAME START******/

$('div.home-menu').on("click", function() {
    floor++;
    musicGameStart.play();
    musicBGBattle.play();
    $('div.home-menu').fadeOut(800);
    $('div.how-to-play-button').fadeOut(800);
    $('div.game-section section.player-section').fadeIn(800);
    $('div.game-section section.dungeon-section').fadeIn(800);
    $('div.game-section section.monster-section').fadeIn(1000);
    setUpBattle()
});


// SECTION Battle turns
const enemyAttack = function(index) {
    if (floor % 5 == 0) {
        sfxBoss.play();
    } else {
        sfxZombie.play();
        sfxMonster3.play();
        playRandomPhysSFX();
    }

    $('#dialogue-box').hide()
    $('#dialogue-box').text(`It's now ${monsters.enemyList[index].player}'s turn to attack`)
    $('#dialogue-box').fadeIn(300)
    if (player.currentHealth > 1) {
        setTimeout(function() { monsters.enemyList[index].physAttack(player) }, 1500);
        setTimeout(updatePlayerHealth, 2000);
    } else { gameOverMessage(); }
    // monsters.enemyList[0].physAttack(player);
}

index = 0;
bossIndex = 0;

function givePotions() {
    if (index % 4 == 0) {
        console.log(`Debug index: ${index}`)
        alert('You have picked up 3 extra potions. Use them carefully!')
        player.potionQTY += 3;
        $(`#text-potion-qty`).text(`QTY: ${player.potionQTY}`);
    }
    if (floor % 5 == 0) {
        console.log(`Debug Boss Check Function: ${index} ${monsters.enemyList[index]}`)

        alert('A strong challenger shows up!');
    }
}


$('#ui-physicalattack').on("click", function() {
    //for (number = 0; number <= monsters.enemyList.length; number++) {
    console.log(`Debug Check ${1}`) // runs. returns 1 INSTEAD of 0
        // if (!bosses.enemyList.length == 0) {
        //     console.log(`Debug Attack Boss`)
        //     player.physAttack(bosses.enemyList[bossIndex - 1]);
        //     updateEnemyHealth(bosses.enemyList[bossIndex - 1]);
        // }
    console.log(`Debug Attack Normal Enemy`)
    if (floor % 5 == 0) {
        $('#sprite-boss').attr("src", "assets/Enemy-Boss-Sprite_Fight-Animation.gif")
    } else { $('#sprite-monster').attr("src", "assets/Enemy-Sprite_FightAnimation.gif") }

    player.physAttack(monsters.enemyList[index]);
    updateEnemyHealth(monsters.enemyList[index]);
    updatePlayerHealth();

    $('#ui-physicalattack').hide();
    $('#ui-magicalattack').hide();
    setTimeout(function() { $('#ui-physicalattack').fadeIn(300); }, 2000)
    setTimeout(function() { $('#ui-magicalattack').fadeIn(300); }, 2000)
        // $('#ui-magicalattack').fadeIn(4000);

    if (player.currentHealth < 1) { //IF Player is less than 0, show game over screen
        gameOverMessage();
        $('div.game-section section.player-section').hide();
    } else if (monsters.enemyList[index].currentHealth <= 0) {
        $('#sprite-monster').fadeOut(300)
        sfxVictory.play();
        musicBoss.pause()
        musicBoss.currentTime = 0;
        musicBGBattle.pause();
        musicBGBattle.currentTime = 0;
        const messageConfirm = confirm("You have defeated the enemy! Would you rather continue or retreat?")
        if (messageConfirm == true) {
            index++;
            floor++;
            if (floor % 5 == 0) { musicBoss.play() } else { musicBGBattle.play(); }
            givePotions()
            setUpBattle();
        } else {
            $('#sprite-monster').fadeOut(200)
            gameOverMessage()
        }
    } else {
        setTimeout(function() { enemyAttack(index) }, 100);
    }
    // monsters.enemyList[0].physAttack(player)
    // updatePlayerHealth();
    //}
    if (floor % 5 == 0) {
        setTimeout(function() { $('#sprite-boss').attr("src", "assets/Enemy-Boss-Sprite_Animation.gif") }, 2000)
    } else { setTimeout(function() { $('#sprite-monster').attr("src", "assets/Enemy-Sprite_Animation.gif") }, 2000) }

})

$('#ui-magicalattack').on("click", function() {
    console.log(`Debug: Floor: ${floor}. Index: ${index}. Boss Index: ${bossIndex}`);
    if (floor % 5 == 0) {
        $('#sprite-boss').attr("src", "assets/Enemy-Boss-Sprite_Fight-Animation.gif")
    } else { $('#sprite-monster').attr("src", "assets/Enemy-Sprite_FightAnimation.gif") }
    // if (floor % 6 == 0 && bosses.enemyList[bossIndex - 1].currentHealth > 0) { //Trigger on certain floors only
    //     if (bosses.enemyList[bossIndex - 1].currentHealth > 0) {
    //         console.log(`Debug Attack Boss`)
    //         player.magicAttack(bosses.enemyList[bossIndex - 1]);
    //         updateEnemyHealth(bosses.enemyList[bossIndex - 1]);
    //         updatePlayerHealth();
    //     }
    // } else { player.magicAttack(monsters.enemyList[index]); }
    player.magicAttack(monsters.enemyList[index]);
    if (player.currentHealth < 1) {
        alert('You have died due to burn damage. Watch out next time!')
        gameOverMessage();
    }
    updateEnemyHealth(monsters.enemyList[index]);
    updatePlayerHealth();
    $('#ui-physicalattack').hide();
    $('#ui-magicalattack').hide();
    setTimeout(function() { $('#ui-physicalattack').fadeIn(300); }, 2000)
    setTimeout(function() { $('#ui-magicalattack').fadeIn(300); }, 2000)

    if (player.currentHealth < 1) {
        updatePlayerHealth();
        gameOverMessage();
        $('div.game-section section.player-section').hide();
    } else if (monsters.enemyList[index].currentHealth <= 0) {
        $('#sprite-monster').fadeOut(300)
        $('#sprite-boss').fadeOut(300)
        sfxVictory.play();
        musicBoss.pause()
        musicBoss.currentTime = 0;
        musicBGBattle.pause();
        musicBGBattle.currentTime = 0;
        const messageConfirm = setTimeout(function() { confirm("You have defeated the enemy! Would you rather continue or retreat?") }, 300)
        if (messageConfirm == true) {
            index++;
            floor++;
            if (floor % 5 == 0) { musicBoss.play() } else { musicBGBattle.play(); }
            givePotions()
            setUpBattle();
        } else {
            $('#sprite-monster').fadeOut(200)
            gameOverMessage()
        }
    } else {
        setTimeout(function() { enemyAttack(index) }, 100);
    }
    if (floor % 5 == 0) {
        setTimeout(function() { $('#sprite-boss').attr("src", "assets/Enemy-Boss-Sprite_Animation.gif") }, 2000)
    } else { setTimeout(function() { $('#sprite-monster').attr("src", "assets/Enemy-Sprite_Animation.gif") }, 2000) }
})


$('#ui-potionicon').on("click", function() {
    if (player.potionQTY > 0) {
        if (player.currentHealth + 20 < 100) {
            sfxPotion1.play();
            sfxPotion2.play();
            $('#ui-physicalattack').hide();
            $('#ui-magicalattack').hide();
            setTimeout(function() { $('#ui-physicalattack').fadeIn(300); }, 300)
            setTimeout(function() { $('#ui-magicalattack').fadeIn(300); }, 300)
            player.heal()
            updatePlayerHealth();
            player.potionQTY = player.potionQTY - 1;
            updatePotionQTY(player);
        } else { alert(`You can't overheal yourself.`) }
    } else {
        alert('You have no potions left');
    }
})