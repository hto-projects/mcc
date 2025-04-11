import LevelScene from './LevelScene.js';

export default class NeighborhoodScene extends LevelScene {
  constructor() {
    const data = {};

    data.skyImgName = "sky"
    data.tileMapName = "neighborhoodtilemap";
    data.playerStartX = 100;
    data.playerStartY = 200;
    data.bgImgName = "neighborhooddecor";
    data.nextSceneThroughDoor = "MccInteriorScene";
    data.instructionsString = `Welcome to Midtown!

Your goal is to make it to the MCC.

Use LEFT and RIGHT to move.

Press ${window.CONTROLLER ? "A" : "SPACE"} to jump.

Avoid the monsters (or jump on them).

Collect light bulbs.

Watch the timer.

Press ${window.CONTROLLER ? "A" : "SPACE"} to begin. Good luck!`;

    super("NeighborhoodScene", data);
  }
}
