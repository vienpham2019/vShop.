import  { AppInitState } from '../models/app_initState.model'
import * as AppActions from '../actions/app.action'
export const initState:AppInitState = {
    men_catalogs: [] ,
    women_catalogs: [],
    display_catalogs: [],
    current_catalog: ''
}

export function AppReducer(state = initState , action ) {
    switch (action.type) {
        case AppActions.add_men_catalogs:
            return {...state, men_catalogs: action.catalogs}

        case AppActions.add_women_catalogs:
            return {...state, women_catalogs: action.catalogs}

        case AppActions.display_catalogs:
            let display_catalogs = action.gender === "Men" ? [...state.men_catalogs] : [...state.women_catalogs]
            display_catalogs = display_catalogs.filter(item => item.category.includes(action.category))
            return {...state, display_catalogs , current_catalog: `${action.gender}'s ${action.category}s`}

        default:
            return state
    }
}

