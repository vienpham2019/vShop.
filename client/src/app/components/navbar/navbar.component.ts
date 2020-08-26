import { Component, OnInit } from '@angular/core';
import { ShoppingItemService } from '../../services/shopping-item/shopping-item.service'

import { ShoppingItem } from '../../models/shopping_item.model'
import { select , Store } from '@ngrx/store'
import { AppInitState } from '../../models/app_initState.model'
import * as AppActions from '../../actions/app.action'

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
      "Women": ["Shoes", "Slides" , "Tops" , "T-Shirts", "Crews", "Hoodies" , "Jackets" , "Backpacks", "Bags" , "Hats" , "Skirts" , "Pants", "Caps"],
      "Men": ["Shoes" , "Tops", "T-Shirts" ,"Crews" , "Hoodies" , "Jackets" , "Backpacks", "Bags" , "Hats", "Beanies" , "Pants" , "Caps"], 
    }
  }

  shopping_items: number 
  constructor(
    private shopping_item_s: ShoppingItemService, 
    private store: Store<{shopping_items: ShoppingItem[]}> ,
    private catalog_store: Store<{main_reducer: AppInitState}>
  ) {
    store.pipe(select('shopping_items')).subscribe(values => {
      this.shopping_items = values.length
    })
   }

  ngOnInit(): void {
  }

  getCatalogs(gender , category){
    console.log(gender)
    this.catalog_store.dispatch(new AppActions.DisplayCatalogs(gender , category.substring(0,category.length - 1)))
  }

}
