import { Action } from '@ngrx/store'
import { ShippingDetail } from './../models/shipping_detail.model'

export const add_shipping = '[User Profile Component] Add Shipping' 
export const add_edit_shipping = '[User Profile Component] Add Edit Shipping' 
export const edit_shipping = '[User Profile Component] Edit Shipping'

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

export type Actions = AddShipping | AddEditShipping | EditShipping 