export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image('hyland', 'public/assets/hylandpixellogo.png');
    this.load.image('mcc', 'public/assets/mcc logo pixel.png');

    this.load.bitmapFont("pixelfont", "public/assets/fonts/pixelfont.png", "public/assets/fonts/pixelfont.xml");
    this.load.bitmapFont("pixelfontyellow", "public/assets/fonts/pixelfontyellow.png", "public/assets/fonts/pixelfont.xml");

    this.load.image('tiles', 'public/assets/groundtiles.png');
    this.load.image('topdecimg', 'public/assets/topdec2.png');
    this.load.image('MccSideImg', 'public/assets/MccSideImg.png');
    this.load.image('HylandClassroomImg', 'public/assets/hylandclassroom2.png');
    this.load.image('treeimg', 'public/assets/tree.png');
    this.load.tilemapTiledJSON('mcctilemap', 'public/assets/neighborhoodmap2.json');
    this.load.tilemapTiledJSON('neighborhoodtilemap', 'public/assets/neighborhoodmap.json');

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

  create() {
    this.scene.start("TitleSplash");
  }
}
