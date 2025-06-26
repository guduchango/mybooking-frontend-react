import { AxiosResponse } from "axios";
import { GuestModel } from "../../Models/Guest/GuestModel";
import { HttpBaseService } from "../HttpBaseService";

export class GuestHttpService extends HttpBaseService {

    readonly url: string = 'guest';
    
    public async getGuests(): Promise<GuestModel[]> {
        const response: AxiosResponse<{ data: GuestModel[] }> = await this.getPrivate(this.url)

        return response.data?.data.map(guestData => new GuestModel(guestData));
    }
}
