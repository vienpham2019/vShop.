import { CatalogItemReview } from './catalog_item_review.model'
export interface CatalogItem {
    id: string, 
    title: string, 
    price: number,
    sale_price: number,  
    sizes: string[], 
    new: boolean, 
    sale: boolean,
    colors: string[], 
    img: string,
    category: string, 
    season: string,  
    brand: string, 
    reviews: CatalogItemReview[]
}