import { User } from './../models/user.model' 
import * as UserActions from './../actions/user.actions'


export const initState: User = {
    first_name: '',
    last_name: '',
    shipping_details: [
        {first_name: 'Daniel' , last_name: 'Robinson' , address: '3997 Raccoon Run',city: 'New', state: 'Kingston', zip: '45644', country: 'United States', phone: '6146389574' },
        {first_name: 'Daniel' , last_name: 'Robinsonsasa' , address: '3997 Raccoon Run',city: 'New', state: 'Kingston', zip: '45644', country: 'United States', phone: '6146389574' }
    ]
}

export function UserReducer(state = initState , action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.add_shipping:
            return state

        default:
            return state
    }
}