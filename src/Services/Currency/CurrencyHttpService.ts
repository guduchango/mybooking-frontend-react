import { AxiosResponse } from "axios";
import { CurrencyInterface } from "../../Models/Currency/CurrencyInterface";
import { HttpBaseService } from "../HttpBaseService";


export class CurrencyHttpService extends HttpBaseService  {

    readonly url: string = 'currency';

    public async getCurrencys(): Promise<CurrencyInterface[]> {
        const response: AxiosResponse<{ data: CurrencyInterface[] }> = await this.getPrivate(this.url)
        return response.data.data
    }
}
