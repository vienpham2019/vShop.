import { User } from './../models/user.model' 
import * as UserActions from './../actions/user.actions'


export const initState: User = {
    first_name: '',
    last_name: '',
    shipping_details: [
        {first_name: 'Daniel' , last_name: 'Robinson' , address1: '3997 Raccoon Run', address2: '',city: 'New', state: 'Kingston', zip: '45644', country: 'United States', phone: '6146389574' },
        {first_name: 'Daniel' , last_name: 'Robinsonsasa' , address1: '3997 Raccoon Run', address2: '',city: 'New', state: 'Kingston', zip: '45644', country: 'United States', phone: '6146389574' }
    ],
    edit_shipping_index: null ,
    edit_shipping_detail: null ,
    order_details: [], 
    display_order_detail: null 
}

export function UserReducer(state = initState , action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.add_edit_shipping:
            return {...state , edit_shipping_index: action.index , edit_shipping_detail: action.shipping}

        case UserActions.edit_shipping: 
            let shipping_details = [...state.shipping_details]
            shipping_details[state.edit_shipping_index] = action.shipping
            return {...action , shipping_details}
        
        case UserActions.add_shipping: 
            return {...state, shipping_details: [action.shipping, ...state.shipping_details]}

        case UserActions.add_order: 
            return {...state, order_details: [action.order , ...state.order_details]}

        case UserActions.remove_order: 
            return {...state, order_details: state.order_details.filter((_,i) => i !== action.index)}

        case UserActions.select_display_order_details: 
            return {...state , display_order_detail: action.order}

        default:
            return state
    }
}