import { BaseModel } from "../BaseModel";
import { UnitAvailableInterface } from "./UnitAvailableInterface";
import { UnitInterface } from "./UnitInterface";
import { z } from 'zod';
import { validateDateRange, validateReservationDates } from "../../Utils/GeneralFunctions";
import axios, { AxiosError } from "axios";

export class UnitAvailableModel extends BaseModel implements UnitAvailableInterface {
    private _check_in: string;
    private _check_out: string;
    private _people: number;

    public constructor(IUnitAvailable?: UnitAvailableInterface) {
        super();
        const today = new Date().toISOString().split('T')[0];
        if (IUnitAvailable !== undefined) {
            this.check_in = (IUnitAvailable.check_in !== undefined) ? IUnitAvailable.check_in : today
            this.check_out = (IUnitAvailable.check_out !== undefined) ? IUnitAvailable.check_out : today
            this.people = (IUnitAvailable.people !== undefined) ? IUnitAvailable.people : 0
        }
        return this;
    }

    // Getter and Setter for check_in
    public get check_in(): string {
        return this._check_in;
    }

    public set check_in(value: string) {
        this._check_in = value;
    }

    // Getter and Setter for check_out
    public get check_out(): string {
        return this._check_out;
    }

    public set check_out(value: string) {
        this._check_out = value;
    }

    // Getter and Setter for people
    public get people(): number {
        return this._people;
    }

    public set people(value: number) {
        this._people = value;
    }

    // Method to convert instance to plain object for serialization
    public toPlainObject(): UnitAvailableInterface {
        return {
            check_in: this.check_in,
            check_out: this.check_out,
            people: this.people,
        };
    }

    public async checkAvailable(): Promise<UnitInterface[] | AxiosError> {
        try {
            const response = await this.postPrivate<UnitAvailableInterface, { data: UnitInterface[] }>(
                `/unit/units-available/`,
                this.toPlainObject()
            )

            return response.data.data
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


    public validate(): boolean {
        this.cleanMessages()

        // Validaciones de fechas
        if (!validateReservationDates(this.check_in, this.check_out)) {
            this.addMessage("error range days")
        }

        const validRange = validateDateRange(this.check_in, this.check_out)
        if (!validRange.valid) {
            this.addMessage(validRange.message)
        }

        // Validación de schema con Zod
        const FormSchema = z.object({
            people: z.number().min(1),
        })

        const result = FormSchema.safeParse(this.toPlainObject())

        if (!result.success) {
            for (const issue of result.error.issues) {
                const messageTxt = `${issue.path[0]}: ${issue.message}`
                this.addMessage(messageTxt.toLowerCase())
            }
        }

        // Devolver si hay errores
        return this.showMessages().length === 0
    }

}