var isDebug = true;
var hitBoxesShown = false;

//A way to log message only when debuging
function debug(message){
    if(isDebug){
        console.log(message);
    }
}

//Render debug stuff
function renderGameDebug(ctx, player){
    if(isDebug){
        if(hitBoxesShown){
            ctx.save();

            ctx.translate(320, 240);
            ctx.rotate(player.rotation);

            ctx.strokeStyle = "#00FFBB";
            ctx.strokeRect(0-25, 0-25, 50, 50);

            ctx.restore();

            //Asteroid hit boxes
            for(i = 0; i < game.asteroids.length; i++){
                ctx.save();

                var astro = game.asteroids[i];

                ctx.translate(astro.x, astro.y);
                ctx.rotate(astro.rad);

                ctx.strokeStyle = "#FE38AB";
                ctx.strokeRect(0 - astro.size/2, 0 - astro.size/2, astro.size, astro.size);

                ctx.restore();
            }
        }
    }
}
