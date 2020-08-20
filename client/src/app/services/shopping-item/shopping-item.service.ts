import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {

  constructor() { }
  shopping_items: any[] = []

  getShoppingItem(){
    return this.shopping_items
  }

  addToShoppingItem(item):void {
    this.shopping_items.unshift(item)
  }
}
