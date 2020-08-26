import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../services/pagination/pagination.service'

import { Store , select } from '@ngrx/store'
import { CatalogItem } from '../../models/catalog_item.model'
import { AppInitState } from '../../models/app_initState.model'
import { CatalogItemInit } from '../../models/catalog_item_init.model'

import * as CatagoryItemActions from '../../actions/catalogItem.action'
import { ShoppingItemService } from 'src/app/services/shopping-item/shopping-item.service';

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
    private catagory_item_store: Store<{catalog_item: CatalogItemInit}>,
    private app_store: Store<{main_reducer: AppInitState}> 
  ) {
    app_store.pipe(select('main_reducer')).subscribe(value => {
      let { men_catalogs , women_catalogs }  = value
      if(men_catalogs.length && women_catalogs.length){
        let all_catalogs = [...men_catalogs , ...women_catalogs]
        this.top_selling = [[all_catalogs[20] , all_catalogs[27]] , all_catalogs[40] , [all_catalogs[60] , all_catalogs[94]] , all_catalogs[100]]
        this.new_arrivals = all_catalogs.filter(item => item.isNew)
        this.slice_new_arrivals() 
        this.new_arrival_length = new Array(Math.ceil(this.new_arrivals.length / this.new_arrival_display_amount)).fill(0)
      }
    })
   }

  ngOnInit(): void {
    window.scrollTo(0,0)
  }

  viewItem(item){
    console.log(item)
    this.catagory_item_store.dispatch(new CatagoryItemActions.AddDisplayItem(item))
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

}
