import { CatalogItem } from './catalog_item.model'
export interface AppInitState{
    men_catalogs: CatalogItem[],
    women_catalogs: CatalogItem[],
    display_catalogs: CatalogItem[],
    current_catalog: string 
}