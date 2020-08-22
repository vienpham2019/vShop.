import { Component, OnInit } from '@angular/core';
import { Store , select } from '@ngrx/store';
import * as UserActions from '../../../actions/user.actions'
import { ShippingDetail } from '../../../models/shipping_detail.model'
import { User } from '../../../models/user.model'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(
    private store: Store<{user: User}> 
  ) { 
    store.pipe(select('user')).subscribe(value => this.shipping_details = value.shipping_details)
  }

  shipping_details: ShippingDetail[]

  ngOnInit(): void {
  }

  editShipping(index: number | null = null , shipping: ShippingDetail | null = null ):void {
    this.store.dispatch(new UserActions.AddEditShipping(index , shipping))
  }


}
