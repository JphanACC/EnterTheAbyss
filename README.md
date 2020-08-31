# EnterTheAbyss
Project Zero
## Homenu
![](photos/HomeMenu.jpg)
## Battle
![](photos/Concept.jpg)
Source: Me. Jack Phan

## MVP Pitch
Are you prepared to enter the deepest Abyss? For gold and glory, you will enter into the most challenging dungeon. You can kill your enemy by using either magic or physical weapon, but watch out, the magic spell can harm you but deliver the most powerful blow to your enemy. The user will have 3 potions to start with. Plan your moves carefully, the enemies keep getting stronger as you enter deeper into the abyss.

## User Stories:
## Start
- The user can either click on the "Game Start" to start the game or click on "How To Play" 
- After the user clicks the "Game Start" button, the user will begin with 100 health. The user has no sprite, but the enemy will have one. 
- The user can check the status information at bottom along with attack buttons.

## Gameplay:
- The battle will play in turns. The turn starts with the player. After each battle, a prompt will allow user to either continue or retreat. 
- The enemy will have base Health 10 and attack 5 (subject will change). Every time the player successfully defeat the monster, the monster will increase their health pool by 5 after the level. The game ends when player's health is down to 0.
- The player will have 3 tools at their disposal:
    1. Physical attack(sword icon): The attack has 10 damage
    2. Magic attack (fire ball icon): This attack deals 25 damage but at the cost of 5 health deducted from the player's side. 
    3. Health potion: The player starts with 3 potions at the start, this item will allow the player to heal 10 Health Points each use.
    ## Visual Break Down
    On player turn: <br>
        1. When click on either of the attack icons, the button will turn little bigger ad turns white to indicate clicked feedback.<br>
        2. After the icon feedback, the monster sprite will also flash and rumbles at the same time to indicated being hit. (requires a random generation that hits X and Y axis when the sprite moves up) <br>
        3. After the monster's sprite animation, the health bar of the monster will show up being decreased. <br>
        Victory: When the player defeats the monster, the monster sprite will disappear for few seconds. A prompt will show up and ask the player to either continue or retreat, then the next one will show up again. <br>
        Defeat: If the player's health drop down to zero, a box will down while the the whole screen turns red. The player will have to refresh the page to reset the match. One of the stretch goals will implement a feature to allow a refresh button. <br>
    On enemy's turn:<br>
        1. Enemy's sprite will rumble again, but without flashing. A blood effect will show up on player's screen instead to indicated being hit.
        2. After the enemy's hit, the player's health numbers will decrease. <br>



## End:
- The Game will be over either by having the user retreat or player's health point reduces to 10. 

## Stretch Goals: 
- More intuive UI with chat log that tells the user and ememy's action history
- Enemy name and Health bar animation displayed on enemy's head.
- Health potions get resupplied every 3 or 5 battles.
- Boss battle after 5 rounds.
- User Name can be displayed on UI.
