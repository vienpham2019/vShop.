import { Action } from '@ngrx/store'
import { CatalogItem } from '../models/catalog_item.model'

export const add_men_catalogs = '[App Component] Add Men Catalogs' 
export const add_women_catalogs = '[App Component] Add Women Catalogs' 
export const display_catalogs = '[App Component] Display Catalogs' 

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

export type Actions = AddMenCatalogs | AddWomenCatalogs | DisplayCatalogs