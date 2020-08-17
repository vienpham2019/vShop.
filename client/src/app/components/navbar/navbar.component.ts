import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
