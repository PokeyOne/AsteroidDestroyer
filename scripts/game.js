//------------------
//game.js - The main game file, with the most code documentation I have written
//in my entire life. Hope you can understand all of it.
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
//Copyright (c) Mateo Carreras 2016



//state ids
var LOGO_STATE_ID = 0; //id of logo intro page
var GAME_STATE_ID = 1; //id of game state
var CRED_STATE_ID = 2; //id of credits state

//holds general information about things in the game
var game = {
    //Keep track of state for knowing what to render
    currentState: LOGO_STATE_ID,
    //General info about the logo state
    logoInfo: {
        alpha: 1.0, //For fade in and out
        fadingOut: false, //For calculations on wether to subtract or add to fade
        currentState: 0, //Keep track of what intro it's on
        messages: ["PokeyOne", "Asteroid\nDestroyer"]
    },
    //Player data for rotation, time since last shot, and current bullets in the
    //air.
    player: {
        rotation: 0.1, //Current rotation in radians
        shotCooldown: 10, //A cool down timer for how often player can shoot
        bullets: [] //An array that holds all the information of bullets in air
    },
    //Just keeps tabs on what keys are currently pressed
    keyDown: {
        left: false,
        right: false,
        space: false
    }
}

//general change of things before every render
game.tick = function(){
    //A switch block for the current state
    switch (game.currentState) {
        case LOGO_STATE_ID:
            //Subracts from alpha when fading in, and adds to alpha when fading
            //out. Then switches either to fading out or to the game state.
            if(game.logoInfo.fadingOut == false){
                game.logoInfo.alpha -= 0.005;
                if(game.logoInfo.alpha <= 0){
                    game.logoInfo.fadingOut = true;
                }
            }else{
                game.logoInfo.alpha += 0.005;
                if(game.logoInfo.alpha >= 1){
                    if(game.logoInfo.currentState == 1){
                        game.currentState = GAME_STATE_ID;
                    } else {
                        game.logoInfo.currentState = 1;
                        game.logoInfo.fadingOut = false;
                    }
                }
            }
            break;
        case GAME_STATE_ID:
            //Spin clock-wise when right key is pressed
            if(game.keyDown.right){
                game.player.rotation += 0.02;
                if(game.player.rotation > 6.28319){
                    game.player.rotation = 0;
                }
            }

            //Spin counter clock-wise when left key pressed
            if(game.keyDown.left){
                game.player.rotation -= 0.02;
                if(game.player.rotation < 0){
                    game.player.rotation = 6.28319;
                }
            }

            //Bullets aren't bullets if they don't move!
            if(game.player.bullets.length > 0){
                for(i = 0; i <  game.player.bullets.length; i++){
                    game.player.bullets[i].x += game.player.bullets[i].speed.x;
                    game.player.bullets[i].y += game.player.bullets[i].speed.y;
                }
            }

            //Shoot bullet when space is pressed and cooldown not active
            if(game.player.shotCooldown > 0){
                game.player.shotCooldown -= 1;
            }else if(game.keyDown.space){
                var rot = game.player.rotation;
                var bulletData = {
                    x: 320,
                    y: 240,
                    speed: {
                        x: 0,
                        y: 0
                    },
                    dir: rot
                }
                if(rot <= 1.5708){
                    var per = rot/1.5708;
                    var ratio = [Math.floor(per * 100), 100-Math.floor(per * 100)];
                    var gcf = getGCF(ratio[0], ratio[1]);
                    ratio[0] = ratio[0]/gcf;
                    ratio[1] = ratio[1]/gcf;

                    debug("lowering " + ratio[0] + " " + ratio[1]);
                    if(ratio[0] + ratio[1] > 3){
                        var bothDiv = (ratio[0] + ratio[1])/3;
                        ratio[0] /= bothDiv;
                        ratio[1] /= bothDiv;
                    }
                    debug("to " + ratio[0] + " " + ratio[1]);

                    ratio[1] -= ratio[1]*2;

                    bulletData.speed.x = ratio[0];
                    bulletData.speed.y = ratio[1];
                }else if(rot <= 3.1415){
                    var per = (rot-1.5708)/1.5708;
                    var ratio = [100-Math.floor(per * 100), Math.floor(per * 100)];
                    var gcf = getGCF(ratio[0], ratio[1]);
                    ratio[0] = ratio[0]/gcf;
                    ratio[1] = (ratio[1]/gcf);
                    bulletData.speed.x = ratio[0];
                    bulletData.speed.y = ratio[1];
                }

                game.player.bullets.push(bulletData);
                game.player.shotCooldown = 50;
            }

            //Bullet movement
            if(game.player.bullets.length > 0){
                for(i = 0; i < game.player.bullets.length; i++){

                }
            }

            break;
        default:
            debug("Invalid state"); //if the currentState is unhandled
    }

    //Well, we want to see something on the screen, don't we?
    game.render();
}

//render all objects to the game canvas
game.render = function(){
    switch (game.currentState) {
        case LOGO_STATE_ID:
            //The gradient of the background
            var gradient = game.ctx.createLinearGradient(0, 0, 0, 480);
            gradient.addColorStop(0, "#3FFFBF"); //Top
            gradient.addColorStop(1, "#00FFAA"); //Bottom

            //Background
            game.ctx.fillStyle = "#00FFAA";
            game.ctx.fillRect(0, 0, 640, 480);

            //Text
            game.ctx.fillStyle = "#000000"; //Black
            game.ctx.textAlign = "center"; //Make sure the logo is in the middle
            game.ctx.font = "50px sans-serif"; //Just setting the font
            game.ctx.fillText(game.logoInfo.messages[game.logoInfo.currentState],
                game.canvas.width/2, game.canvas.height/2); //Drawing the actual text

            //Overlay
            game.ctx.fillStyle = "rgba(0, 0, 0, " + game.logoInfo.alpha + ")";
            game.ctx.fillRect(0, 0, 640, 480); //Drawing the overlay/fader
            break;
        case GAME_STATE_ID:
            //Background
            game.ctx.fillStyle = "#111111"; //Off-black
            game.ctx.fillRect(0, 0, 640, 480);//Fill the backdrop

            //Save context for later reset
            game.ctx.save();

            //Apply transformations
            game.ctx.translate(320, 240); //Canvas centre
            game.ctx.rotate(game.player.rotation); //Rotate the context to player

            //Draw player
            game.ctx.drawImage(game.player.image, 0-25, 0-25, 50, 50); //Draw player

            //Reset transformations
            game.ctx.restore(); //Reset the transform so everything else doesn't rotate

            //Render all the bullets
            for(i = 0; i < game.player.bullets.length; i++){
                game.ctx.save(); //Again, just saving for easier return from being askew

                //You get the point from before, just applying some transforms
                game.ctx.translate(game.player.bullets[i].x, game.player.bullets[i].y);
                game.ctx.rotate(game.player.bullets[i].dir);

                game.ctx.fillStyle = "#EFEFEF"; //Off-white
                game.ctx.fillRect(0-3, 0-5, 6, 10); //Drawing the bullets

                game.ctx.restore(); //Just bringing it back to normal
            }

            //Render Debug
            renderGameDebug(game.ctx, game.player);

              //----------------//
             //---Render-GUI---//
            //----------------//

            //Cooldown bar
            game.ctx.strokeStyle = "#FFFFFF"; //white
            game.ctx.fillStyle = "#FF660A"; //redish-orange
            game.ctx.strokeRect(9, 9, 52, 22); //Border of bar
            game.ctx.fillRect(10, 10, game.player.shotCooldown, 20); //middle of bar
            break;
        default:
            console.log("Invalid state");
    }
}

//handles the keyDown event
function keyDown(event){
    switch (event.keyCode) {
        case 37://left arrow
        case 65://a key
            game.keyDown.left = true;
            break;
        case 39://right arrow
        case 68://d key
            game.keyDown.right = true;
            break;
        case 32://space bar
            game.keyDown.space = true;
            break;
        default:
            debug("Unhandled key code " + event.keyCode + " which I believe is " +
                getKeyCodeName(event.keyCode));
    }
}

//handles the key up event
function keyUp(event){
    switch (event.keyCode) {
        case 37://left arrow
        case 65://a key
            game.keyDown.left = false;
            break;
        case 39://right arrow
        case 68://d key
            game.keyDown.right = false;
            break;
        case 32://space bar
            game.keyDown.space = false;
            break;
        case 72://h
            if(hitBoxesShown){
                hitBoxesShown = false;
            }else{
                hitBoxesShown = true;
            }
            break;
        default:
            break;
    }
}

//initialize all variables and general setup
function init(){
    console.log("initializing game!");

    //window event handlers
    window.addEventListener('keydown', keyDown, false);
    window.addEventListener('keyup', keyUp, false);

    //game setup
    game.canvas = document.getElementById("gameCanvas"); //Get the canvas object
    game.ctx = game.canvas.getContext("2d"); //Get the drawing context of canvas
    game.loop = setInterval(game.tick, 10); //Start main game loop

    //player setup
    game.player.image = document.getElementById("player");
}

//stops the game loop
function stopGame(){
    clearInterval(game.loop);
}

//call the init function
init();
