function getKeyCodeName(keyCode){
    switch (keyCode) {
        case 9:
            return "tab";
        case 16:
            return "shift";
        case 17:
            return "control";
        case 18:
            return "alt";
        case 20:
            return "caps lock";
        case 48:
            return "0";
        case 49:
            return "1";
        case 50:
            return "2";
        case 51:
            return "3";
        case 52:
            return "4";
        case 53:
            return "5";
        case 54:
            return "6";
        case 55:
            return "7";
        case 56:
            return "8";
        case 57:
            return "9";
        default:
            return "unknown";
    }
}
