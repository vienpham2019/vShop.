import { User } from './../models/user.model' 
import * as UserActions from './../actions/user.actions'


export const initState: User = {
    current_user: false, 
    token: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    shipping_details: [],
    edit_shipping_index: null ,
    edit_shipping_detail: null ,
    order_details: [], 
    display_order_detail: null,
    widhlist: [],
}

export function UserReducer(state = initState , action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.add_edit_shipping:
            return {...state , edit_shipping_index: action.index , edit_shipping_detail: action.shipping}

        case UserActions.edit_shipping: 
            let shipping_details = [...state.shipping_details]
            shipping_details[state.edit_shipping_index] = action.shipping
            return {...action , shipping_details}
        
        case UserActions.set_default_shipping: 
            return {...action, shipping_details: action.shippings}
        
        case UserActions.add_shipping: 
            return {...state, shipping_details: [action.shipping, ...state.shipping_details]}

        case UserActions.remove_shipping: 
            return {...state, shipping_details: state.shipping_details.filter((_,i) => i !== action.index)}

        case UserActions.add_order: 
            return {...state, order_details: [action.order , ...state.order_details]}

        case UserActions.remove_order: 
            return {...state, order_details: state.order_details.filter((_,i) => i !== action.index)}

        case UserActions.select_display_order_details: 
            return {...state , display_order_detail: action.order}

        case UserActions.add_widhlist: 
            return {...state, widhlist: [action.item , ...state.widhlist]}

        case UserActions.remove_widhlist: 
            return {...state , widhlist: state.widhlist.filter((_,i) => i !== action.index)}

        case UserActions.update_user_info: 
            return {...state, user_info: action.user_info}

        case UserActions.user_login: 
            return {...state , ...action.user , current_user: true}

        case UserActions.user_logout: 
            return {...state , current_user: false, shipping_details: [] , order_details: [] , widhlist: [] , user_info: {} }

        default:
            return state
    }
}