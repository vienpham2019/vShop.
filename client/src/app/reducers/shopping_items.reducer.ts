
import { ShoppingItem } from './../models/shopping_item.model' 
import * as ShoppingItemActions from './../actions/shopping_items.actions'


export const initState: ShoppingItem[] = []

export function shoppingItemReducer(state = initState , action: ShoppingItemActions.Actions) {
    switch (action.type) {
        case ShoppingItemActions.add_item:
            state = [action.item,...state]
            console.log(state)
            return state
    
        default:
            return state
    }
}