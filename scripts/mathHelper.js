//The Euclidean Algorithm
function getGCF(numberA, numberB){
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
