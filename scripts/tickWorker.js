importScripts("astroidSpawner.js");

onmessage = function(e){
    switch(e.data){
        case "spawnAsteroid":
            spawnAsteroid(true);
            break;
    }
}
