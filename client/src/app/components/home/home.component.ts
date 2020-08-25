import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../services/pagination/pagination.service'

import { Store } from '@ngrx/store'
import { CatalogItem } from '../../models/catalog_item.model'
import { ShoppingItem } from '../../models/shopping_item.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  top_selling: any[] = []

  new_arrivals: CatalogItem[] = []

  display_new_arrivals: any[]
  start_index: number = 0 
  end_index: number = 6
  new_arrival_display_amount: number = 6

  new_arrival_length: any[] = [] 
  
  constructor(
    private pagination_s: PaginationService ,
    private store: Store<{shopping_items: ShoppingItem[]}>
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    fetch('http://localhost:3000/Men')
    .then(res => res.json())
    .then(data => {
      this.top_selling = [[data[20] , data[27]] , data[40] , [data[60] , data[94]] , data[100]]
      this.new_arrivals = data.filter(item => item.isNew)
      this.slice_new_arrivals() 
      this.new_arrival_length = new Array(Math.ceil(this.new_arrivals.length / this.new_arrival_display_amount)).fill(0)
    })
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
