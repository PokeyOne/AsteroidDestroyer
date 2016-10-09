//Simple constants
var radians = {
    right: 1.5708,
    down: 3.1415,
    left: 4.712,
    up: 6.28319
}

//The Euclidean Algorithm
function getGCF(numberA, numberB){
    //Shorter names
    var a = numberA;
    var b = numberB;

    //Fail safe for infinate loop
    if(a < 0 || b < 0){
        return;
    }

    while(a != b){
        if(a > b){
            a -= b;
        }else if(b > a){
            b -= a;
        }
    }

    return a;
}

//Take a rotation in radians and turn it into x and y change for a certain speed
//Returns an object like so: {x: 0, y: 0}
function dirSpd(rad, speed){
    //Simple fail safe
    if(rad > radians.up || rad < 0){
        return {x: 0, y: 0};
    }

    var per = 0;
    var ratio = [];

    //Direction for faster calculations later
    //0 = top right
    //1 = bottom right
    //2 = bottom left
    //3 = top left
    var direction = 0;

    if(rad <= radians.right){
        direction = 0;
        per = rad/radians.right;
        ratio = [Math.floor(per * 100), 100-Math.floor(per * 100)];
    }else if(rad <= radians.down){
        direction = 1;
        per = (rad - radians.right)/radians.right;
        ratio = [100-Math.floor(per * 100), Math.floor(per * 100)];
    }else if(rad <= radians.left){
        direction = 2;
        per = (rad - radians.down)/radians.right;
        ratio = [Math.floor(per * 100), 100-Math.floor(per * 100)];
    }else {
        direction = 3;
        per = (rad - radians.left)/radians.right;
        ratio = [100-Math.floor(per * 100), Math.floor(per * 100)];
    }

    var gcf = getGCF(ratio[0], ratio[1]);
    ratio[0] /= gcf;
    ratio[1] /= gcf;

    if(ratio[0] + ratio[1] > speed){
        var bothDiv = (ratio[0] + ratio[1]) / speed;
        ratio[0] /= bothDiv;
        ratio[1] /= bothDiv;
    }

    switch (direction) {
        case 0: //Top right
            ratio[1] *= 0-1;
            break;
        case 1: //Bottom right

            break;
        case 2: //Bottom left
            ratio[0] *= 0-1;
            break;
        case 3: //Top left
            ratio[0] *= 0-1;
            ratio[1] *= 0-1;
            break;
        default:

    }

    return {x: ratio[0], y: ratio[1]};
}

//Random radian
function randomRadian(){
    return Math.random() * radians.up;
}

//True if a is inbetween b and c (both exclusive)
function between(a, b, c){
    var l = 0;
    var g = 0;

    if(b < c){
        l = b;
        g = c;
    }else{
        l = c;
        g = b;
    }

    if(a > b && a < c){
        return true;
    }else{
        return false;
    }
}
