
import Dexie, { Table } from 'dexie';
import { ReservationInterface } from '../Models/Reservation/ReservationInterface';
import {ExpenseInterface} from "../Models/Expense/ExpenseInterface";
import { PriceInterface } from '../Models/Price/PriceInterface';
import { PromotionInterface } from '../Models/Promotion/PromotionInterface';
import { UnitInterface } from '../Models/Unit/UnitInterface';
import {CurrencyInterface} from "../Models/Currency/CurrencyInterface";
import { GuestInterface } from '../Models/Guest/GuestInterface';
import { UserInterface } from '../Models/User/UserInterface';


export class StorageService extends Dexie {
    public guests!: Table<GuestInterface>;
    public reservations!: Table<ReservationInterface>;
    public expenses!: Table<ExpenseInterface>;
    public prices!: Table<PriceInterface>;
    public promotions!: Table<PromotionInterface>;
    public units!: Table<UnitInterface>;
    public currencies!: Table<CurrencyInterface>;
    public users!: Table<UserInterface>;

    public constructor() {
        super("MyBooking");
        this.version(1).stores({
            guests:
                "gue_id,"+
                "gue_name,"+
                "gue_last_name,"+
                "gue_full_name,"+
                "gue_identity_document,"+
                "gue_email,"+
                "gue_phone_number,"+
                "gue_created_at,"+
                "gue_updated_at",
            reservations:
                "res_id,"+
                "res_start_date,"+
                "res_end_date,"+
                "res_adults,"+
                "res_children,"+
                "res_beds,"+
                "res_nights,"+
                "res_price,"+
                "res_price_dolar,"+
                "res_price_final,"+
                "res_advance_payment,"+
                "res_status,"+
                "res_channel,"+
                "res_comments,"+
                "res_created_at,"+
                "res_updated_at,"+
                "res_beauty_dates,"+
                "res_uni_id," +
                "res_pro_id," +
                "res_gue_id",
            prices:
                "pri_id,"+
                "pri_date,"+
                "pri_price,"+
                "pri_price_dolar,"+
                "pri_uni_id,"+
                "pri_res_id,"+
                "pri_created_at,"+
                "pri_updated_at",
            promotions:
                "pro_id,"+
                "pro_name,"+
                "pro_value,"+
                "pro_created_at,"+
                "pro_updated_at",
            units:
                "uni_id,"+
                "uni_name,"+
                "uni_max_people,"+
                "uni_single_bed,"+
                "uni_dobule_bed,"+
                "uni_rooms,"+
                "uni_created_at,"+
                "uni_updated_at",
            currencies:
                "cur_id,"+
                "cur_country,"+
                "cur_price,"+
                "cur_created_at,"+
                "cur_updated_at",
            expenses:
                "exp_id,"+
                "exp_type,"+
                "exp_price,"+
                "exp_price_dolar,"+
                "exp_date,"+
                "exp_uni_id,"+
                "exp_created_at,"+
                "exp_updated_at",
            users:
                "id,"+
                "name,"+
                "email,"+
                "token,"+
                "created_at,"+
                "updated_at"
                

        });
    }

}
