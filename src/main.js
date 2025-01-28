// name: Bhavya Anil
// title: Rocket Patrol: The Defenders
// time: 12 hours
// mods: 1) create new enemy spaceship type (5 pts) 
//       2) implement a new timing/scoring mechanism *can be seen in time remaining* (5 pts)
//       3) create new title screen *added planets and changed font/color* (3 pts)
//       4) create 4 randomized explosion sound effects (3 pts)
//       5) display time remaining (3 pts)
//       6) add looping background music (1 pt)
// citations: spaceship from https://foozlecc.itch.io/void-main-ship
//            explosion sound effects from https://www.leshylabs.com/apps/sfMaker/
//            planet from https://twojyou.itch.io/space-sprites
//            background music from https://www.leshylabs.com/apps/sfMaker/#examples
//            help with timer from classmate Marcus T

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;