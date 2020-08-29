import { Component, OnInit } from '@angular/core';
import { Store , select } from '@ngrx/store';
import { OrderDetail } from '../../../models/order_detail.model'
import { User } from '../../../models/user.model'
import * as UserActions from '../../../actions/user.actions'
import Swal from 'sweetalert2';
import { PaginationService } from '../../../services/pagination/pagination.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private store: Store<{user: User}> ,
    private pagination_s: PaginationService
  ) { 
    store.pipe(select('user')).subscribe(value => {
      this.order_details = value.orders
      this.order_details_length = new Array(Math.ceil(this.order_details.length / this.order_details_display_amount)).fill(0)
      this.checkCurrentPage()
      this.slice_order_detail()
    })
  }
  order_details: OrderDetail[] = []

  display_order_details: OrderDetail[]
  start_index: number = 0 
  end_index: number = 4
  order_details_display_amount: number = 4

  order_details_length: number[] = []

  ngOnInit(): void {
  }

  displayOrderDetail(order){
    this.store.dispatch(new UserActions.DisplayOrderDetail(order))
  }

  checkCurrentPage(){
    let length = Math.ceil(this.order_details.length / this.order_details_display_amount)
    let end_index_length = Math.ceil(this.end_index / this.order_details_display_amount)
    if(length < end_index_length){
      this.end_index -= this.order_details_display_amount
      this.start_index -= this.order_details_display_amount
    }
  }

  removeOrder(index){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new UserActions.RemoveOrder(index))
        Swal.fire(
          'Deleted!',
          'Your order has been deleted.',
          'success'
        )
      }
    })
  }

  slice_order_detail(){
    this.display_order_details = this.pagination_s.slice_arrays(this.order_details , this.start_index , this.end_index)
  }

  change_page(value):void{

    let { start_index , end_index } = this.pagination_s.change_page(value , this.start_index , this.end_index , this.order_details , this.order_details_display_amount)

    this.start_index = start_index 
    this.end_index = end_index

    this.slice_order_detail()
  }

  change_page_number(i):void {
    let {start_index , end_index} = this.pagination_s.change_page_number(i , this.start_index , this.end_index , this.order_details_display_amount)

    this.start_index = start_index 
    this.end_index = end_index
    this.slice_order_detail()
  }

  pagination_class(current_index){
    return this.pagination_s.pagination_class(current_index , this.start_index , this.order_details_display_amount)
  }

}
