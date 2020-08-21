
import { ShoppingItem } from './../models/shopping_item.model' 
import * as ShoppingItemActions from './../actions/shopping_items.actions'


export const initState: ShoppingItem[] = []

export function shoppingItemReducer(state = initState , action: ShoppingItemActions.Actions) {
    switch (action.type) {
        case ShoppingItemActions.add_item:
            state = [action.item,...state]
            return state
        case ShoppingItemActions.change_item: 
            state = [...state.slice(action.index) , action.item , ...state.slice(action.index + 1 , state.length)]
            return state
        default:
            return state
    }
}