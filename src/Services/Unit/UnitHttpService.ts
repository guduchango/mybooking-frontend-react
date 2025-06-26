import { AxiosResponse } from "axios";
import {UnitInterface } from "../../Models/Unit/UnitInterface";
import { HttpBaseService } from '../HttpBaseService';


export class UnitHttpService extends HttpBaseService {

    readonly url: string = 'unit';

    public async getUnits (): Promise<UnitInterface[]> { 
        const response: AxiosResponse<{ data: UnitInterface[] }> = await this.getPrivate(this.url)
        return response.data.data
    }
}
