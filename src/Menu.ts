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
    this.menu.classList.add('menu');
    this.menu.innerHTML = 'PRESS ENTER TO START AND STOP THE GAME<br /><br />';

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
      li.innerHTML = `<img src="dist/images/${item.imageName}" class='inline-block pr-2 mb-2'/>${item.itemName}: ${item.description}`;
      listOfItems.appendChild(li);
    });
    this.menu.appendChild(listOfItems);
    element.appendChild(this.menu);
  }

  receiveAction(keypress: 'toggle'): void {
    this.menu.classList.toggle('menu--hidden');
  }
}
