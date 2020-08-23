import { Action } from '@ngrx/store'
import { CatalogItemReview } from './../models/catalog_item_review.model'

export const add_review = '[Item Component] Add Review' 

export class AddReview implements Action {
	readonly type = add_review
	
	constructor(public review: CatalogItemReview) {} 
}


export type Actions = AddReview 