"use strict"
// Enemies our player must avoid

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 460 + 1);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.detectCollision();
    this.playerCollision(player);

    if(!this.wait) {
        this.x += (this.speed * dt);
    }
    if(this.x > 500) {
        this.x = Math.random() * -580;
    }

};

function findEnemies() {
        var bugBad = [ ];
        for (var i = 0; i < allEnemies.length; i++){
        for(var k = i + 1; k < allEnemies.length; k++){
            var helparr = [allEnemies[i], allEnemies[j]];
            bugBad.push(helparr);
        }
    }
    return bugBad; 
}

Enemy.prototype.playerCollision = function(player) {
    if(player.x < this.x + 75 && player.x + 65> this.x &&
        player.y< this.y + 50 && 70 + player.y > this.y){
        player.reset();
    }
}

function setPause(bool) {
    for(var i =0; i < allEnemies.length; i++){
            allEnemies[i].wait = bool;
        }
    }

Enemy.prototype.detectCollision = function() {
  setPause(false);

  for (var i = 0; i < allEnemies.length; i++) {
    for(var k = i + 1; k < allEnemies.length; k++) {
        var bugBad = [];
        var helparr = [allEnemies[i], allEnemies[k]];
        bugBad.push(helparr);  
          
    }
}

 bugBad.forEach(function(pair) {       
    var bug1 = pair[0];
    var bug2 = pair[1];


if (bug2.x < bug1.x) {
    var temp;
    temp = bug1;
    bug1 = bug2;
    bug2 = temp;
}
    


if(bug1.x <bug2.x + 100 && bug1.x + 100 > bug2.x && bug1.y < bug2.y + 101 && bug1.y + 101 > bug2.y) {

    bug1.wait = true;
    bug2.speed = bug1.speed + 30;

      }
});

};


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
 this.x = 202;
 this.y = 405;
 this.sprite = "images/char-boy.png";
}

Player.prototype.update = function() {
        this.x = this.x;
        this.y = this.y; 

        if(this.y > 400){
            this.reset();
        }     
}  

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
}


Player.prototype.handleInput = function(keyInput) {
    switch(keyInput) {
        case 'up':
            if(this.y < 130) {
                
                return null;
            
            }

            else { 

                this.y -= 83;
            }
            break;
        
        case 'down':
            if(this.y > 400) {

                return null;
            }
            else { 
                    this.y +=83;
            }
            break;

        case 'right':
            if( this.x > 400 ) {
                return null;
            }
            else {
                this.x +=101;
            }
            break;

        case 'left':
            if ( this.x < 10 ) {
                return null;

        }
            else {
            
            this.x -=101;
           
           }
           break;
    }

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

allEnemies.push(new Enemy(-50,215));

allEnemies.push(new Enemy(-90,135));

allEnemies.push(new Enemy(-10,65));

allEnemies.push(new Enemy(-120, 65));


var player= new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
