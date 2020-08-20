import { Component, OnInit } from '@angular/core';
import { ShoppingItemService } from '../../services/shopping-item/shopping-item.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  current_catalog: string = "Women"

  catalog: any = {
    nav_keys: ['Women' , 'Men' , 'Kids'],
    nav_content: {
      "Women": ["Clothing", "Shoes", "Dresses", "Bags", "Accessories", "Sunglasses", "Denim", "Boots", "Jewelry" , "Watches"],
      "Men": ["Clothing" , "Shoes" , "Coats & Jackets" , "Bags" , "Accessories" , "Sunglasses" , "Denim" , "Sneakers" , "Watches"], 
      "Kids": ["Clothing" , "Shoes" , "Accessories" , "Sunglasses" , "Denim", "Boots"]
    }
  }

  shopping_item: number
  constructor(private shopping_item_s: ShoppingItemService) { }

  ngOnInit(): void {
    this.shopping_item = this.shopping_item_s.getShoppingItem().length 
    console.log('new')
  }

}
