importScripts("astroidSpawner.js", "globalGameVars.js", "mathHelper.js");

var loop = 0;

var game = {
    timeTillNextAsteroid: 500,
    asteroidsSpawned: 0
}

onmessage = function(e){
    switch(e.data){
        case START_WORKER_LOOP_MSGID:
            loop = setInterval(tick, 10);
            break;
    }
}

function tick(){
    if(game.timeTillNextAsteroid <= 0){
        game.asteroidsSpawned++;
        postMessage({
            name: SPAWN_ASTEROID_MSGID,
            data: spawnAsteroid(true)
        });
        if(game.asteroidsSpawned < 30){
            game.timeTillNextAsteroid = (2/(game.asteroidsSpawned + 10)/10)*10000;
        }else{
            game.timeTillNextAsteroid = 50;
        }
    }else{
        game.timeTillNextAsteroid--;
    }
}
