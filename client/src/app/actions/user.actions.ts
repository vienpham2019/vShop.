import { Action } from '@ngrx/store'
import { ShippingDetail } from './../models/shipping_detail.model'

export const add_shipping = '[User Profile Component] Add Shipping' 

export class AddShipping implements Action {
	readonly type = add_shipping
	
	constructor(public item: ShippingDetail) {} 
}

export type Actions = AddShipping