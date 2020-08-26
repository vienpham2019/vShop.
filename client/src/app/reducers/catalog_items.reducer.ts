
import { CatalogItemInit } from '../models/catalog_item_init.model'
import * as CatalogActions from '../actions/catalogItem.action'

export const initState: CatalogItemInit = {
    display_catalog_item: null 
}

export function CatalogItemReducer(state = initState , action:CatalogActions.Actions) {
    switch (action.type) {  
        case CatalogActions.add_review: 
            return {
                ...state, display_catalog_item: {
                    ...state.display_catalog_item, reviews: [
                        action.review,...state.display_catalog_item.reviews]
                    }
                }
        
        case CatalogActions.add_display_item: 
                return {...state, display_catalog_item: action.item}
                
        default:
            return state
    }
}