import GameService from './index';
import {
  DictionaryOfObjects,
  recyclableObjects,
  nonRecyclableObjects,
  RecyclableDescription,
  NonRecyclableDescription,
} from './drawable-objects/Items';

export default class GameOverScreen {
  gameOverScreen: HTMLDivElement;

  constructor(element: Element) {
    this.gameOverScreen = document.createElement('div');
    this.gameOverScreen.classList.add('gameOver');
    this.gameOverScreen.classList.toggle('gameOver--hidden');

    element.appendChild(this.gameOverScreen);
  }

  displayGameOver(score: number): void {
    this.gameOverScreen.innerHTML = `GAME OVER!<br />YOUR SCORE: ${score}<br /><br />Think you can recycle better?<br />Press Enter to play again.`;
    this.gameOverScreen.classList.toggle('gameOver--hidden');
  }
}
