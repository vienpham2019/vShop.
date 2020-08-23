import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../services/pagination/pagination.service'

import { Store } from '@ngrx/store'
import { ShoppingItem } from '../../models/shopping_item.model'
import * as ShoppingItemActions from '../../actions/shopping_items.actions'
import * as UserActions from '../../actions/user.actions'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  top_selling: any = {
    first_row: [
      {class_name: "col-12 col-md-6" , title: "Floral Cotton midi Dress" , price: 59.00 , sale_price: 0 , new: false , sale: true  , img_url: "https://images.express.com/is/image/expressfashion/0094_07824549_0003?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"},
      {class_name: "col-12 col-md-6 pt-12" , title: "Line basic Trousers" , price: 125.00, new: true , sale: false  , img_url: "https://cm.rlmedia.io/is/image/PoloGSI/s7-1255555_lifestyle?$CMPDP$"},
    ], 
    second_row: {title: 'Leather heel Sandals' , price: 129.99 , sale_price: 89.99 , new: false , sale: true , img_url: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/04/What-to-Do-When-Your-Shoes-Are-Too-Tight_1296x728-header-1024x575.jpg?w=1155&h=1528'} , 
    third_row: [
      {class_name: "col-12 col-md-6 order-md-2" , title: "Cotton basic T-Shirt" , price: 50.00 , sale_price: 0, new: false, sale: false  , img_url: "https://choosmeinstyle.com/wp-content/uploads/2019/02/cotton-t-shirts-1261.jpg"},
      {class_name: "col-12 col-md-6 pt-12 order-md-1" , title: 'Leather square Tote Bag' , price: 35.00 , sale_price: 0 , new: false , sale: false  , img_url: "https://cdn.shopify.com/s/files/1/2523/1254/products/Genuine_Leather_Square_Satchel_Handbags_Purses_16_2ad1e7fb-5464-4eb4-b6ab-59b91c83be9e_500x.jpg?v=1590078909" }
    ],
    fourth_row: {title: 'Acymmetric Cotton Top' , price: 39.99 , new: false , sale: true , img_url: 'https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg'}
  }

  new_arrivals: ShoppingItem[] = [
    {title: "Cotton floral print Dress" , price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg" , new: true,  sale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'},
    {title: "Cotton floral print Dress" , price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://choosmeinstyle.com/wp-content/uploads/2019/02/cotton-t-shirts-1261.jpg" , new: true,  sale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'},
    {title: "Cotton floral print Dress" , price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://cdn.shopify.com/s/files/1/2523/1254/products/Genuine_Leather_Square_Satchel_Handbags_Purses_16_2ad1e7fb-5464-4eb4-b6ab-59b91c83be9e_500x.jpg?v=1590078909" , new: true,  sale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'}
  ]

  display_new_arrivals: any[]
  start_index: number = 0 
  end_index: number = 6
  new_arrival_display_amount: number = 6

  new_arrival_length: any[] = new Array(Math.ceil(this.new_arrivals.length / this.new_arrival_display_amount)).fill(0)
  
  constructor(
    private pagination_s: PaginationService ,
    private store: Store<{shopping_items: ShoppingItem[]}>
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.slice_new_arrivals()
  }

  slice_new_arrivals(){
    this.display_new_arrivals = this.pagination_s.slice_arrays(this.new_arrivals , this.start_index , this.end_index)
  }

  change_page(value):void{

    let { start_index , end_index } = this.pagination_s.change_page(value , this.start_index , this.end_index , this.new_arrivals , this.new_arrival_display_amount)

    this.start_index = start_index 
    this.end_index = end_index

    this.slice_new_arrivals()
  }

  change_page_number(i):void {
    let {start_index , end_index} = this.pagination_s.change_page_number(i , this.start_index , this.end_index , this.new_arrival_display_amount)

    this.start_index = start_index 
    this.end_index = end_index
    this.slice_new_arrivals()
  }

  new_arrival_class(current_index){
    return this.pagination_s.pagination_class(current_index , this.start_index , this.new_arrival_display_amount)
  }

  price_class (item) {
    let class_name = item.sale ? ' text-primary' : ''
    return 'btn btn-white btn-sm card-price card-price-left' + class_name
  }

  addToShoppingCart(shopping_item){
    this.store.dispatch(new UserActions.AddWidhlist(shopping_item))
  }

}
