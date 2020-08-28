import  { AppInitState } from '../models/app_initState.model'
import * as AppActions from '../actions/app.action'
export const initState:AppInitState = {
    men_catalogs: [] ,
    women_catalogs: [],
    display_catalogs: [],
    current_catalog: '',
    display_catalog_item: null
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

        case AppActions.add_catalog_review: 
            let display_catalog_item = {...state.display_catalog_item}
            display_catalog_item.reviews = [action.review , ...display_catalog_item.reviews]
            let catalogs = display_catalog_item.catalog_type === "Men" ? [...state.men_catalogs] : [...state.women_catalogs]
            catalogs = catalogs.map(value => value._id === display_catalog_item._id ? display_catalog_item : value)
            let men_catalogs , women_catalogs 

            if(display_catalog_item.catalog_type === "Men"){
                men_catalogs = catalogs
                women_catalogs = [...state.women_catalogs]
            }else{
                women_catalogs = catalogs
                men_catalogs = [...state.men_catalogs]
            }

            return {...state ,men_catalogs , women_catalogs , display_catalog_item}
        
        case AppActions.add_display_catalog_item: 
            return {...state, display_catalog_item: action.item}

        default:
            return state
    }
}

