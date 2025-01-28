class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 4;
        this.sfxShot = scene.sound.add('sfx-shot');
    }

    update(){
        //left and right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }
            else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring){
            this.isFiring = true;
            this.sfxShot.play();
        }
        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
    //     if (!thisr.isFiring){
    //         this.x = Phaser.Math.Clamp(this.input.activePointer.x, borderUISize + this.width, game.config.width - borderUISize - this.width);
    //     }
    //     else if (!this.input.activePointer.isDown) {
    //         if (keyLEFT.isDown && this.x >= borderUISize + this.width){
    //             this.x -= this.moveSpeed; //move left
    //         } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
    //             this.x += this.moveSpeed; //move right
    //         }
    //     }
    //     if (this.input.activePointer.isDown && !this.isFiring){
    //         this.isFiring = true;
    //         this.sfxShot.play();
    //     }
    //     if (this.isFiring && this.y >= borderUISize * 3 + borderPadding){
    //         this.y -= this.moveSpeed;
    //     }
    //     if (this.y <= borderUISize * 3 + borderPadding){
    //         this.isFiring = false;
    //         this.y = game.config.height - borderUISize - borderPadding;
    //     }
    // }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}