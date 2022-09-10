import GameService from './index';
import {
  DictionaryOfObjects,
  recyclableObjects,
  nonRecyclableObjects,
  RecyclableDescription,
  NonRecyclableDescription,
} from './drawable-objects/Items';

export default class Menu {
  menu: HTMLDivElement;

  allItems;
  constructor(element: Element) {
    this.menu = document.createElement('div');
    this.menu.setAttribute('width', GameService.WIDTH.toString());
    this.menu.setAttribute('height', GameService.HEIGHT.toString());
    this.menu.classList.add('menu');
    this.menu.innerHTML =
      'PRESS ENTER TO START GAME<br />PRESS P TO PAUSE AND UNPAUSE<br />PRESS Q TO QUIT<br />';

    const recyclableItems = Object.values(recyclableObjects).map((item) => {
      return {
        itemName: item.itemName,
        imageName: item.imageName,
        description: item.description,
      };
    });
    const nonRecyclableItems = Object.values(nonRecyclableObjects).map(
      (item) => {
        return {
          itemName: item.itemName,
          imageName: item.imageName,
          description: item.description,
        };
      }
    );
    this.allItems = recyclableItems.concat(nonRecyclableItems);
    const listOfItems: HTMLUListElement = document.createElement('ul');
    this.allItems.forEach((item) => {
      const li: HTMLLIElement = document.createElement('li');
      li.textContent = `${item.itemName}: ${item.description}`;
      listOfItems.appendChild(li);
    });
    this.menu.appendChild(listOfItems);
    element.appendChild(this.menu);
  }

  receiveKeypress(): void {
    this.menu.classList.toggle('menu--hidden');
  }
}
