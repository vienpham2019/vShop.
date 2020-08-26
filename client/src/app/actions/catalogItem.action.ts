import { Action } from '@ngrx/store'
import { CatalogItemReview } from './../models/catalog_item_review.model'
import { CatalogItem } from './../models/catalog_item.model'

export const add_review = '[Item Component] Add Review' 
export const add_display_item = "[Item Componet] Add Display Item"

export class AddReview implements Action {
	readonly type = add_review
	
	constructor(public review: CatalogItemReview) {} 
}

export class AddDisplayItem implements Action {
	readonly type = add_display_item
	
	constructor(public item: CatalogItem) {} 
}


export type Actions = AddReview | AddDisplayItem