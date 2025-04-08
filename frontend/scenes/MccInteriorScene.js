import LevelScene from './LevelScene.js';

export default class MccInteriorScene extends LevelScene {
  constructor() {
    const data = {};

    data.skyImgName = "sky"
    data.tileMapName = "mcctilemap";
    data.playerStartX = 100;
    data.playerStartY = 200;
    data.nextSceneThroughDoor = "GameOverScene";
    data.instructionsString = `You are now inside the
Midtown Collaboration Center!
    
Your new goal is to make it to
Hyland's classroom.

There, you can learn all about coding
(including making games like this one).

Press SPACE to begin. Good luck!`

    super("MccInteriorScene", data);
  }
}
