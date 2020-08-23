import { Component, OnInit } from '@angular/core';
import { Store , select } from '@ngrx/store';
import { OrderDetail } from '../../../models/order_detail.model'
import { User } from '../../../models/user.model'
import * as UserActions from '../../../actions/user.actions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private store: Store<{user: User}> 
  ) { 
    store.pipe(select('user')).subscribe(value => this.order_details = value.order_details)
  }
  order_details: OrderDetail[]

  ngOnInit(): void {
  }

  displayOrderDetail(order){
    this.store.dispatch(new UserActions.DisplayOrderDetail(order))
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

}
