import { CatalogItemReview } from './catalog_item_review.model'
export interface CatalogItem {
    _id: string, 
    title: string, 
    current_price: number,
    sale_price: number,  
    sizes: string[], 
    is_New: boolean, 
    isSale: boolean,
    colors: {color: string , img: string}[], 
    img: string,
    category: string, 
    season: string,  
    brand: string, 
    reviews: CatalogItemReview[]
}