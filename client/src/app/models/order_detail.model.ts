import { ShippingDetail } from './shipping_detail.model'
import { ShoppingItem } from './shopping_item.model'
export interface OrderDetail {
    order_id: string, 
    order_date: string, 
    shipping_date: string[], 
    subtotal: number, 
    tax: number, 
    shipping_feed: number, 
    total: number, 
    shipping_address: ShippingDetail ,
    shipping_method: string[],
    order_notes: string, 
    shopping_items: ShoppingItem[]
}