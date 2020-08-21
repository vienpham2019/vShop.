import { Action } from '@ngrx/store'
import { ShoppingItem } from './../models/shopping_item.model'

export const add_item = '[Shopping Item Component] Add Item' 
export const remove_item = '[Shopping Item Component] Remove Item'

export class AddItem implements Action {
	readonly type = add_item
	
	constructor(public item: ShoppingItem) {} 
} 

export type Actions = AddItem