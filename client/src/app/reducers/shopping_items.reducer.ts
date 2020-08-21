
import { ShoppingItem } from './../models/shopping_item.model' 
import * as ShoppingItemActions from './../actions/shopping_items.actions'


export const initState: ShoppingItem[] = []

export function shoppingItemReducer(state = initState , action: ShoppingItemActions.Actions) {
    switch (action.type) {
        case ShoppingItemActions.add_item:
            return [action.item,...state]

        case ShoppingItemActions.remove_item:
            return [...state.filter((_,i) => i !== action.index)]

        case ShoppingItemActions.change_item: 
            let c_state = [...state]
            c_state[action.index] = action.item
            state = [...c_state]
            return state

        case ShoppingItemActions.reset_item: 
            return []

        default:
            return state
    }
}