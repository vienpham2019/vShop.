import { Action } from '@ngrx/store'
import { ShippingDetail } from './../models/shipping_detail.model'
import { OrderDetail } from './../models/order_detail.model'
import { ShoppingItem } from '../models/shopping_item.model'
import { UserInfo } from '../models/user_info.model'
 
export const add_shipping = '[User Profile Component] Add Shipping' 
export const add_edit_shipping = '[User Profile Component] Add Edit Shipping' 
export const edit_shipping = '[User Profile Component] Edit Shipping'
export const add_order = '[Payment Component] Add Order'
export const remove_order = '[Payment Component] Remove Order'
export const select_display_order_details = '[User Profile Order Component] Display Order Detail'
export const add_widhlist = '[User Profile Component] Add Widhlist'
export const remove_widhlist = '[User Profile Component] Remove Widhlist'
export const update_user_info = '[User Profile Component] Update User Info'

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

export class RemoveOrder implements Action { 
	readonly type = remove_order 
	constructor (public index: number){}
}

export class DisplayOrderDetail implements Action{
	readonly type = select_display_order_details 
	constructor (public order: OrderDetail){}
}

export class AddWidhlist implements Action {
	readonly type = add_widhlist
	constructor (public item: ShoppingItem){}
}

export class RemoveWidhlist implements Action {
	readonly type = remove_widhlist
	constructor (public index: number){}
}

export class UpdateUserInfo implements Action {
	readonly type = update_user_info
	constructor (public user_info: UserInfo){}
}

export type Actions = AddShipping | AddEditShipping | EditShipping | AddOrder | RemoveOrder | DisplayOrderDetail | AddWidhlist | RemoveWidhlist | UpdateUserInfo