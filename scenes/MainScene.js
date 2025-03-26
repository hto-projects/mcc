const createAligned = (scene, count, texture, scrollFactor) => {
  const mtn1 = scene.add.image(0, 0, 'mtn1').setOrigin(0, 0).setScrollFactor(.25);
  mtn1.setScale(2);
}

import Lightbulb from '../sprites/Lightbulb.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image('tiles', 'public/assets/groundtiles.png');
    this.load.image('topdecimg', 'public/assets/topdec2.png');
    this.load.image('MccSideImg', 'public/assets/MccSideImg.png');
    this.load.image('treeimg', 'public/assets/tree.png');
    this.load.tilemapTiledJSON('tilemap', 'public/assets/neighborhoodmap.json');
    for (let i = 1; i <= 8; i++) {
      const pName = `player${i}`;
      this.load.spritesheet(pName, `public/assets/${pName}sheet.png`, { frameWidth: 32, frameHeight: 32 });
    }

    this.load.image('sky', 'public/assets/bgsky.png');

    this.load.image('sea', 'public/assets/seatry2.png');

    this.load.image('mtn1', 'public/assets/bgmtn1a.png');
    this.load.image('mtn2', 'public/assets/bgmtn2a.png');

    this.load.spritesheet('lightbulb', 'public/assets/lightbulbsheet2.png', { frameWidth: 16, frameHeight: 16 });

    this.load.bitmapFont("pixelfont", "public/assets/fonts/pixelfont.png", "public/assets/fonts/pixelfont.xml");
  }

  init(data) {
    this.playerSpriteName = data.playerSpriteName;
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.currentScore = 0;
    this.bulbCount = 0;

    const sky = this.add.image(width * .5, height * .5, 'sky').setScrollFactor(0, 0);
    sky.setScale(2);


    // const mtn1 = this.add.image(0, 0, 'mtn1').setOrigin(0, 0).setScrollFactor(.25);
    // mtn1.setScale(2);
    // const mtn2 = this.add.image(0, 0, 'mtn2').setOrigin(0, 0).setScrollFactor(.5);
    // mtn2.setScale(2);

    // const sea = this.add.image(0, 0, 'sea').setOrigin(0, 0).setScrollFactor(.75);

    const map = this.make.tilemap({ key: 'tilemap'});
    const tileset = map.addTilesetImage('groundset', 'tiles');
    const mccSideTileset = map.addTilesetImage('MccSideTileset', 'MccSideImg');
    // const tileset3 = map.addTilesetImage('tree', 'treeimg');
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    const ground = map.createLayer('ground', tileset);
    const lightbulbsLayer = map.getObjectLayer('lightbulbs')['objects'];
    const doorsLayer = map.getObjectLayer('DoorsLayer')['objects'];

    const mccSideLayer = map.createLayer('MccSideLayer', mccSideTileset);
    // const treedecor = map.createLayer('trees', tileset3);
    ground.setCollisionByProperty({ collides: true });

    this.player = this.physics.add.sprite(100, 200, this.playerSpriteName);
    this.player.body.setGravityY(300);
    this.player.setCollideWorldBounds(true);

      //  Our player animations, turning, walking left and walking right.
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(this.playerSpriteName, { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: [ { key: this.playerSpriteName, frame: 1 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: this.playerSpriteName, frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(this.playerSpriteName, { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    this.overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.5)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    this.bulbs = this.physics.add.group({immovable: true, allowGravity: false});
    

    this.anims.create({
      key: 'volt',
      frames: this.anims.generateFrameNumbers('lightbulb', { start: 0, end: 7 }),
      frameRate: 2,
      repeat: -1
    });

    lightbulbsLayer.forEach(lightbulbObj => {
      const {x, y} = lightbulbObj;
      this.bulbs.add(new Lightbulb({scene:this,x,y}));
    });

    doorsLayer.forEach(doorObj => {
      const {x, y, width, height, properties} = doorObj;
      const door = this.add.rectangle(x + width / 2, y + height / 2, width, height, 0x000000, 0).setOrigin(0, 0);
      this.physics.add.existing(door, true);
      // when player collides with door, trigger function to run
      this.physics.add.overlap(this.player, door, () => {
        //alert("HEY!");
      });
    });



    this.physics.add.collider(this.player, ground);
    this.bulbAmount = 100;
    this.bulbCollider = this.physics.add.collider(this.player, this.bulbs, (p, b) => { b.destroy(); this.bulbCount++; });
    this.bulbCollider.overlapOnly = true;
    
    this.add.rectangle(0, 0, width, 20, 0x000000, 0.0).setOrigin(0, 0).setScrollFactor(0, 0);
    this.scoreText = this.add.bitmapText(10, 5, "pixelfont", "", 12).setOrigin(0, 0).setScrollFactor(0, 0);
    this.timeText = this.add.bitmapText(width - 10, 5, "pixelfont", "", 12).setOrigin(1, 0).setScrollFactor(0, 0);
    this.timeLimit = 600;
    this.timeTicking = true;

    this.cursors = this.input.keyboard.createCursorKeys();


    this.cameras.main.startFollow(this.player);
    // this.cameras.main.setLerp(.9, 0);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.timer = this.time.addEvent({
      delay: 100, 
      loop: true,
      callback: () => {
        if (this.timeTicking) {
          this.timeLimit--;
        }
        
        this.timeText.text = `00:${(this.timeLimit / 10).toFixed(1).padStart(4, '0')}`;

        if (this.timeLimit === 0) {
          alert("NOOOO");
        }
      }
  });

  }

  update() {
    this.scoreText.setText(`SCORE: ${this.currentScore + this.bulbAmount * this.bulbCount}`);

    const runVelocity = 160 * (this.cursors.shift.isDown ? 4 : 1);
    
    const targetAlpha = Math.max(0, 0.15 - this.bulbCount * 0.025);
    const currentAlpha = this.overlay.fillAlpha;
    this.overlay.setFillStyle(0x000000, Phaser.Math.Linear(currentAlpha, targetAlpha, 0.1));

    const bodyOnFloor = this.player.body.onFloor();
    if (this.cursors.left.isDown)
    {
      this.player.flipX = true;
      this.player.setVelocityX(runVelocity * -1);
      if (bodyOnFloor) {
        this.player.anims.play('left', true);
      } else {
        this.player.anims.play('jump');
      }
    }
    else if (this.cursors.right.isDown)
    {
      this.player.flipX = false;
      this.player.setVelocityX(runVelocity);
      if (bodyOnFloor) {
        this.player.anims.play('right', true);
      } else {
        this.player.anims.play('jump');
      }
    }
    else
    {
      this.player.setVelocityX(0);
      if (bodyOnFloor) {
        this.player.anims.play('turn');
      } else {
        this.player.anims.play('jump');
      }
    }

    if (this.cursors.space.isDown && this.player.body.onFloor())
    {
      this.player.setVelocityY(-330);
    }
  }
}
