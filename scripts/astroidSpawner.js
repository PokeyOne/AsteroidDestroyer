function spawnAsteroid(isWorker) {
    var angle = randomRadian();
    var asteroid = {
        x: dirSpd(angle, ASTEROID_SPEED).x * -1000,
        y: dirSpd(angle, ASTEROID_SPEED).y * -1000,
        speed: dirSpd(angle, ASTEROID_SPEED),
        rad: angle,
        size: Math.random() * 50 + 10,
        lifeTime: 0
    }

    if(isWorker){
        return asteroid;
    }else{
        game.asteroids.push(asteroid);
    }
}
