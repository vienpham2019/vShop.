import { Action } from '@ngrx/store'
import { CatalogItem } from '../models/catalog_item.model'
import { CatalogItemReview } from './../models/catalog_item_review.model'

export const add_men_catalogs = '[App Component] Add Men Catalogs' 
export const add_women_catalogs = '[App Component] Add Women Catalogs' 
export const display_catalogs = '[App Component] Display Catalogs' 

export const add_catalog_review = '[Item Component] Add Catalog Review' 
export const add_display_catalog_item = "[Item Componet] Add Display Catalog Item"

export class AddMenCatalogs implements Action {
    readonly type = add_men_catalogs
    constructor(public catalogs: CatalogItem[]){}
}

export class AddWomenCatalogs implements Action {
    readonly type = add_women_catalogs
    constructor(public catalogs: CatalogItem[]){}
}

export class DisplayCatalogs implements Action {
    readonly type = display_catalogs
    constructor(public gender: string , public category: string){}
}

export class AddCatalogItemReview implements Action {
    readonly type = add_catalog_review
	
	constructor(public review: CatalogItemReview) {} 
}

export class AddDisplayCatalogItem implements Action {
	readonly type = add_display_catalog_item
	
	constructor(public item: CatalogItem) {} 
}

export type Actions = AddMenCatalogs | AddWomenCatalogs | DisplayCatalogs | AddCatalogItemReview | AddDisplayCatalogItem