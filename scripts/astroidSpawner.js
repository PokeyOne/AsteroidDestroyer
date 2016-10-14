function spawnAsteroid(isWorker) {
    var angle = randomRadian();
    var asteroid = {
        x: dirSpd(angle, 3).x * -1000,
        y: dirSpd(angle, 3).y * -1000,
        speed: dirSpd(angle, 3),
        rad: angle,
        size: Math.random() * 50,
        lifeTime: 0
    }

    debug("Spawning asteroid");

    if(isWorker){
        return asteroid;
    }else{
        game.asteroids.push(asteroid);
    }
}
