//milliseconds between frames
var FRAME_GAP = 30;

//The amount of pixels moved every tick by bullets
var BULLET_SPEED = 6 * (FRAME_GAP/ 10.0);

//Ticks for bullet cooldown
var SHOT_COOLDOWN = 50 / (FRAME_GAP/10.0);

//The speed at which the asteroids move
var ASTEROID_SPEED = 3 * (FRAME_GAP/10.0);

//Time asteroids have until they get removed from out of bounds
var ASTEROID_LIFETIME = 2000 / (FRAME_GAP/10.0);

//State IDs
var LOGO_STATE_ID = 0; //id of logo intro page
var GAME_STATE_ID = 1; //id of game state
var CRED_STATE_ID = 2; //id of credits state

//Web-Worker Message IDs
var SPAWN_ASTEROID_MSGID = 0;
var START_WORKER_LOOP_MSGID = 1;
