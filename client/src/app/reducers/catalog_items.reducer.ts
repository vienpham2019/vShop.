
import { CatalogItemInit } from '../models/catalog_item_init.model'
import * as CatalogActions from '../actions/catalogItem.action'

export const initState: CatalogItemInit = {
    display_catalog_item: {id: '123' , title: 'Leather Sneakers' , current_price: 115, sale_price: 85 , sizes: ['6','6.5','7','7.5','8','8.5','9','10','11','12','13'] , isNew: false , isSale: true , colors: ['Yellow', 'Red' , 'Violet'], img: 'https://cm.rlmedia.io/is/image/PoloGSI/s7-1255555_lifestyle?$CMPDP$' , category: 'Shoes' , season: '' , brand: 'Nike' , reviews: []} 
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
        default:
            return state
    }
}