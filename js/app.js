"use strict"


// Enemies our player must avoid

var Enemy = function(x, y) {
    //Sets the bug speed and locates the bug sprite
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 480 + 1);
    this.sprite = 'images/enemy-bug.png';
};

// Updates the bug's position along the x and y axis 

// Added two separate collision functions one 
// between the bugs and one between the bugs and player.
Enemy.prototype.update = function(dt) {
    this.detectCollision();
    this.playerCollision(player);

    if (!this.wait) {
        this.x += (this.speed + 100) * dt;
    }
    if (this.x > 500) {
        this.x = Math.random() * -580;
    }

};

//Resets player position after colliding with the bugs
//The player loses ten points which is then reflected on the page
Enemy.prototype.playerCollision = function(player) {
    if (player.x < this.x + 65 && player.x + 65 > this.x && player.y < this.y + 30 && 30 + player.y > this.y) {
        player.reset();
        player.score -= 10;
        document.getElementById("score").innerHTML = player.score;
    }
}
//Creates a function that activates the wait property based on a boolean 
function setPause(bool) {
    for (var i = 0; i < allEnemies.length; i++) {
        allEnemies[i].wait = bool;
    }
}

//Creates the function that prevents the bugs from overlapping
Enemy.prototype.detectCollision = function() {
    setPause(false);

//finds the pair of enemy bugs and pushes them into an array
    for (var i = 0; i < allEnemies.length; i++) {
        for (var k = i + 1; k < allEnemies.length; k++) {
            var bugBad = [];
            var helparr = [allEnemies[i], allEnemies[k]];
            bugBad.push(helparr);

        }
    }

    bugBad.forEach(function(pair) {
        var bug1 = pair[0];
        var bug2 = pair[1];

//Makes sure bug2 is always ahead of bug1 by making bug2 take the place of bug1
//if it is behind bug1
        if (bug2.x < bug1.x) {
            var temp;
            temp = bug1;
            bug1 = bug2;
            bug2 = temp;
        }


//Determines the distance between pair of bugs before it turns setPause to true
        if (bug1.x < bug2.x + 100 && bug1.x + 100 > bug2.x && bug1.y < bug2.y + 90 && bug1.y + 90 > bug2.y) {

            bug1.wait = true;

            //Gives bug2 a slight boost of speed 
            bug2.speed = bug1.speed + 5;

        }
    });

};


//Generates the bug sprite 
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Creates the Player class, setting an origin point and default score
var Player = function() {
    this.x = 202;
    this.y = 405;
    
    this.sprite = "images/char-boy.png";
    this.score = 0;
}

//Once player moves past the water the position is reset
Player.prototype.update = function() {  
    if (this.y < 68) {
        this.reset();
    }
}

//Resets the player back to the origin point 
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
}

//Function that controls the players movements based on which
//arrow key pressed. It also creates boundaries for player movement
//this way the player will not move beyond the board. 
Player.prototype.handleInput = function(keyInput) {
    switch (keyInput) {
        case 'up':
            if (this.y < 50) {

                return null;

            } else {

                this.y -= 83;
            }
            break;

        case 'down':
            if (this.y > 400) {

                return null;
            } else {
                this.y += 83;
            }
            break;

        case 'right':
            if (this.x > 400) {
                return null;
            } else {
                this.x += 101;
            }
            break;

        case 'left':
            if (this.x < 10) {
                return null;

            } else {

                this.x -= 101;

            }
            break;
    }

}

//Places the player sprite on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Gives everyone a freebie gem by setting an origin location
//Creates the Gems

var Gem = function() {
    this.x = 202;
    this.y = 305;
    this.sprite = 'images/Gem Blue.png';
}

//creates a function that will choose a random location for the gem on the canvas
Gem.prototype.randomizer = function() {
    var random = function(low, high) {
        var range = high - low + 1;
        return Math.floor(Math.random() * range) + low;
    };
    var blocWidth = 101, blocHeight = 75;
    this.x = blocWidth * random(0, 4);
    this.y = blocHeight * random(1,3);
}

//Makes sure the Gem class checks for collisions
Gem.prototype.update = function() {
    this.collision(); 
}

//Determines the collision distance between player and gem
//Calls the radomizer function to place the gem on random locations
//Adds ten points to the player.score 
//Replaces the old score with the new score 
Gem.prototype.collision = function() {
    if (player.x < this.x + 65 && player.x + 65 > this.x && player.y < this.y + 30 && 30 + player.y > this.y) {
      this.randomizer();
      
      player.score += 10;
      document.getElementById("score").innerHTML = player.score;
   
    };
}

//Creates the gems on the canvas
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

allEnemies.push(new Enemy(-50, 215));

allEnemies.push(new Enemy(-90, 135));

allEnemies.push(new Enemy(-10, 65));

allEnemies.push(new Enemy(-120, 65));


var player = new Player();

var gem = new Gem();
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