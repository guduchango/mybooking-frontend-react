import { AxiosResponse } from "axios";
import {PromotionInterface } from "../../Models/Promotion/PromotionInterface";
import { HttpBaseService } from "../HttpBaseService";

export class PromotionHttpService  extends HttpBaseService {

    readonly url: string = 'promotion';

    public async getPromotions (): Promise<PromotionInterface[]> { 
        const response: AxiosResponse<{ data: PromotionInterface[] }> = await this.getPrivate(this.url)
        return response.data?.data as PromotionInterface[]
    }
}
