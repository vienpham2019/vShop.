import { ShippingDetail } from './shipping_detail.model'
import { OrderDetail } from './order_detail.model'
import { CatalogItem } from './catalog_item.model'
export interface User {
    current_user: boolean, 
    token: string ,
    first_name: string, 
    last_name: string, 
    email: string, 
    gender: string, 
    addresses: ShippingDetail[],
    widhlist: CatalogItem[],
    orders: OrderDetail[],
    edit_shipping_index: number | null ,
    edit_shipping_detail: ShippingDetail | null ,
    display_order_detail: OrderDetail | null ,
}