import { AxiosError } from "axios";
import { BaseModel } from "../BaseModel";
import { PriceRageInterface } from "./PriceRangeInterface";
import { PriceStorageService } from "../../Services/Price/PriceStorageService";
import { PriceInterface } from "./PriceInterface";
import { z } from 'zod';
import { validateDateRange } from "../../Utils/GeneralFunctions";

export class PriceRangeModel extends BaseModel implements PriceRageInterface {
    private _pri_from: string;
    private _pri_to: string;
    private _pri_value: number;
    private _pri_uni_id: number;

    public constructor(IPriceRange?: PriceRageInterface) {
        super();
        if (IPriceRange !== undefined) {
            this.pri_from = (IPriceRange.pri_from !== undefined) ? IPriceRange.pri_from : ""
            this.pri_to = (IPriceRange.pri_to !== undefined) ? IPriceRange.pri_to : ""
            this.pri_value = (IPriceRange.pri_value !== undefined) ? IPriceRange.pri_value : 0
            this.pri_uni_id = (IPriceRange.pri_uni_id !== undefined) ? IPriceRange.pri_uni_id : 0
        }
        return this;
    }

    // Getter and Setter for pri_from
    get pri_from(): string {
        return this._pri_from;
    }

    set pri_from(value: string) {
        this._pri_from = value;
    }

    // Getter and Setter for pri_to
    get pri_to(): string {
        return this._pri_to;
    }

    set pri_to(value: string) {
        this._pri_to = value;
    }

    // Getter and Setter for pri_value
    get pri_value(): number {
        return this._pri_value;
    }

    set pri_value(value: number) {
        this._pri_value = value;
    }

    // Getter and Setter for pri_uni_id
    get pri_uni_id(): number {
        return this._pri_uni_id;
    }

    set pri_uni_id(value: number) {
        this._pri_uni_id = value;
    }

     // Method to convert instance to plain object for serialization
     public toPlainObject(): PriceRageInterface {
        return {
            pri_from: this.pri_from,
            pri_to: this.pri_to,
            pri_value: this.pri_value,
            pri_uni_id: this.pri_uni_id,
        };
    }

    public async storeRangePrice(): Promise<PriceInterface[] | AxiosError>{
        return await this.postPrivate<any, { data: PriceInterface[] }>(`price/range-price/`, this.toPlainObject())
        .then(response => {
            const responseData: PriceInterface[] | AxiosError =  response.data.data as PriceInterface[]
            if(!(responseData instanceof AxiosError)){
                for (const price of responseData) {
                    new PriceStorageService().createOrUpdate(price)
                }
            }

            return responseData;
        })
        .catch((error) => {
            const items = error.response?.data?.errors;
            if (items && items.length > 0){
                for (let i = 0; i < items.length; i++) {
                    this.addHttpMsj(items[i])
                  }
            }else{
                this.addHttpMsj(error.message)
            }
          return error
        });
    }

    public validate(): boolean {

        const FormSchema = z.object({
            pri_from: z.string().date(),
            pri_to: z.string().date(),
            pri_value: z.number().positive(),
            pri_uni_id: z.number().positive(),
          });
          
          type FormData = z.infer<typeof FormSchema>;
          
          // Validation
          try {
            const data: FormData = FormSchema.parse(this.toPlainObject());
            console.log("data",data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                
              for (const issue of error.issues) {
                const messageTxt = issue.path[0]+":"+issue.message;
                this.addMessage(messageTxt.toLowerCase())
              }
            } else {
                this.addMessage(`Unexpected error: ${error}`)
            }
          }

        const validRage = validateDateRange(this.pri_from,this.pri_to);

        if(validRage.valid == false){
            this.addMessage(validRage.message);
        }
         
        if (this.showMessages().length > 0) {
            return false;
        } else {
            return true;
        }

    }
}