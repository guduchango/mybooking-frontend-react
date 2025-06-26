import { PriceInterface } from "./PriceInterface";

export class PriceModel implements PriceInterface {
    // Private properties
    private _pri_id: number;
    private _pri_date: string;
    private _pri_price: number;
    private _pri_price_dolar: number | null;
    private _pri_uni_id: number;
    private _pri_res_id: number;
    private _pri_created_at: Date;
    private _pri_updated_at: Date;

    constructor(
        pri_id: number,
        pri_date: string,
        pri_price: number,
        pri_price_dolar: number | null,
        pri_uni_id: number,
        pri_res_id: number,
        pri_created_at: Date,
        pri_updated_at: Date
    ) {
        this._pri_id = pri_id;
        this._pri_date = pri_date;
        this._pri_price = pri_price;
        this._pri_price_dolar = pri_price_dolar;
        this._pri_uni_id = pri_uni_id;
        this._pri_res_id = pri_res_id;
        this._pri_created_at = pri_created_at;
        this._pri_updated_at = pri_updated_at;
    }

    // Getter for pri_id
    public get pri_id(): number {
        return this._pri_id;
    }

    // Setter for pri_id
    public set pri_id(value: number) {
        this._pri_id = value;
    }

    // Getter for pri_date
    public get pri_date(): string {
        return this._pri_date;
    }

    // Setter for pri_date
    public set pri_date(value: string) {
        this._pri_date = value;
    }

    // Getter for pri_price
    public get pri_price(): number {
        return this._pri_price;
    }

    // Setter for pri_price
    public set pri_price(value: number) {
        this._pri_price = value;
    }

    // Getter for pri_price_dolar
    public get pri_price_dolar(): number | null {
        return this._pri_price_dolar;
    }

    // Setter for pri_price_dolar
    public set pri_price_dolar(value: number | null) {
        this._pri_price_dolar = value;
    }

    // Getter for pri_uni_id
    public get pri_uni_id(): number {
        return this._pri_uni_id;
    }

    // Setter for pri_uni_id
    public set pri_uni_id(value: number) {
        this._pri_uni_id = value;
    }

    // Getter for pri_res_id
    public get pri_res_id(): number {
        return this._pri_res_id;
    }

    // Setter for pri_res_id
    public set pri_res_id(value: number) {
        this._pri_res_id = value;
    }

    // Getter for pri_created_at
    public get pri_created_at(): Date {
        return this._pri_created_at;
    }

    // Setter for pri_created_at
    public set pri_created_at(value: Date) {
        this._pri_created_at = value;
    }

    // Getter for pri_updated_at
    public get pri_updated_at(): Date {
        return this._pri_updated_at;
    }

    // Setter for pri_updated_at
    public set pri_updated_at(value: Date) {
        this._pri_updated_at = value;
    }
}