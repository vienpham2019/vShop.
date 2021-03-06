import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../../../models/catalog_item.model'
import { PaginationService } from '../../../services/pagination/pagination.service'
import { Store , select } from '@ngrx/store'

import { User } from '../../../models/user.model'
import * as UserActions from '../../../actions/user.actions'

import { AppInitState } from '../../../models/app_initState.model'
import * as AppActions from '../../../actions/app.action'

import axios from 'axios'

@Component({
  selector: 'app-widhlist',
  templateUrl: './widhlist.component.html',
  styleUrls: ['./widhlist.component.css']
})
export class WidhlistComponent implements OnInit {

  constructor(
    private pagination_s: PaginationService,
    private store: Store<{user: User}> ,
    private app_store: Store<{main_reducer: AppInitState}>,
  ) { 
    store.pipe(select('user')).subscribe(value => {
      this.widhlist = value.widhlist
      this.widhlist_length = new Array(Math.ceil(this.widhlist.length / this.widhlist_display_amount)).fill(0)
      this.token = value.token 
      this.checkCurrentPage()
      this.slice_order_detail()
    })
  }

  token: string 

  widhlist: CatalogItem[] = []

  display_widhlist: CatalogItem[]
  start_index: number = 0 
  end_index: number = 6
  widhlist_display_amount: number = 6

  widhlist_length: number[] = []
  current_index: number = 0 
  
  ngOnInit(): void {
    
  }

  removeWidhlist(index):void {
    let {token} = this
    axios.post('/api/user/remove_from_widhlist' , {token , index}) 
    .then(res => {
      if(res.data.msg) this.store.dispatch(new UserActions.RemoveWidhlist(index))
    })
  }

  checkCurrentPage(){
    let length = Math.ceil(this.widhlist.length / this.widhlist_display_amount)
    let end_index_length = Math.ceil(this.end_index / this.widhlist_display_amount)
    if(length < end_index_length){
      this.end_index -= this.widhlist_display_amount
      this.start_index -= this.widhlist_display_amount
    }
  }

  slice_order_detail(){
    this.display_widhlist = this.pagination_s.slice_arrays(this.widhlist , this.start_index , this.end_index)
  }

  change_page(value):void{
    let { start_index , end_index } = this.pagination_s.change_page(value , this.start_index , this.end_index , this.widhlist , this.widhlist_display_amount)

    this.start_index = start_index 
    this.end_index = end_index

    this.slice_order_detail()
  }

  change_page_number(i):void {
    this.current_index = i 
    let {start_index , end_index} = this.pagination_s.change_page_number(i , this.start_index , this.end_index , this.widhlist_display_amount)

    this.start_index = start_index 
    this.end_index = end_index
    this.slice_order_detail()
  }

  pagination_class(current_index){
    return this.pagination_s.pagination_class(current_index , this.start_index , this.widhlist_display_amount)
  }

  viewItem(item):void{
    this.app_store.dispatch(new AppActions.AddDisplayCatalogItem(item))
  }

}
