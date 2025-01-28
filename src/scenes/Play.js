class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    
    create(){
        //tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        //green background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);
        //add spaceships (x3)
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship1', 0, 40).setOrigin(0,0);
        this.ship04.moveSpeed = game.settings.spaceshipSpeed * 1.2;
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
         //white borders
         this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
         this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
         this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
         this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //initialize score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#FFFFFF',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
        }
        //display timer
        this.textConfig = this.add.text(borderUISize*16 + borderPadding, borderUISize + borderPadding*4, `Time: ${this.remainingTime / 1000}`, {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#FFFFFF',
            align: 'right',
        }).setOrigin(0.5);
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig); 
        //game over flag
        this.gameOver = false;
        this.remainingTime = game.settings.gameTimer;
        //background looping music
        let loopingMusic = this.sound.play('looping-music', {loop: true});
        //play clock
        this.clock = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.remainingTime -= 1000;
                this.textConfig.setText(`Time: ${Math.max(this.remainingTime/1000, 0)}`);
                if (this.remainingTime <= 0){
                    this.clock.remove(false);
                    this.add.text(game.config.width/2, game.config.height/2, 'Game Over', scoreConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
                    this.gameOver = true;
                    this.sound.stopByKey('looping-music');
                }
            },
            callbackScope: this,
            loop: true,
        });
    }

    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        //check collisions
        if (this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
            this.remainingTime += 4000; //increases time
            console.log(this.remainingTime);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.remainingTime += 4000; //increases time
            console.log(this.remainingTime);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.remainingTime += 4000; //increases time
            console.log(this.remainingTime);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.remainingTime += 4000; //increases time
            console.log(this.remainingTime);
        }
    }

    rocketMissedHit(){
        this.remainingTime -= 2000; //decreases time
        console.log(this.remainingTime);
    }

    checkCollision(rocket, ship){
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true;
        }
        else{
            return false;
        }
    }

    shipExplode(ship){
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
        //score add and text update
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        //sound effects
        const explosionSFX = [
            "sfx-explosion",
            "boomsfx",
            "boomsfx1",
            "boomsfx2",
            "boomsfx3"
        ];
        const randomizedExplosionSFX = Math.floor(Math.random() * explosionSFX.length);
        this.sound.play(explosionSFX[randomizedExplosionSFX]);
    }
}
