class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    preload(){
        this.load.image('planet1', './assets/planet1.png');
        this.load.image('planet2', './assets/planet2.png');
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship1', './assets/spaceship1.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('particle', './assets/particle.png');
        this.load.spritesheet('explosion', './assets/explosion.png',{
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.audio('sfx-select', './assets/sfx-select.wav');
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav');
        this.load.audio('sfx-shot', './assets/sfx-shot.wav');
        this.load.audio('boomsfx', './assets/boomsfx.wav');
        this.load.audio('boomsfx1', './assets/boomsfx1.wav');
        this.load.audio('boomsfx2', './assets/boomsfx2.wav');
        this.load.audio('boomsfx3', './assets/boomsfx3.wav');
        this.load.audio('looping-music', './assets/loopingmusic.wav');
    }

    create(){
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate:  30
        })
        this.add.image(game.config.width/2, game.config.height/2, 'planet1').setOrigin(0.5,-1).setScale(2);
        this.add.image(game.config.width/2, game.config.height/2, 'planet2').setOrigin(0.5,2).setScale(2);
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            color: '#00FF00',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0 
        }
        let titleConfig = {
          fontFamily: 'Comic Sans MS',
          fontSize: '32px',
          color: '#F3B141',
          align: 'right',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 0 
       }
       //display menu text
       this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Rocket Patrol: The Defenders', titleConfig).setOrigin(0.5).setDepth(1);
       this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5).setDepth(1);
       menuConfig.color = '#00FF00';
       this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5).setDepth(1);
       //define keys
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          //easy mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 60000    
          }
          this.sound.play('sfx-select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          //hard mode
          game.settings = {
            spaceshipSpeed: 5,
            gameTimer: 45000    
          }
          this.sound.play('sfx-select');
          this.scene.start('playScene');    
        }
      }
}