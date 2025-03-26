import TitleSplash from "./scenes/TitleSplash.js";
import MainScene from "./scenes/MainScene.js"
import CharacterSelect from "./scenes/CharacterSelect.js";

const config = {
  type: Phaser.AUTO,
  width: 512,
  height: 386,
  pixelArt: true,
  antiAlias: false,
  scene: [TitleSplash, CharacterSelect, MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
};

const game = new Phaser.Game(config);
