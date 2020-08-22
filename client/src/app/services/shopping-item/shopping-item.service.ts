import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {

  constructor() { }
  shopping_items: any[] = [{}, {}]

  getShoppingItem(){
    return this.shopping_items
  }

  addToShoppingItem(item):void {
    this.shopping_items.unshift(item)
  }

  currentDate(){
    let today = new Date()
    let months = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul", "Aug" , "Sep" , "Oct", "Nov" , "Dec"]
    let dd = today.getDate()
    let mm = today.getMonth()
    let yy = today.getFullYear()
    return `${dd} ${months[mm]} ${yy}`
  }

}
