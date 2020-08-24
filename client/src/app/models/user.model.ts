import { ShippingDetail } from './shipping_detail.model'
import { OrderDetail } from './order_detail.model'
import { ShoppingItem } from './shopping_item.model'
import { UserInfo } from './user_info.model'
export interface User {
    first_name: string, 
    last_name: string, 
    shipping_details: ShippingDetail[],
    edit_shipping_index: number | null ,
    edit_shipping_detail: ShippingDetail | null ,
    order_details: OrderDetail[],
    display_order_detail: OrderDetail | null ,
    widhlist: ShoppingItem[],
    user_info: UserInfo
}