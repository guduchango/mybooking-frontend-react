export enum ExpType {
    Cleaning = "cleaning",
    Repairs = "repairs",
    Taxes = "taxes",
}

export interface ExpenseInterface {
    exp_id:          number;
    exp_type:        ExpType;
    exp_price:       number;
    exp_price_dolar: null;
    exp_date:        Date;
    exp_uni_id:      number;
    exp_created_at:  Date;
    exp_updated_at:  Date;
}
