import { Action } from '@ngrx/store'
import { ShippingDetail } from './../models/shipping_detail.model'
import { OrderDetail } from './../models/order_detail.model'
 
export const add_shipping = '[User Profile Component] Add Shipping' 
export const add_edit_shipping = '[User Profile Component] Add Edit Shipping' 
export const edit_shipping = '[User Profile Component] Edit Shipping'
export const add_order = '[Payment Component] Add Order'
export const select_display_order_details = '[User Profile Order Component] Display Order Detail'

export class AddShipping implements Action {
	readonly type = add_shipping
	
	constructor(public shipping: ShippingDetail) {} 
}

export class AddEditShipping implements Action {
	readonly type = add_edit_shipping
	
	constructor(public index: number , public shipping: ShippingDetail) {} 
}

export class EditShipping implements Action {
    readonly type = edit_shipping 
    constructor(public shipping: ShippingDetail ){}
}

export class AddOrder implements Action { 
	readonly type = add_order 
	constructor (public order: OrderDetail){}
}

export class DisplayOrderDetail implements Action{
	readonly type = select_display_order_details 
	constructor (public order: OrderDetail){}
}

export type Actions = AddShipping | AddEditShipping | EditShipping | AddOrder | DisplayOrderDetail