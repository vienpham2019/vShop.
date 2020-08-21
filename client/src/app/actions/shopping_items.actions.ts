import { Action } from '@ngrx/store'
import { ShoppingItem } from './../models/shopping_item.model'

export const add_item = '[Shopping Item Component] Add Item' 
export const remove_item = '[Shopping Item Component] Remove Item'
export const change_item = '[Shopping Item Component] Change Item'
export const reset_item = '[Shopping Item Component] Reset Item'

export class AddItem implements Action {
	readonly type = add_item
	
	constructor(public item: ShoppingItem) {} 
}

export class RemoveItem implements Action {
	readonly type = remove_item
	
	constructor(public index: number) {} 
}

export class ChangeItem implements Action {
	readonly type = change_item
	
	constructor(public item: ShoppingItem , public index: number) {} 
}

export class ResetItem implements Action {
	readonly type = reset_item
	
	constructor() {} 
}

export type Actions = AddItem | RemoveItem | ChangeItem | ResetItem