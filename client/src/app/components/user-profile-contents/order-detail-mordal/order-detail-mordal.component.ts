import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model'
import { OrderDetail } from '../../../models/order_detail.model'
import { Store , select } from '@ngrx/store'
 
@Component({
  selector: 'app-order-detail-mordal',
  templateUrl: './order-detail-mordal.component.html',
  styleUrls: ['./order-detail-mordal.component.css']
})
export class OrderDetailMordalComponent implements OnInit {

  constructor(
    private store: Store<{user: User}> 
  ) {
    store.pipe(select('user')).subscribe(value => this.order_detail = value.display_order_detail)
  }

  order_detail: OrderDetail

  ngOnInit(): void {
  }

}
