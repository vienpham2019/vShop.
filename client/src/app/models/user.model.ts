import { ShippingDetail } from './shipping_detail.model'
export interface User {
    first_name: string, 
    last_name: string, 
    shipping_details: ShippingDetail[]
}