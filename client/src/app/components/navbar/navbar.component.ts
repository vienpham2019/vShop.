import { Component, OnInit } from '@angular/core';
import { ShoppingItemService } from '../../services/shopping-item/shopping-item.service'

import { ShoppingItem } from '../../models/shopping_item.model'
import { Observable } from 'rxjs'
import { select , Store } from '@ngrx/store'
import { AddItem } from '../../actions/shopping_items.actions'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  current_catalog: string = "Women"

  catalog: any = {
    nav_keys: ['Women' , 'Men'],
    nav_content: {
      "Women": ["Shoes" , "Top & T-shirts" , "Hoodies" , "Jackets" , "Backpacks & Bags" , "Hats" , "Skirts & Dresses"],
      "Men": ["Shoes" , "Top & T-shirts" , "Hoodies" , "Jackets" , "Backpacks & Bags" , "Hats" , "Pants & Tights"], 
    }
  }

  shopping_items: number 
  constructor(
    private shopping_item_s: ShoppingItemService, 
    private store: Store<{shopping_items: ShoppingItem[]}> 
  ) {
    store.pipe(select('shopping_items')).subscribe(values => {
      this.shopping_items = values.length
    })
   }

  ngOnInit(): void {
  }

}
