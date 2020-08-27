import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ShoppingItemService } from '../../services/shopping-item/shopping-item.service'

import { ShoppingItem } from '../../models/shopping_item.model'
import { select , Store } from '@ngrx/store'
import { AppInitState } from '../../models/app_initState.model'
import * as AppActions from '../../actions/app.action'

import * as UserActions from '../../actions/user.actions'
import { User } from 'src/app/models/user.model';


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
      "Women": ["Shoes", "Slides" , "Tops", "Tanks", "Crews", "Hoodies" , "Jackets" , "Backpacks", "Bags" , "Hats" , "Skirts", "Caps"],
      "Men": ["Shoes" , "Tops", "T-Shirts" ,"Crews" , "Hoodies" , "Jackets" , "Backpacks", "Bags" , "Hats", "Beanies" , "Pants" , "Caps"], 
    }
  }

  shopping_items: number 
  constructor(
    private shopping_item_s: ShoppingItemService, 
    private router: Router, 
    private store: Store<{shopping_items: ShoppingItem[]}> ,
    private catalog_store: Store<{main_reducer: AppInitState}>,
    private user_store: Store<{user: User}>
  ) {
    store.pipe(select('shopping_items')).subscribe(values => {
      this.shopping_items = values.length
    })

    user_store.pipe(select('user')).subscribe(value => {
      this.current_user = value.current_user
    })
   }

   current_user:boolean 

  ngOnInit(): void {
  }

  getCatalogs(gender , category){
    this.catalog_store.dispatch(new AppActions.DisplayCatalogs(gender , category.substring(0,category.length - 1)))
  }

  sendToUserProfile(title: string | null =  null ):void {
    if(this.current_user){
      let routerLink = title ? ['/user-profile' , {title} ] : ['/user-profile']
      this.router.navigate(routerLink)
    }else{
      document.getElementById('loginModalButton').click()
    }
  } 

  userLogout(){
    this.user_store.dispatch(new UserActions.UserLogout(false) )
  }

}
