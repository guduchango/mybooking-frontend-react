import { GuestInterface } from "../Guest/GuestInterface";
import { PromotionInterface } from "../Promotion/PromotionInterface";
import { UnitInterface } from "../Unit/UnitInterface";

export enum Status {
    pending = "pending",
    approved = "approved",
    finished = "finished",
    canceled = "canceled"
}

export enum Channel {
    direct = "direct",
    booking = "booking",
    block = "block"
}

export interface ReservationInterface {
    res_id: number;
    res_start_date: string;
    res_end_date: string;
    res_adults: number;
    res_children: number;
    res_beds: number;
    res_nights: number;
    res_price: number;
    res_price_dolar: number;
    res_price_final: number;
    res_advance_payment: number;
    res_status: Status | string;
    res_channel: Channel | string;
    res_comments: string;
    res_created_at: Date;
    res_updated_at: Date;
    res_beauty_dates: string;
    unit: UnitInterface;
    guest: GuestInterface;
    promotion: PromotionInterface;
    res_uni_id: number;
    res_gue_id: number;
    res_pro_id: number;
    
}
