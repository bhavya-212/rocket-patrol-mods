// name: Bhavya Anil
// title: Rocket Patrol: The Defenders
// time:
// mods: 1) create new enemy spaceship type (5 pts)
//       2) particle explosion when rocket hits spaceship (5 pts)
//       3) create new title screen (3 pts)
//       4) display time remaining (3 pts)
//       5) implement mouse control for player movement (5 pts)
// citations: spaceship from https://foozlecc.itch.io/void-main-ship

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