import { ReservationInterface } from "./ReservationInterface";
import { UnitInterface } from "../Unit/UnitInterface";
import { GuestInterface } from "../Guest/GuestInterface";
import { PromotionInterface } from "../Promotion/PromotionInterface";
import { BaseModel } from "../BaseModel";
import axios, { AxiosError } from "axios";
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { z } from 'zod';
import { validateDateRange } from "../../Utils/GeneralFunctions";

export class ReservationModel extends BaseModel implements ReservationInterface {

    private _res_id: number;
    private _res_start_date: string;
    private _res_end_date: string;
    private _res_adults: number;
    private _res_children: number;
    private _res_beds: number;
    private _res_nights: number;
    private _res_price: number;
    private _res_price_dolar: number;
    private _res_price_final: number;
    private _res_advance_payment: number;
    private _res_status: string;
    private _res_channel: string;
    private _res_comments: string;
    private _res_created_at: Date;
    private _res_updated_at: Date;
    private _res_beauty_dates: string;
    private _unit: UnitInterface;
    private _guest: GuestInterface;
    private _promotion: PromotionInterface;
    private _res_uni_id: number;
    private _res_gue_id: number;
    private _res_pro_id: number;

    public constructor(IReservation?: ReservationInterface) {
        super();
        if (IReservation !== undefined) {
            this.res_id = (IReservation.res_id !== undefined) ? IReservation.res_id : 0
            this.res_start_date = (IReservation.res_start_date !== undefined) ? IReservation.res_start_date : ""
            this.res_end_date = (IReservation.res_end_date !== undefined) ? IReservation.res_end_date : ""
            this.res_adults = (IReservation.res_adults !== undefined) ? IReservation.res_adults : 0
            this.res_children = (IReservation.res_children !== undefined) ? IReservation.res_children : 0
            this.res_beds = (IReservation.res_beds !== undefined) ? IReservation.res_beds : 0
            this.res_nights = (IReservation.res_nights !== undefined) ? IReservation.res_nights : 0
            this.res_price = (IReservation.res_price !== undefined) ? IReservation.res_price : 0
            this.res_price_final = (IReservation.res_price_final !== undefined) ? IReservation.res_price_final : 0
            this.res_advance_payment = (IReservation.res_advance_payment !== undefined) ? IReservation.res_advance_payment : 0
            this.res_status = (IReservation.res_status !== undefined) ? IReservation.res_status : ""
            this.res_channel = (IReservation.res_channel !== undefined) ? IReservation.res_channel : ""
            this.res_comments = (IReservation.res_comments !== undefined) ? IReservation.res_comments : ""
            this.res_created_at = (IReservation.res_created_at !== undefined) ? IReservation.res_created_at : new Date()
            this.res_updated_at = (IReservation.res_updated_at !== undefined) ? IReservation.res_updated_at : new Date()
            this.res_beauty_dates = (IReservation.res_beauty_dates !== undefined) ? IReservation.res_beauty_dates : ""
            this.unit = (IReservation.unit !== undefined) ? IReservation.unit : {} as UnitInterface
            this.guest = (IReservation.guest !== undefined) ? IReservation.guest : {} as GuestInterface
            this.promotion = (IReservation.promotion !== undefined) ? IReservation.promotion : {} as PromotionInterface
            this.res_uni_id = (IReservation.res_uni_id !== undefined) ? IReservation.res_uni_id : 0
            this.res_gue_id = (IReservation.res_gue_id !== undefined) ? IReservation.res_gue_id : 0
            this.res_pro_id = (IReservation.res_pro_id !== undefined) ? IReservation.res_pro_id : 0
        }
        return this;
    }

    // res_id
    public get res_id(): number {
        return this._res_id;
    }
    public set res_id(value: number) {
        this._res_id = value;
    }

    // res_start_date
    public get res_start_date(): string {
        return this._res_start_date;
    }
    public set res_start_date(value: string) {
        this._res_start_date = value;
    }

    // res_end_date
    public get res_end_date(): string {
        return this._res_end_date;
    }
    public set res_end_date(value: string) {
        this._res_end_date = value;
    }

    // res_adults
    public get res_adults(): number {
        return this._res_adults;
    }
    public set res_adults(value: number) {
        this._res_adults = value;
    }

    // res_children
    public get res_children(): number {
        return this._res_children;
    }
    public set res_children(value: number) {
        this._res_children = value;
    }

    // res_beds
    public get res_beds(): number {
        return this._res_beds;
    }
    public set res_beds(value: number) {
        this._res_beds = value;
    }

    // res_nights
    public get res_nights(): number {
        return this._res_nights;
    }
    public set res_nights(value: number) {
        this._res_nights = value;
    }

    // res_price
    public get res_price(): number {
        return this._res_price;
    }
    public set res_price(value: number) {
        this._res_price = value;
    }

    // res_price_dolar
    public get res_price_dolar(): number {
        return this._res_price_dolar;
    }
    public set res_price_dolar(value: number) {
        this._res_price_dolar = value;
    }

    // res_price_final
    public get res_price_final(): number {
        return this._res_price_final;
    }
    public set res_price_final(value: number) {
        this._res_price_final = value;
    }

    // res_advance_payment
    public get res_advance_payment(): number {
        return this._res_advance_payment;
    }
    public set res_advance_payment(value: number) {
        this._res_advance_payment = value;
    }

    // res_status
    public get res_status(): string {
        return this._res_status;
    }
    public set res_status(value: string) {
        this._res_status = value;
    }

    // res_channel
    public get res_channel(): string {
        return this._res_channel;
    }
    public set res_channel(value: string) {
        this._res_channel = value;
    }

    // res_comments
    public get res_comments(): string {
        return this._res_comments;
    }
    public set res_comments(value: string) {
        this._res_comments = value;
    }

    // res_created_at
    public get res_created_at(): Date {
        return this._res_created_at;
    }
    public set res_created_at(value: Date) {
        this._res_created_at = value;
    }

    // res_updated_at
    public get res_updated_at(): Date {
        return this._res_updated_at;
    }
    public set res_updated_at(value: Date) {
        this._res_updated_at = value;
    }

    // res_beauty_dates
    public get res_beauty_dates(): string {
        return this._res_beauty_dates;
    }
    public set res_beauty_dates(value: string) {
        this._res_beauty_dates = value;
    }

    // unit
    public get unit(): UnitInterface {
        return this._unit;
    }
    public set unit(value: UnitInterface) {
        this._unit = value;
    }

    // guest
    public get guest(): GuestInterface {
        return this._guest;
    }
    public set guest(value: GuestInterface) {
        this._guest = value;
    }

    // promotion
    public get promotion(): PromotionInterface {
        return this._promotion;
    }
    public set promotion(value: PromotionInterface) {
        this._promotion = value;
    }

    // res_uni_id
    public get res_uni_id(): number {
        return this._res_uni_id;
    }
    public set res_uni_id(value: number) {
        this._res_uni_id = value;
    }

    // res_gue_id
    public get res_gue_id(): number {
        return this._res_gue_id;
    }
    public set res_gue_id(value: number) {
        this._res_gue_id = value;
    }

    // res_pro_id
    public get res_pro_id(): number {
        return this._res_pro_id;
    }
    public set res_pro_id(value: number) {
        this._res_pro_id = value;
    }

    // Method to convert instance to plain object for serialization
    public toPlainObject(): ReservationInterface {
        return {
            res_id: this.res_id,
            res_start_date: this.res_start_date,
            res_end_date: this.res_end_date,
            res_adults: this.res_adults,
            res_children: this.res_children,
            res_beds: this.res_beds,
            res_nights: this.res_nights,
            res_price: this.res_price,
            res_price_dolar: this.res_price,
            res_price_final: this.res_price_final,
            res_advance_payment: this.res_advance_payment,
            res_status: this.res_status,
            res_channel: this.res_channel,
            res_comments: this.res_comments,
            res_created_at: this.res_created_at,
            res_updated_at: this.res_updated_at,
            res_beauty_dates: this.res_beauty_dates,
            unit: this.unit,
            guest: this.guest,
            promotion: this.promotion,
            res_uni_id: this.res_uni_id,
            res_gue_id: this.res_gue_id,
            res_pro_id: this.res_pro_id,
        };
    }

    public async store(): Promise<ReservationInterface | AxiosError> {
        try {
            console.log("before post create reservation", this.toPlainObject())

            const response = await this.postPrivate<ReservationInterface, { data: ReservationInterface }>(
                `/reservation/`,
                this.toPlainObject()
            )

            const responseData = response.data.data

            new ReservationStorageService().create(responseData)

            return responseData
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const items = (error.response?.data as any)?.errors

                if (Array.isArray(items)) {
                    for (const msg of items) {
                        this.addHttpMsj(msg)
                    }
                } else {
                    this.addHttpMsj(error.message)
                }

                return error
            }

            this.addHttpMsj("Error inesperado")
            return new AxiosError("Unknown error")
        }
    }


    public async update(id: number): Promise<ReservationInterface | AxiosError> {
        try {
            const response = await this.putPrivate<ReservationInterface, { data: ReservationInterface }>(
                `/reservation/${id}`,
                this.toPlainObject()
            )

            console.log("responseChango1", response)

            const reservationData = response.data.data
            const reservationStorage = new ReservationStorageService()
            reservationStorage.update(id, reservationData)

            return reservationData
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const items = (error.response?.data as any)?.errors

                if (Array.isArray(items)) {
                    for (const msg of items) {
                        this.addHttpMsj(msg)
                    }
                } else {
                    this.addHttpMsj(error.message)
                }

                return error
            }

            this.addHttpMsj("Error inesperado")
            return new AxiosError("Unknown error")
        }
    }


    public async saveOrUpdate(id: number): Promise<ReservationInterface | AxiosError> {
        if (id === 0) {
            return await this.store()
        }
        return await this.update(id)
    }


    public validate(): boolean {
        this.cleanMessages();
        const channels = ["direct", "booking", "airbnb"] as const;

        const FormSchema = z.object({
            res_start_date: z.string().date().min(6),
            res_end_date: z.string().date().min(6),
            res_gue_id: z.number().min(1),
            res_uni_id: z.number().min(1),
            res_adults: z.number().min(1),
            res_channel: z.enum(channels),
            res_advance_payment: z.number(),
            //gue_email: z.string().email(),
        });

        type FormData = z.infer<typeof FormSchema>;

        // Validation
        try {
            const data: FormData = FormSchema.parse(this.toPlainObject());
            console.log("data", data);
        } catch (error) {
            if (error instanceof z.ZodError) {

                for (const issue of error.issues) {
                    const messageTxt = issue.path[0] + ":" + issue.message;
                    this.addMessage(messageTxt.toLowerCase())
                }
            } else {
                this.addMessage(`Unexpected error: ${error}`)
            }
        }

        const validRage = validateDateRange(this.res_start_date, this.res_end_date);

        if (validRage.valid == false) {
            this.addMessage(validRage.message);
        }


        if (this.showMessages().length > 0) {
            console.log("showMessage > 0", this.showMessages())
            return false;

        } else {
            console.log("showMessage <= 0", this.showMessages())
            return true;
        }

    }



}
