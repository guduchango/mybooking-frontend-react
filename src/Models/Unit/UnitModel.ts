import axios, { AxiosError } from "axios";
import { BaseModel } from "../BaseModel";
import { UnitInterface } from "./UnitInterface";
import { z } from 'zod';
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";

export class UnitModel extends BaseModel implements UnitInterface {

    private _uni_id: number;
    private _uni_name: string;
    private _uni_max_people: number;
    private _uni_single_bed: number;
    private _uni_double_bed: number;
    private _uni_rooms: number;
    private _uni_created_at: Date;
    private _uni_updated_at: Date;

    public constructor(IUnit?: UnitInterface) {
        super();
        if (IUnit !== undefined) {
            this.uni_id = (IUnit.uni_id !== undefined) ? IUnit.uni_id : 0
            this.uni_name = (IUnit.uni_name !== undefined) ? IUnit.uni_name : ""
            this.uni_max_people = (IUnit.uni_max_people !== undefined) ? IUnit.uni_max_people : 0
            this.uni_single_bed = (IUnit.uni_single_bed !== undefined) ? IUnit.uni_single_bed : 0
            this.uni_double_bed = (IUnit.uni_double_bed !== undefined) ? IUnit.uni_double_bed : 0
            this.uni_rooms = (IUnit.uni_rooms !== undefined) ? IUnit.uni_rooms : 1
            this.uni_created_at = (IUnit.uni_created_at !== undefined) ? IUnit.uni_created_at : new Date()
            this.uni_updated_at = (IUnit.uni_updated_at !== undefined) ? IUnit.uni_updated_at : new Date()
        }
        return this;
    }

    // uni_id
    get uni_id(): number {
        return this._uni_id;
    }

    set uni_id(value: number) {
        this._uni_id = value;
    }

    // uni_name
    get uni_name(): string {
        return this._uni_name;
    }

    set uni_name(value: string) {
        this._uni_name = value;
    }

    // uni_max_people
    get uni_max_people(): number {
        return this._uni_max_people;
    }

    set uni_max_people(value: number) {
        this._uni_max_people = value;
    }

    // uni_single_bed
    get uni_single_bed(): number {
        return this._uni_single_bed;
    }

    set uni_single_bed(value: number) {
        this._uni_single_bed = value;
    }

    // uni_double_bed
    get uni_double_bed(): number {
        return this._uni_double_bed;
    }

    set uni_double_bed(value: number) {
        this._uni_double_bed = value;
    }

    // uni_rooms
    get uni_rooms(): number {
        return this._uni_rooms;
    }

    set uni_rooms(value: number) {
        this._uni_rooms = value;
    }

    // uni_created_at
    get uni_created_at(): Date {
        return this._uni_created_at;
    }

    set uni_created_at(value: Date) {
        this._uni_created_at = value;
    }

    // uni_updated_at
    get uni_updated_at(): Date {
        return this._uni_updated_at;
    }

    set uni_updated_at(value: Date) {
        this._uni_updated_at = value;
    }

    // Method to convert instance to plain object for serialization
    public toPlainObject(): UnitInterface {
        return {
            uni_id: this.uni_id,
            uni_name: this.uni_name,
            uni_max_people: this.uni_max_people,
            uni_single_bed: this.uni_single_bed,
            uni_double_bed: this.uni_double_bed,
            uni_rooms: this.uni_rooms,
            uni_created_at: this.uni_created_at,
            uni_updated_at: this.uni_updated_at,
        };
    }

    public async store(): Promise<UnitInterface | AxiosError> {
        try {
            const response = await this.postPrivate<UnitInterface, { data: UnitInterface }>(
                `/unit/`,
                this.toPlainObject()
            )

            const responseData = response.data.data
            new UnitStorageService().create(responseData)

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


    public async update(id: number): Promise<UnitInterface | AxiosError> {
        try {
            const response = await this.putPrivate<UnitInterface, { data: UnitInterface }>(
                `/unit/${id}`,
                this.toPlainObject()
            )

            const responseData = response.data.data
            new UnitStorageService().update(id, responseData)

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


    public async saveOrUpdate(id: number): Promise<UnitInterface | AxiosError> {
        if (id === 0) {
            return await this.store()
        }
        return await this.update(id)
    }


    public validate(): boolean {
        this.cleanMessages()

        const FormSchema = z.object({
            uni_name: z.string().min(5),
            uni_rooms: z.number().positive(),
            uni_max_people: z.number().positive(),
            uni_single_bed: z.number().positive(),
            uni_double_bed: z.number().positive(),
        })

        const result = FormSchema.safeParse(this.toPlainObject())

        if (!result.success) {
            for (const issue of result.error.issues) {
                const path = issue.path[0]?.toString() ?? "field"
                const messageTxt = `${path}: ${issue.message}`
                this.addMessage(messageTxt.toLowerCase())
            }
        }

        return this.showMessages().length === 0
    }
}



