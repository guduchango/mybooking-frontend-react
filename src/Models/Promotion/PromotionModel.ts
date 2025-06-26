import { PromotionInterface } from "./PromotionInterface";


export class PromotionModel implements PromotionInterface {
    // Private properties
    private _pro_id: number;
    private _pro_name: string;
    private _pro_value: number;
    private _pro_created_at: string;
    private _pro_updated_at: string;

    constructor(
        pro_id: number,
        pro_name: string,
        pro_value: number,
        pro_created_at: string,
        pro_updated_at: string
    ) {
        this._pro_id = pro_id;
        this._pro_name = pro_name;
        this._pro_value = pro_value;
        this._pro_created_at = pro_created_at;
        this._pro_updated_at = pro_updated_at;
    }

    // Getter for pro_id
    public get pro_id(): number {
        return this._pro_id;
    }

    // Setter for pro_id
    public set pro_id(value: number) {
        this._pro_id = value;
    }

    // Getter for pro_name
    public get pro_name(): string {
        return this._pro_name;
    }

    // Setter for pro_name
    public set pro_name(value: string) {
        this._pro_name = value;
    }

    // Getter for pro_value
    public get pro_value(): number {
        return this._pro_value;
    }

    // Setter for pro_value
    public set pro_value(value: number) {
        this._pro_value = value;
    }

    // Getter for pro_created_at
    public get pro_created_at(): string {
        return this._pro_created_at;
    }

    // Setter for pro_created_at
    public set pro_created_at(value: string) {
        this._pro_created_at = value;
    }

    // Getter for pro_updated_at
    public get pro_updated_at(): string {
        return this._pro_updated_at;
    }

    // Setter for pro_updated_at
    public set pro_updated_at(value: string) {
        this._pro_updated_at = value;
    }
}