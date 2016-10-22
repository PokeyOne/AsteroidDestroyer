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
        }
    }
}
