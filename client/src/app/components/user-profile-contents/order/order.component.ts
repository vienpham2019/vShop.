import { Component, OnInit } from '@angular/core';
import { Store , select } from '@ngrx/store';
import { OrderDetail } from '../../../models/order_detail.model'
import { User } from '../../../models/user.model'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private store: Store<{user: User}> 
  ) { 
    store.pipe(select('user')).subscribe(value => this.order_dertails = value.order_details)
  }
  order_dertails: OrderDetail[]

  ngOnInit(): void {
  }

}
