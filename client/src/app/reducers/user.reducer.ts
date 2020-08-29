import { User } from './../models/user.model' 
import * as UserActions from './../actions/user.actions'


export const initState: User = {
    current_user: false, 
    token: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    addresses: [],
    orders: [], 
    widhlist: [],
    edit_shipping_index: null ,
    edit_shipping_detail: null ,
    display_order_detail: null,
}

export function UserReducer(state = initState , action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.add_edit_shipping:
            return {...state , edit_shipping_index: action.index , edit_shipping_detail: action.shipping}

        case UserActions.edit_shipping: 
            let addresses = [...state.addresses]
            addresses[state.edit_shipping_index] = action.shipping
            return {...state , addresses}
        
        case UserActions.set_default_shipping: 
            return {...state, addresses: action.shippings}
        
        case UserActions.add_shipping: 
            return {...state, addresses: [...state.addresses,action.shipping]}

        case UserActions.remove_shipping: 
            return {...state, addresses: state.addresses.filter((_,i) => i !== action.index)}

        case UserActions.add_order: 
            return {...state, orders: [action.order , ...state.orders]}

        case UserActions.remove_order: 
            return {...state, orders: state.orders.filter((_,i) => i !== action.index)}

        case UserActions.select_display_order_details : 
            return {...state , display_order_detail: action.order}

        case UserActions.add_widhlist: 
            return {...state, widhlist: [action.item , ...state.widhlist]}

        case UserActions.remove_widhlist: 
            return {...state , widhlist: state.widhlist.filter((_,i) => i !== action.index)}

        case UserActions.update_user_info: 
            return {...state, ...action.user_info}

        case UserActions.user_login: 
            return {...state , ...action.user , current_user: true}

        case UserActions.user_logout: 
            let resetState = {current_user: false, token: '', first_name: '',last_name: '', email: '',gender: '',addresses: [], orders: [], widhlist: [],}
            return {...state , ...resetState}

        default:
            return state
    }
}