import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../services/pagination/pagination.service'

import { Store } from '@ngrx/store'
import { ShoppingItem } from '../../models/shopping_item.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  top_selling: any[] = [
    [
      {title: "Cotton floral print Dress" , current_price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg" , isNew: true,  isSale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'},
      {title: "Cotton floral print Dress" , current_price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg" , isNew: true,  isSale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'}
    ], 
    {title: "Cotton floral print Dress" , current_price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://static.nike.com/a/images/c_limit,w_400,f_auto/t_product_v1/05e36463-7f7d-4cbd-b246-e7e1a804bffa/image.jpg" , isNew: true,  isSale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'}, 
    [
      {title: "Cotton floral print Dress" , current_price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg" , isNew: true,  isSale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'},
      {title: "Cotton floral print Dress" , current_price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg" , isNew: true,  isSale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'}
    ],
      {title: "Cotton floral print Dress" , current_price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg" , isNew: true,  isSale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'}
  ]

  new_arrivals: ShoppingItem[] = [
    {title: "Cotton floral print Dress" , current_price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg" , isNew: true,  isSale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'},
    {title: "Cotton floral print Dress" , current_price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://choosmeinstyle.com/wp-content/uploads/2019/02/cotton-t-shirts-1261.jpg" , isNew: true,  isSale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'},
    {title: "Cotton floral print Dress" , current_price: 40 , size: "M" , color: "Red" , amount: 2 , img: "https://cdn.shopify.com/s/files/1/2523/1254/products/Genuine_Leather_Square_Satchel_Handbags_Purses_16_2ad1e7fb-5464-4eb4-b6ab-59b91c83be9e_500x.jpg?v=1590078909" , isNew: true,  isSale: false, sale_price: 0 , category: 'dress' , brand: 'nike' , id:'abcd' , season: 'summer'}
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
    fetch('http://localhost:3000/Men')
    .then(res => res.json())
    .then(data => console.log(data.filter(item => item.category.split(' ').indexOf('Shoe') >= 0)))
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
    let class_name = item.isSale ? ' text-primary' : ''
    return 'btn btn-white btn-sm card-price card-price-left' + class_name
  }

}
