import { Component, OnInit } from '@angular/core';
import { Store , select } from '@ngrx/store';
import * as UserActions from '../../../actions/user.actions'
import { ShippingDetail } from '../../../models/shipping_detail.model'
import { User } from '../../../models/user.model'

import axios from 'axios';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(
    private store: Store<{user: User}> 
  ) { 
    store.pipe(select('user')).subscribe(value => {
      this.shipping_details = value.addresses
      this.slotAvaliable = this.shipping_details.length < 4
      this.token = value.token 
    })
  }

  shipping_details: ShippingDetail[]
  slotAvaliable: boolean
  token: string 

  ngOnInit(): void {
  }

  editShipping(index: number | null = null , shipping: ShippingDetail | null = null ):void {
    this.store.dispatch(new UserActions.AddEditShipping(index , shipping))
  }

  setDefaultShipping(index):void{
    let { token } = this
    let shipping_details = this.shipping_details.map((value,i) => ({...value, default_address: i === index}))
    axios.post('/api/user/set_default_address' , {token , addresses: shipping_details})
    .then(res => {
      if(res.data.msg) this.store.dispatch(new UserActions.SetDefaultShipping(shipping_details))
    })
  }

  removeShipping(index: number):void{
    this.store.dispatch(new UserActions.RemoveShipping(index))
  }


}
